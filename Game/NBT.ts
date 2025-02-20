export enum FMPNBTType{
    LIST,
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
export abstract class FMPNBTObjectLike{
    toString(space:number){

    }
}
export class FMPNBTCompound extends FMPNBTObjectLike{
    constructor(data?:any){
        super()
    }
    get(tagName:string):FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString|FMPNBTBoolean{
        return new FMPNBTEnd()
    }
    set(tagName:string,data:FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString){

    }
    getType(tagName:string):FMPNBTType{
        return FMPNBTType.END
    }
    delete(tagName:string){

    }
    toObject(){

    }
    toSNBT(){
        
    }

}
export abstract class FMPNBTBasicType{
}
export class FMPNBTList extends FMPNBTBasicType{
    get size(){
        return 0;
    }
    getType(index:number):FMPNBTType{
        return FMPNBTType.END
    }
    get(index:number):FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString|FMPNBTBoolean{
        return new FMPNBTEnd()
    }
    set(index:number,data:FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString|FMPNBTBoolean){
    }
    push(data:FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString|FMPNBTBoolean){
    }
    pop(){

    }
    unshift(data:FMPNBTList|FMPNBTEnd|FMPNBTByte|FMPNBTShort|FMPNBTInt|FMPNBTLong|FMPNBTFloat|FMPNBTDouble|FMPNBTByteArray|FMPNBTString|FMPNBTBoolean){
    }
    shift(){

    }
    splice(start:number,deleteCount:number){

    }
    toArray(){

    }
    
}
export class FMPNBTEnd extends FMPNBTBasicType{
    
}
export class FMPNBTByte extends FMPNBTBasicType{
    data:Buffer
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