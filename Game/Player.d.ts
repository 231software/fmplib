import { FMPEulerAngles, FMPLocation } from "./Location";
import {FMPItem} from "./Item.js"
import { FMPInventory, FMPPlayerInventory } from "./Container.js";
import { FMPEntity } from "./Entity.js";
import { FMPPermissible } from "../Features/Permissible.js";
import { EulerAngles } from "../index.js";
/**
 * FMP定义的游戏模式  
 * 以Minecraft中的游戏模式为主，也可包括其他游戏中的游戏模式  
 * 各模式在各游戏中对应的模式详见各枚举名注释
 */
export enum FMPGameMode{
    Survival=0,
    Creative,
    Adventure,
    Spectator,
    Unknown
}
/**
 * FMP定义的玩家  
 * 由于平台不同，不能在不对运行环境做任何限制的前提下假定此为Minecraft中的玩家
 */
export class FMPPlayer extends FMPEntity{
    /**
     * from转换链的顶端：先委派给上层（FMPEntity.from）  
     * 平台实现会在此处加入实体转玩家的真转换（如isPlayer钩子）  
     * 空壳仅声明签名，无真转换
     */
    static from(source:FMPPermissible):FMPPlayer|undefined
    /** 玩家在Minecraft基岩版中的xuid */
    get xuid():string
    /** 玩家的游戏模式 */
    get gameMode():FMPGameMode
    /**
     * 判断当前玩家是否在线。  
     * 在很多插件加载器中，尝试对已下线的玩家读取属性或执行方法都会导致报错。在需要对一个长期保存的玩家进行操作时，建议在操作前检查其是否在线，并对其不在线的情况采取措施。
     * @returns 玩家是否在线
     */
    isOnline():boolean
    /**
     * 判断玩家是否是模拟玩家，模拟玩家指非真正客户端连接在服务端产生的玩家  
     * 主要有模拟玩家  
     * @returns 当前玩家是否是模拟玩家
     */
    isSimulated():boolean
    /**
     * 玩家是否是服务器中的管理员
     * 主要用于判断玩家能否执行命令等管理员操作，无法判断玩家是房主还是普通管理员
     */
    isOp():boolean
    /**
     * 给予玩家一个物品
     * @param item 要给予玩家的物品
     * @returns 是否成功给予玩家
     */
    giveItem(item:FMPItem):boolean
    /**
     * 在游戏内向玩家发送一条消息，没有任何前缀
     * @returns 是否发送成功
     */
    tell(message:string):boolean
    /** 更改玩家的游戏模式 */
    setGameMode(gameMode:FMPGameMode):boolean
    getInventory():FMPPlayerInventory
    /**
     * 调用加载器或插件内数据库通过玩家名查询其UUID
     * @param name 玩家游戏名
     * @returns 玩家UUID
     */
    static name2uuid(name:string):string|undefined
    /**
     * 调用加载器或插件内数据库通过玩家XUID查询其UUID  
     * 玩家不一定通过xbox登录服务器，所以该函数可能总是返回undefined
     * @param xuid 玩家XUID
     * @returns 玩家UUID
     */
    static xuid2uuid(xuid:string):string|undefined
    /**
     * 调用加载器或插件内数据库通过玩家UUID查询玩家名
     * @param uuid 玩家UUID
     * @returns 玩家名
     */
    static uuid2name(uuid:string):string|undefined
    /**
     * 调用加载器或插件内数据库通过玩家UUID查询玩家XUID  
     * 玩家不一定通过xbox登录服务器，所以该函数可能总是返回undefined
     * @param uuid 玩家UUID
     * @returns 玩家XUID
     */
    static uuid2xuid(uuid:string):string|undefined
    /**
     * 通过玩家对应的字段获取玩家
     * @param prividedID 玩家的游戏名/UUID/XUID
     * @returns 玩家在线时返回该玩家对象，不在线的返回undefined
     */
    static getOnlinePlayer(providedID:string):FMPPlayer|undefined
    /**
     * 获取服务器中所有在线玩家
     * @returns 所有玩家
     */
    static getAllOnline():FMPPlayer[]
}