
/**
 * ## 权限节点  
 * 如果一个权限节点实例没有被另一个权限节点拥有，那么它就是父节点  
 * 不允许将一个权限节点实例赋值给另一个节点，为此，childNodes为private  
 * 你可以自行new节点，但是你new出来的将会是根节点，它将无法成为任何节点的子节点
 */
export class PermissionNode{
    name:string
    defaultAllowed:boolean
    private childNodes:Map<string,PermissionNode>=new Map()
    constructor(name:string,defaultAllowed:boolean){
        this.name=name
        this.defaultAllowed=defaultAllowed
    }
    /**
     * 添加新节点，如果已存在则覆盖  
     * 只允许直接新增节点，不允许赋值节点实例
     */
    setNode(name:string,defaultAllowed:boolean){
        this.childNodes.set(name,new PermissionNode(name,defaultAllowed))
    }
    getNode(name:string):PermissionNode|undefined{
        return this.childNodes.get(name)
    }
    deleteNode(name:string){
        this.childNodes.delete(name)
    }
}
export class FMPPermissible{
    name:string
    hasPermission(nodeNames:string[]):boolean{
        return false
    }
}
export class FMPUserGroup extends FMPPermissible{
    users:Set<string>
}