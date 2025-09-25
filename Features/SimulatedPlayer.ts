import { FMPEntity } from "../Game/Entity";
import { FMPItem } from "../Game/Item";
import { FMPLocation } from "../Game/Location";
import { FMPPlayer } from "../Game/Player";

/**
 * 模拟玩家（假人）  
 * 由服务端虚拟的玩家，不是由玩家连接到服务器而产生的，完全由服务器代码控制，相当于机器人  
 * 通常情况下用途不限于生电挂机、主城NPC等
 */
export interface SimulatedPlayer extends FMPPlayer{
    /**
     * 模拟玩家攻击其视线方向上的实体。
     * @param target (可选) 攻击目标。若不提供，则攻击视线方向上的实体。
     * @returns 是否成功模拟操作。
     */
    attack(target?: FMPEntity): boolean;

    /**
     * 模拟玩家破坏一个方块。
     * @param pos 目标方块的坐标。
     * @returns 是否成功模拟操作。
     */
    destroy(pos: FMPLocation): boolean;

    /**
     * 模拟玩家断开连接（下线）。
     * @returns 是否成功模拟操作。
     */
    disconnect(): boolean;

    /**
     * 模拟玩家进行右键交互。
     * @param target (可选) 交互目标（方块或实体）。若不提供，则交互视线方向上的方块或实体。
     * @returns 是否成功模拟操作。
     */
    interact(target?: FMPEntity | FMPLocation): boolean;

    /**
     * 模拟玩家跳跃。
     * @returns 是否成功模拟操作。
     */
    jump(): boolean;

    /**
     * 模拟玩家看向一个实体或坐标。
     * @param target 要看向的实体或坐标。
     * @returns 是否成功模拟操作。
     */
    lookAt(target: FMPEntity | FMPLocation): boolean;

    /**
     * 模拟玩家移动到指定的世界坐标。
     * 此方法不包含自动寻路功能。
     * @param pos 目标位置。
     * @param speed (可选) 移动速度，默认为 1。
     * @returns 是否请求移动成功。
     */
    moveTo(pos: FMPLocation, speed?: number): boolean;

    /**
     * 模拟玩家使用手持物品或指定物品。
     * @param pos (可选) 目标坐标。若不提供，则在自身位置使用。
     * @param item (可选) 要使用的物品。若不提供，则使用当前手持物品。
     * @returns 是否成功模拟操作。
     */
    useItem(pos?: FMPLocation, item?: FMPItem): boolean;

    /**
     * 模拟玩家停止移动。
     * @returns 是否成功模拟操作。
     */
    stopMoving(): boolean;
}