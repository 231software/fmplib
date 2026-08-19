import { FMPCommandExecutor } from "../Game/Command.js";

export class FMPCommandEvent{
    executor:FMPCommandExecutor
    command:string
    static on(callback:(event:FMPCommandEvent)=>boolean|void):void
}