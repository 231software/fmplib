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

## 明显不需要改的部分

维度那边的更改不在此次更改的范畴内，维度那个是单独的一个适配多维度的计划  
经济也不需要改，因为已经是多经济了
容器也不需要改
其他实体相关的都在仿原版的类继承的计划里面改，这个计划不包含它在内
