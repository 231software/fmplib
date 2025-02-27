/**
 * 插件自定义事件，可供其他插件监听。  
 * 因为用户使用平台多种多样，因此的满月平台本身不会对非满月平台开发的软件使用满月平台插件的函数或事件或或提供支持。如果第三方库有同时为其他软件提供支持的需求，请第三方库自行为他们提供文档或前置库。以LLSE/LSE为例，以下是一种看似可行的方案：  
 * 1. 第三方库规范自己在LSE面向引擎本身的导出格式，例如：
 * ```typescript
 * constructor(eventName:string,callback:(params:any)=>any){
 *     //...
 *     ll.exports()
 * }
 * static on(callback:(event:FMPPluginEvent)=>any,eventName:string,pluginName:string,priority = 0.5){
 *     
 * }
 * static register(eventName:string){
 *     
 * }
 * ```
 * 如果有简化其他插件监听自己的流程的需求，建议编写一个ts文件，其中使用
 */
export class FMPPluginEvent{
    constructor(eventName:string){

    }
    trigger(){

    }
    /**
     * 注册一个来自其他插件的事件  
     * 
     * @param callback 事件回调
     * @param eventName 事件名
     * @param pluginName 事件所属插件的插件名
     * @param priority 优先级，默认0.5
     */
    static on(callback:(event:FMPPluginEvent)=>any,eventName:string,pluginName:string,priority = 0.5){
        
    }
    /**
     * ### 回调函数的params使用方法
     * @param eventName 事件名
     */
    static register(eventName:string){

    }
}

/**
 * 注册对外函数
 * @param funcName 函数名
 * @param func 插件内的函数本体
 */
export function regPluginFunc(funcName:string,func:(...params:any[])=>any){
    
}
/**
 * 导入其他插件的对外函数
 * @param pluginName 函数所属插件名
 * @param funcName 函数名
 * @returns 函数的返回值
 */
export function getPluginFunc(pluginName:string,funcName:string):(...params:any[])=>any{
    return ()=>{}
}