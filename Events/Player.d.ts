import { FMPCommandExecutor } from "../Game/Command";
import { FMPItem } from "../Game/Item";
import { FMPPlayer } from "../Game/Player";
export class FMPPlayerJoinEvent{
    player:FMPPlayer
    static on(callback:(event:FMPPlayerJoinEvent)=>boolean|void):void
}
export class FMPPlayerToggleSneakEvent{
    player:FMPPlayer
    isSneaking:boolean
    static on(callback:(event:FMPPlayerToggleSneakEvent)=>boolean|void):void
}
export class FMPPlayerChatEvent{
    player:FMPPlayer
    msg:string
    static on(callback:(event:FMPPlayerChatEvent)=>boolean|void):void
}
export class FMPPlayerDropItemEvent{
    player:FMPPlayer
    item:FMPItem
    static on(callback:(event:FMPPlayerDropItemEvent)=>boolean|void):void
}
export class FMPPlayerUseItemEvent{
    player:FMPPlayer
    item:FMPItem
    static on(callback:(event:FMPPlayerUseItemEvent)=>boolean|void):void
}
