import { FMPEntity } from "./Entity";
import { FMPPlayer } from "./Player";

export interface FMPCommandRegisterPositions{
    console?:boolean
    internal?:boolean
    operator?:boolean
    anyPlayer?:boolean
}

export class FMPCommandExecutor{
    name:string
    commandExecutorType:FMPCommandExecutorType
    displayName:string;
    constructor(type:FMPCommandExecutorType){
        this.commandExecutorType=type;
    }
    /**强制获取玩家，如果执行者不为玩家或玩家已离线则返回undefined */
    asPlayer():FMPPlayer|undefined{
        return undefined
    }
    asEntity():FMPEntity|undefined{
        return undefined
    }
}
export enum FMPCommandParamType{
    Optional=1,
    Mandatory
}
export enum FMPCommandParamDataType{
    Boolean=0,
    Int,
    Float,
    String,
    Actor,
    Player,
    Location,
    RawText,
    Message,
    JsonVale,
    Item,
    Block,
    Effect,
    Enum,
    SoftEnum,
    ActorType,
    Command
}
export class FMPCommandEnum{
    name:string;
    values:Array<string>;
    constructor(name:string,values:Array<string>){
        this.name=name;
        this.values=values;
    }
}
export enum FMPCommandEnumOptions{
    Default=0,
    Unfold
}
export class FMPCommandParam{
    type:FMPCommandParamType;
    /** 参数名，会显示在命令提示中，同一命名中请勿重复 */
    name:string;
    dataType:FMPCommandParamDataType;
    bindEnum:FMPCommandEnum|undefined;
    enumOptions:FMPCommandEnumOptions;
    constructor(
        type:FMPCommandParamType,
        name:string,
        dataType:FMPCommandParamDataType,
        bindEnum:FMPCommandEnum|undefined=undefined,
        enumOptions:FMPCommandEnumOptions=FMPCommandEnumOptions.Default
    ){
        this.type=type;
        this.name=name;
        this.dataType=dataType;
        this.bindEnum=bindEnum;
        this.enumOptions=enumOptions;
    }
}
export enum FMPCommandExecutorType{
    Player=0,
    Entity,
    Console,
    CommandBlock,
    Unknown
}
export class FMPCommandResult{
    executor:FMPCommandExecutor
    params:Map<string,{param:FMPCommandParam,value:any}>
    constructor(executor:FMPCommandExecutor,params:Map<string,{param:FMPCommandParam,value:any}>){
        this.executor=executor
        this.params=params
    }
}
/**命令执行失败的原因 */
export enum FMPCommandFailReason{
    Success,
    UnknownCommand,
    WrongTypeOfArgument,
    NoTargetMatchedSelector,
    InternalServerError,
}
export function FMPCommandFailReasonText(reason:FMPCommandFailReason):string{
    switch(reason){
        case FMPCommandFailReason.Success:return "成功"
        case FMPCommandFailReason.UnknownCommand:return "未知命令"
        case FMPCommandFailReason.WrongTypeOfArgument:return "参数输入有误"
        case FMPCommandFailReason.NoTargetMatchedSelector:return "没有与目标选择器匹配的目标"
        default:
        case FMPCommandFailReason.InternalServerError:return "执行命令时插件因自身错误而无法执行"
    }
}
/**
 * Minecraft格式的命令
 */
export class FMPCommand{
    name:string;
    /** 
     */
    description:string|undefined;
    /**
     */
    usageMessage:string|undefined;
    /** 
     */
    args:Map<string,FMPCommandParam>=new Map();
    overloads:Array<Array<string>>;
    registerPositions:FMPCommandRegisterPositions;
    callback:(result:FMPCommandResult)=>void
    /**
     */
    aliases:Array<string>;
    flag:any;
    /**
     * 
     * @param name 
     * 命令名称，为执行命令时开头的字段  
     * 例如要注册warp命令
     * 这里传入`warp`即可  
     * 然后用户在游戏内或控制台输入时  
     * 输入`warp ...`即可
     * @param description 
     * 命令描述  
     * 在Minecraft中  
     * 一般执行`/help 指令名`就会显示对应指令的该信息
     * @param usageMessage 
     * 指令用法  
     * 在Minecraft中  
     * 一般在输入命令的格式错误（如缺少参数或参数类型不正确）时显示对应指令的该信息
     * @param args 
     * 指令参数  
     * 该指令中所有可能出现的参数  
     * 例如你要注册的`warp`指令有以下几种用法：  
     * ```
     * warp 传送点名（字符串类型）
     * ```
     * ```
     * warp 目标玩家（玩家类型） 传送点名（字符串类型）
     * ```
     * 那么你的命令一共包括传送点名和目标玩家两个参数
     * 传入的顺序无所谓，因为具体如何排列这些参数将在指令重载过程中决定
     * @param overloads 
     * 指令重载  
     * 在此处决定你将如何排列这些参数  
     * 对于传入的二维数组  
     * 每一行为一个重载  
     * 例如你要注册的`warp`指令有以下几种用法：  
     * ```
     * warp 传送点名（字符串类型）
     * ```
     * ```
     * warp 目标玩家（玩家类型） 传送点名（字符串类型）
     * ```
     * 那么你的命令将需要按以下格式传入参数：
     * ```
     * [
     *     [传送点名]
     *     [目标玩家,传送点名]
     * ]
     * ```
     * @param allowedUserGroups 
     * 可执行该权限的用户组  
     * 命令的权限节点是默认禁止的，所以想要谁有权执行，必须指定这个用户组，然后他们才能有权执行。  
     * 例如我注册了一个指令，然后只指定了admin可执行，那么不仅普通玩家不可执行，控制台中和插件自己都无法执行该命令。  
     * 如果要控制台可执行，那么需要再允许console用户组执行。  
     * 另外，插件将根据是否允许了非internal用户组执行插件来决定是否要向控制台、管理员和普通玩家注册此命令  
     * @param aliases 
     * 指令别名
     * 你的指令将由一个主名称和数个别名组成
     * 例如，你为`warp`指令注册了别名`go`
     * 那么玩家执行`go`命令的时候，实际上是执行了`warp`命令
     * <!--对于LLSE，由于只支持一个别名，LNSDK只支持将最后一个元素作为别名-->
     * @param flag 
     */
    constructor(
        name:string,
        args:Array<FMPCommandParam>=[],
        overloads:Array<Array<string>>=[[]],
        callback:(result:FMPCommandResult)=>void,
        registerPositions:FMPCommandRegisterPositions={operator:true,console:true,internal:true},
        aliases:Array<string>=[],
        description:string|undefined=undefined,
        usageMessage:string|undefined=undefined,
        flag:any=undefined
    ){
        this.name=name;
        this.description=description;
        this.usageMessage=usageMessage;
        for(let param of args)this.args.set(param.name,param)
        this.overloads=overloads;
        this.registerPositions=registerPositions;
        this.aliases=aliases;
        this.flag=flag;
        this.callback=callback;
    } 
    /**
     * 注册命令 **已弃用，命令注册将在构造函数中自动执行**
     * @param command 要注册的命令对象，建议现场new一个传进去
     * @returns 命令是否注册成功
     * @deprecated
     */
    static register<T extends FMPCommand>(command:T):boolean{
        return false;
    }
}
export function FMPruncmd(cmd:string):{success:boolean,output:string}{
    return {
        success:false,
        output:"当前功能未开发完毕，无法执行命令"
    }
}