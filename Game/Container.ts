import { FMPItem } from "./Item";

export enum FMPContainerType{
    Chest,
    Inventory
}
export class FMPContainer{
    size:string;
    type:FMPContainer
    put(item:FMPItem,slot?:number):boolean{
        return false;
    }
    getItem(slot:number):FMPItem|undefined{
        return new FMPItem("minecraft:stone",1)
    }
    replaceItem(slot:number,item:FMPItem):boolean{
        return false
    }
    getAllItems():FMPItem[]{
        return []
    }
    clearSlot(slot:number):boolean{
        return false
    }
    removeItem(slot:number,number:number):boolean{
        return false;
    }
    clear(slot:number):boolean{
        return false;
    }
    hasSpaceFor(item:FMPItem):boolean{
        return false;
    }
    isFull():boolean{
        return true;
    }
    isEmpty():boolean{
        return false;
    }
    //检查物品能否被放进当前位置
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