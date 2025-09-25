export enum FMPNBTType{
    LIST,
    COMPOUND,
    END,
    BYTE,
    SHORT,
    INT,
    LONG,
    FLOAT,
    DOUBLE,
    BYTEARRAY,
    STRING,
    BOOLEAN
}
type anyNBTType=FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString|FMPNBTBoolean
export abstract class FMPNBTObjectLike{
    toString(space:number):string
}
export class FMPNBTCompound extends FMPNBTObjectLike{
    constructor(data?:any)
    get(tagName:string):anyNBTType
    set(tagName:string,data:FMPNBTList):void
    set(tagName:string,data:FMPNBTEnd):void
    set(tagName:string,data:FMPNBTByte):void
    set(tagName:string,data:FMPNBTShort):void
    set(tagName:string,data:FMPNBTInt):void
    set(tagName:string,data:FMPNBTLong):void
    set(tagName:string,data:FMPNBTFloat):void
    set(tagName:string,data:FMPNBTDouble):void
    set(tagName:string,data:FMPNBTByteArray):void
    set(tagName:string,data:FMPNBTString):void
    set(tagName:string,data:FMPNBTBoolean):void
    getType(tagName:string):FMPNBTType
    delete(tagName:string):void
    toObject():any
    toSNBT():string

}
export abstract class FMPNBTBasicType{
}
export class FMPNBTList extends FMPNBTObjectLike{
    size:number
    getType(index:number):FMPNBTType
    get(index:number):anyNBTType|undefined
    set(index:number,data:FMPNBTList):void
    set(index:number,data:FMPNBTEnd):void
    set(index:number,data:FMPNBTByte):void
    set(index:number,data:FMPNBTShort):void
    set(index:number,data:FMPNBTInt):void
    set(index:number,data:FMPNBTLong):void
    set(index:number,data:FMPNBTFloat):void
    set(index:number,data:FMPNBTDouble):void
    set(index:number,data:FMPNBTByteArray):void
    set(index:number,data:FMPNBTString):void
    set(index:number,data:FMPNBTBoolean):void
    set(index:number,data:FMPNBTCompound):void
    push(data:FMPNBTList):void
    push(data:FMPNBTEnd):void
    push(data:FMPNBTByte):void
    push(data:FMPNBTShort):void
    push(data:FMPNBTInt):void
    push(data:FMPNBTLong):void
    push(data:FMPNBTFloat):void
    push(data:FMPNBTDouble):void
    push(data:FMPNBTByteArray):void
    push(data:FMPNBTString):void
    push(data:FMPNBTBoolean):void
    pop():void
    unshift(data:FMPNBTList):void
    unshift(data:FMPNBTEnd):void
    unshift(data:FMPNBTByte):void
    unshift(data:FMPNBTShort):void
    unshift(data:FMPNBTInt):void
    unshift(data:FMPNBTLong):void
    unshift(data:FMPNBTFloat):void
    unshift(data:FMPNBTDouble):void
    unshift(data:FMPNBTByteArray):void
    unshift(data:FMPNBTString):void
    unshift(data:FMPNBTBoolean):void
    shift():anyNBTType
    splice(start:number,deleteCount:number):void
    toArray():anyNBTType[]
    
}
export class FMPNBTEnd extends FMPNBTBasicType{
    
}
export class FMPNBTByte extends FMPNBTBasicType{
    data:any
}
export class FMPNBTShort extends FMPNBTBasicType{
    data:number
}
export class FMPNBTInt extends FMPNBTBasicType{
    data:number
}
export class FMPNBTLong extends FMPNBTBasicType{
    data:number
}
export class FMPNBTFloat extends FMPNBTBasicType{
    data:number
}
export class FMPNBTDouble extends FMPNBTBasicType{
    data:number
}
export class FMPNBTByteArray extends FMPNBTBasicType{
    data:Buffer
}
export class FMPNBTString extends FMPNBTBasicType{
    data:string
}
export class FMPNBTBoolean extends FMPNBTBasicType{
    data:boolean
}