import {INFO,data_path} from "./plugin_info.js"
export class FMPPlugin{
    name:string
    data_path:string

    /**
     * 插件类。构造方法供满月平台第三方库调用，插件不建议调用此方法。  
     * 如需要获取自己的实例，请使用静态方法getSelf()。
     * @param info 要初始化的插件实例对应的INFO
     */
    constructor(info:any,data_path:string){
        
    }
    /**
     * 插件是否已被加载
     * @returns 插件是否已被加载
     */
    isEnabled():boolean{
        return true;
    }
    /**
     * 使插件加载（触发其InitEvent）
     * @returns 插件是否加载成功
     */
    enable():boolean{
        return true;
    }
    static getSelf():FMPPlugin{
        return self
    }
}
const self=new FMPPlugin(INFO,data_path)