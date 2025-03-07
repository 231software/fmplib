import { FMPPlayer } from "../Game/Player";
export class FMPPlayerJoinEvent{
    player:FMPPlayer
    constructor(player:FMPPlayer){
    }
    static on(callback:(event:FMPPlayerJoinEvent)=>boolean|void){
    }
}
export class FMPPlayerToggleSneakEvent{
    player:FMPPlayer
    isSneaking:boolean
    constructor(player:FMPPlayer,isSneaking:boolean){
    }
    static on(callback:(event:FMPPlayerToggleSneakEvent)=>boolean|void){
    }
}
export class FMPPlayerChatEvent{
    player:FMPPlayer
    msg:string
    constructor(player:FMPPlayer,msg:string){
    }
    static on(callback:(event:FMPPlayerChatEvent)=>boolean|void){
    }
}