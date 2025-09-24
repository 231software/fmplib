import { FMPItem } from "./Item";

export enum FMPContainerType{
    Chest,
    Inventory
}
export class FMPContainer{
    size:number;
    type:FMPContainer
    /**
     * 向容器中放入物品
     * @param item 要放入的物品
     * @param slot 要放入的格子，如果未指定则按原版规则放入
     * @returns 是否成功放入
     */
    put(item:FMPItem,slot?:number):boolean{
        return false;
    }
    /**
     * 获取指定格子上的物品 
     * @param slot 格子
     * @returns 获取到的物品，获取到空气时返回undefined
     */
    getItem(slot:number):FMPItem|undefined{
        return new FMPItem("minecraft:stone",1)
    }
    /**
     * 将指定格子中的物品替换为指定物品
     * @param slot 格子
     * @param item 要被替换为的物品
     * @returns 是否替换成功
     */
    replaceItem(slot:number,item:FMPItem):boolean{
        return false
    }
    getAllItems():FMPItem[]{
        return []
    }
    /**
     * 清空一个格子中的所有物品
     * @param slot 格子
     * @returns 是否成功清空
     */
    clearSlot(slot:number):boolean{
        return false
    }
    /**
     * 移除指定格子中物品指定个
     * @param slot 格子
     * @param number 要移除的数量
     * @returns 是否成功移除，如果格子本来就为空气也会返回false
     */
    removeItem(slot:number,number:number):boolean{
        return false;
    }
    /**
     * 从容器中消耗指定类型的物品  
     * 注意，如果容器中剩余物品数量不足，那么将不会消耗任何物品并返回false
     * @param type 物品的类型
     * @param number 消耗的数量
     * @param slot 具体要从哪个格子中消耗，如果未填会自动从容器中寻找合适物品
     */
    consumeItem(type:string,number:number,slot?:number):boolean{
        return false
    }
    /**
     * 计算一个容器中拥有指定种类物品的总数
     * @param type 物品的类型
     */
    countItem(type:string):number{
        return 0
    }
    clear(slot:number):boolean{
        return false;
    }
    hasSpaceFor(item:FMPItem):boolean{
        return false;
    }
    /**
     * 检查窗口是否彻底装满。但凡有一个格子中的物品堆叠未满也会返回false。适合检测容器能否触发中继器发出强度15的红石信号
     * @returns 是否彻底装满
     */
    isFull():boolean{
        return true;
    }
    isEmpty():boolean{
        return false;
    }
    /**
     * 检查物品能否被放进当前位置
     */
    canPut(item:FMPItem,slot:number):boolean{
        return false
    }
}

/**
 * 代表游戏角色背包中的一个槽位
 */
export class FMPSlot{
    item:FMPItem
    constructor(){

    }
}

export class FMPMinecraftBundle{
    
}

export class FMPInventory extends FMPContainer{
    
}

//玩家物品栏是一个有盔甲栏和副手栏的特殊窗口
export class FMPPlayerInventory extends FMPInventory{

}

export class FMPMobInventory extends FMPInventory{

}