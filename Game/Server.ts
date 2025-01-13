/**
 * 为服务器设置motd，覆盖之前显示的motd。  
 * motd是玩家添加你的服务器后，在他们的服务器列表中服务器名下方显示的内容。
 * @param motd 要设置的motd
 */
export function FMPsetMotd(motd:string):void{

}
export function FMPgetMaxPlayers():number{
    return 1
}
export function FMPsetMaxPlayers(number:number):void{

}
export function FMPgetProtocol():number{
    return 0
}
export function FMPgetMCVersion():string{
    return "0.0.0"
}
export function FMPgetPluginLoaderName():string{
    return "fmplib"
}
export enum MCType{
    BEDROCK,
    JAVA,
    NOTMC
}
export function FMPgetMCType():MCType{
    return MCType.NOTMC
}
export function FMPgetServerTime():number{
    return 0
}
export function FMPsetServerTime(tick:number):void{
    
}
export enum MCWeather{
    CLEAR,
    RAIN,
    THUNDER
}
export function FMPgetWeather():MCWeather{
    return MCWeather.CLEAR
}
export function FMPsetWeather(weather:MCWeather):void{
}
