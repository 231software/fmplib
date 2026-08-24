import { FMPCommandExecutor } from "./Command.js";
import { FMPPermissible } from "../Features/Permissible.js";

/**
 * ## 控制台命令执行者  
 * 代表服务端控制台这一命令执行来源。  
 * 注意：本空壳仅用于编写期类型参考，实际输出行为由各平台实现决定。
 */
export class FMPConsoleExecutor extends FMPCommandExecutor {
    constructor() {
        super("console")
    }
    sendSuccess(msg: string) {
    }
    sendError(msg: string) {
    }
    /**
     * from转换链：先委派给上层（FMPCommandExecutor.from）  
     * 再校验本层类型，控制台执行者无真转换，仅做instanceof校验
     */
    static from(source: FMPPermissible): FMPConsoleExecutor | undefined {
        const upper = FMPCommandExecutor.from(source)
        return upper instanceof FMPConsoleExecutor ? upper : undefined
    }
}
