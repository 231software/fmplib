import { FMPTwoWayMap } from "../Tools";

export class FMPDimension{
    name:string
    displayName:string
    static createDimension(name:string):void
    /**
     * 通过维度名获取维度实例  
     * 必须通过此方法获得原版维度
     * - 主世界：overworld
     * - 下界：nether
     * - 末地：the_end
     * 其他维度的名字是在它被创建时被指定的那个
     * @param name 维度名
     * @returns 维度实例
     */
    static getDimension(name:string):FMPDimension
}