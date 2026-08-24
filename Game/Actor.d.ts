import { FMPCommandExecutor } from "./Command";
import { FMPDimension } from "./Dimension";
import { FMPEulerAngles, FMPLocation } from "./Location";
import { FMPPermissible } from "../Features/Permissible.js";

export class FMPActor extends FMPCommandExecutor{
    protected constructor(name:string)
    /**
     * from转换链：先委派给上层（FMPCommandExecutor.from）  
     * 再校验本层类型，实体无真转换，仅做instanceof校验
     */
    static from(source:FMPPermissible):FMPActor|undefined
    uuid:string
    /**实体的uuid */
    direction():FMPEulerAngles
    location:FMPLocation
    inAir:boolean
    /** 在游戏世界中传送实体到指定坐标 */
    teleport(location:FMPLocation,direction?:FMPEulerAngles):boolean
    /**
     * 通过该实体执行一条命令
     * @param cmd 要执行的命令
     * @returns 是否执行成功
     */
    runCmd(cmd:string):boolean
    sendSuccess(msg:string):void
    sendError(msg:string):void
}