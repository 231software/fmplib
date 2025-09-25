import { FMPNBTCompound } from "./NBT"

/**
 * 代表游戏角色背包中的一件物品（包括物品栈）  
 * 注意物品不是槽位，槽位是单独的Slot类，其中可以容纳一个这个item
 */
export class FMPItem{
    type:string
    count:number
    name:string|undefined
    maxStack:number
    constructor(type:string,count?:number,name?:string)
    constructor(NBT:FMPNBTCompound)
    //空参构造已删除，因为它不允许被插件调用
    /**
     * 获取物品的NBT标签
     */
    getNBT():FMPNBTCompound
}
/**
 * 工具类物品
 */
export class FMPToolItem extends FMPItem{
    /**工具的剩余耐久度 */
    damage:number
    constructor(type:string,count:number,name?:string)
}