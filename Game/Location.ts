import {FMPDimension} from "./Dimension";
export class FMPManualConstructedLocation{
    x:number;
    y:number;
    z:number;
    dimension:FMPDimension;
    constructor(

        x:number,
        y:number,
        z:number,
        dimension:FMPDimension
    ){
        this.x=x;
        this.y=y;
        this.z=z;
        this.dimension=dimension;
    }
}
export class FMPLocation{
    /** 原始坐标对象 */
    //rawlocation:any;
    /**
     * 
     * @param x x坐标
     * @param y y坐标
     * @param z z坐标
     * @param dimension 坐标所在维度
     */
    constructor(x:number,y:number,z:number,dimension:FMPDimension)
    /**
     * 此方法只建议第三方库调用，不建议在项目中直接调用
     * @param rawlocation 原始坐标对象
     * @param manualConstructed 是否由用户手动生成
     */
    constructor(rawlocation:any,manualConstructed:boolean)
    constructor(...args:any[]){
        
    }
    get x():number{
        return 0;
    }
    get y():number{
        return 0;
    }
    get z():number{
        return 0;
    }
    get dimension():FMPDimension{
        return FMPDimension.getDimension("overworld");
    }
    //全部在构造函数里面重载了，不要在外面写new静态方法了，写的跟粑粑似的
    // static new(x:number,y:number,z:number,dimension:FMPDimension=FMPDimension.getDimension("overworld")):FMPLocation{
    //     return new FMPLocation(x,y,z,dimension);
    // }
}
export class FMPEulerAngles{
    rawangle:any;
    constructor(alpha:number,beta:number,gamma:number){
    }
    get alpha():number{
        return 0;
    }
    get beta():number{
        return 0;
    }
    get gamma():number{
        return 0;
    }
    static new(alpha:number,beta:number,gamma:number):FMPEulerAngles{
        return new FMPEulerAngles(alpha,beta,gamma);
    }
}