//本文件所需内容由满月平台构建脚本引用
export let ScriptDone=():boolean|void=>{}
export class FMPInitEvent{
    constructor(){

    }
    static on(callback:(event:FMPInitEvent)=>boolean|void){
        ScriptDone=()=>{
            callback(new FMPInitEvent())
        }
    }
}

export class FMPDisableEvent{
    constructor(){

    }
    static on(callback:(event:FMPDisableEvent)=>boolean|void){
    }
}