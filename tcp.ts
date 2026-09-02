import * as net from "net"
import { FMPLogger } from "./Logger"

/**
 * fmplib 的 TCP 客户端/服务端 API（精简版）。
 * 语义以 node 内建 net 模块为参考，但按满月平台的惯例封装为
 * “类 + 单处理器 setter 事件”的形式，不依赖 EventEmitter。
 *
 * 对外统一从 lib/index.js 导入：
 * ```typescript
 * import { Logger, TCPServer, TCPConnect } from "../lib/index.js"
 *
 * //服务端：把收到的每个字节原样返回给客户端
 * const server=new TCPServer(12345,socket=>{
 *     socket.onData=data=>socket.write(data)
 *     socket.onError=e=>Logger.error("连接出错："+e.message)
 *     socket.onClose=()=>Logger.info("连接已关闭")
 * })
 * await server.start()
 * //……在服务器运行期间，不能再修改 server.port
 * await server.stop()
 *
 * //客户端
 * const socket=TCPConnect(12345,"localhost")
 * socket.onConnect=()=>socket.write("hello")
 * socket.onData=data=>{
 *     Logger.info("收到："+data.toString())
 *     socket.end()
 * }
 * socket.onError=e=>Logger.error("连接失败："+e.message)
 * socket.onClose=()=>Logger.info("连接结束")
 * ```
 *
 * 网络 IO 一律异步，不阻塞游戏主线程。原始 TCP 面向“字节流”，
 * onData 可能按底层到达情况分块触发，需要完整报文时请自行缓存拼接；
 * 本精简版不提供粘包/半包等协议层处理。
 */

/**
 * 出站连接参数。仅在以对象形式调用 TCPConnect 时需要。
 */
export interface TCPConnectOptions{
    /** 目标端口 */
    port:number
    /** 目标主机（IP 地址或域名）。缺省时解析 localhost，与 node net 语义一致 */
    host?:string
}

/**
 * 一条 TCP 连接。
 * TCPConnect 创建的出站连接与服务端 onConnection 收到的接入连接是同一类型，
 * 读写与事件 API 完全一致。事件处理器为单处理器：赋值即生效，重复赋值会覆盖前一个。
 */
export class FMPTCPSocket{
    private rawSocket:net.Socket
    private onConnectCallback:(()=>void)|undefined
    private onDataCallback:((data:Buffer)=>void)|undefined
    private onCloseCallback:((hadError:boolean)=>void)|undefined
    private onErrorCallback:((err:any)=>void)|undefined
    constructor(rawSocket:net.Socket){
        this.rawSocket=rawSocket
        //内部常驻监听：出错时即使插件尚未注册 onError 也不会让进程崩溃，而是记入日志
        rawSocket.on("connect",()=>{
            this.onConnectCallback?.()
        })
        rawSocket.on("data",(data:Buffer)=>{
            this.onDataCallback?.(data)
        })
        rawSocket.on("close",(hadError:boolean)=>{
            this.onCloseCallback?.(hadError)
        })
        rawSocket.on("error",(err:Error)=>{
            if(this.onErrorCallback!==undefined)this.onErrorCallback(err)
            else FMPLogger.error("TCP 连接出错："+err.message)
        })
    }
    /** 出站连接成功建立后触发。服务端收到的接入连接不会触发此事件 */
    set onConnect(callback:()=>void){
        this.onConnectCallback=callback
    }
    /** 收到对端数据时触发，参数为本次收到的数据块 */
    set onData(callback:(data:Buffer)=>void){
        this.onDataCallback=callback
    }
    /** 连接关闭时触发。hadError 表示是否为异常关闭（例如对端直接重置连接） */
    set onClose(callback:(hadError:boolean)=>void){
        this.onCloseCallback=callback
    }
    /** 连接出错时触发。未注册此处理器时错误只会记入日志，不会使进程崩溃 */
    set onError(callback:(err:any)=>void){
        this.onErrorCallback=callback
    }
    /**
     * 向对端发送数据。
     * 返回值语义与 node net.Socket.write 相同：true 表示数据已交给系统发送；
     * false 仅表示数据暂存在本端内存缓冲中等待发送，并不代表发送失败。
     */
    write(data:string|Uint8Array):boolean{
        return this.rawSocket.write(data)
    }
    /** 优雅关闭：向对端发送 FIN 并停止发送，但仍可继续接收对端发来的数据，随后会触发 onClose */
    end():void{
        this.rawSocket.end()
    }
    /** 立即销毁底层连接，会触发 onClose */
    destroy():void{
        this.rawSocket.destroy()
    }
    /** 对端 IP 地址 */
    get remoteAddress():string|undefined{
        return this.rawSocket.remoteAddress
    }
    /** 对端端口 */
    get remotePort():number|undefined{
        return this.rawSocket.remotePort
    }
    /** 底层连接是否已被销毁 */
    get destroyed():boolean{
        return this.rawSocket.destroyed
    }
}

/**
 * TCP 监听服务。
 * 每接入一条连接都会调用构造时传入的 onConnection，参数是代表该连接的 TCPSocket。
 * 接入连接的存活由插件自行管理；stop 会统一断开所有尚未关闭的接入连接。
 */
export class FMPTCPServer{
    private _port:number
    private host:string|undefined
    private onConnection:(socket:FMPTCPSocket)=>void
    private started:boolean=false
    private server:net.Server|undefined
    private sockets:Set<FMPTCPSocket>=new Set()
    constructor(port:number,onConnection:(socket:FMPTCPSocket)=>void,host?:string){
        this._port=port
        this.onConnection=onConnection
        this.host=host
    }
    /** 监听端口 */
    get port():number{
        return this._port
    }
    set port(port:number){
        if(this.started)throw new Error("TCP server has already been launched, port is locked and cannot be changed. To change port, stop the server first.")
        this._port=port
    }
    /**
     * 开始监听。完成监听后 resolve；监听失败（例如端口已被占用）时 reject。
     */
    async start(){
        if(this.started)throw new Error("TCP server has already been launched.")
        const server=net.createServer(rawSocket=>{
            const socket=new FMPTCPSocket(rawSocket)
            this.sockets.add(socket)
            rawSocket.once("close",()=>this.sockets.delete(socket))
            this.onConnection(socket)
        })
        this.server=server
        let listening=false
        await new Promise<void>((resolve,reject)=>{
            server.on("error",(err:Error)=>{
                if(listening){
                    //监听已建立后出现的运行期错误（例如 accept 失败），只记录不中断服务
                    FMPLogger.error("TCP 服务器出错："+err.message)
                    return
                }
                //监听失败（例如端口被占用），start 以 reject 结束
                if(this.server===server)this.server=undefined
                reject(err)
            })
            const onListening=()=>{
                listening=true
                resolve()
            }
            if(this.host!==undefined)server.listen(this._port,this.host,onListening)
            else server.listen(this._port,onListening)
        })
        this.started=true
    }
    /**
     * 停止监听并断开所有接入连接。服务器未启动时调用也会正常结束。
     */
    async stop(){
        const server=this.server
        this.server=undefined
        if(server===undefined){
            this.started=false
            return
        }
        await new Promise<void>((resolve,reject)=>{
            //先断开所有接入连接，否则 net.Server.close 会一直等待它们关闭而无法结束
            for(let socket of this.sockets)socket.destroy()
            this.sockets.clear()
            server.close((err)=>{
                if(err!==undefined&&err!==null)reject(err)
                else resolve()
            })
        })
        this.started=false
    }
}

/**
 * 建立一条出站 TCP 连接（等价于 node 的 net.connect / net.createConnection）。
 * 返回的连接立即开始异步连接，成功与失败分别通过 onConnect / onError 通知，
 * 因此请在拿到返回值后尽快注册事件处理器。
 */
export function TCPConnect(options:TCPConnectOptions):FMPTCPSocket
export function TCPConnect(port:number,host?:string):FMPTCPSocket
export function TCPConnect(optionsOrPort:TCPConnectOptions|number,host?:string):FMPTCPSocket{
    const options=typeof optionsOrPort==="number"?{port:optionsOrPort,host:host}:optionsOrPort
    const rawSocket=new net.Socket()
    const socket=new FMPTCPSocket(rawSocket)
    if(options.host!==undefined)rawSocket.connect(options.port,options.host)
    else rawSocket.connect(options.port)
    return socket
}
