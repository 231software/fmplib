# 2025年9月24日起已重构的API

## File.ts

### File
全部方法全改成异步  
permanently_delete方法名改为ermanentlyDelete  

### JSONFile
类名改了  
初始化需要用静态工厂方法  
除了get和静态的version之外全是promise

## http.ts
sendJSONSimplePOST改为sendSimplePOST，content-type由传入的enum控制  
sendSimpleGET和sendSimplePOST改为异步，而且要求传入完整url，返回HTTPIncomingMessage  

## Command.ts

### 继承链重构（2026-08-23）
新继承链：`Player → Entity → Actor → CommandExecutor(abstract) → Permissible(空基类)`

- `FMPCommandExecutor`改为抽象类，`sendSuccess`/`sendError`改为抽象方法，由平台子类实现（控制台执行者走日志）。构造函数改为`protected constructor(name)`，插件无法再自行构造执行者。
- 删除`asPlayer()`/`asEntity()`和`FMPCommandExecutorType`枚举，废弃类型标签机制。类型判断改用各子类的`static from(source: FMPPermissible)`：每层只委派给直接上层再校验本层类型，如`Player.from`经`Entity.from`逐级向下。转换失败返回`undefined`，插件按需判空即可，无需先判断类型再强转。
- 新增`FMPConsoleExecutor`（控制台执行者具体子类）：空壳层为`Game/ConsoleExecutor.ts`，nodejs平台与`FMPCommandExecutor`同文件（避免ESM循环引用）。`FMPEntity.isPlayer()`保留，`toPlayer()`删除（由`Player.from`接管）。
- 权限基类掏空：`FMPPermissible`（`name`/`hasPermission`）移入`Features/Permissible.ts`成为空类，权限能力后续补充；`FMPUserGroup`改继承空基类。
- 导出变化：`CommandExecutorType`从index移除，新增`Actor`、`ConsoleExecutor`、`Permissible`。
- llse平台实现暂未跟进本次重构（保留旧实现，编译用自身文件自洽），后续任务对齐。

## 明显不需要改的部分

维度那边的更改不在此次更改的范畴内，维度那个是单独的一个适配多维度的计划  
经济也不需要改，因为已经是多经济了
容器也不需要改
其他实体相关的都在仿原版的类继承的计划里面改，这个计划不包含它在内
