# fmplib
Library file to be referenced by full moon platform projects. It is also responsible for defining APIs and providing documents.

若要在其他git仓库中引用此仓库，请按以下方式操作：
 - 通过子模块引用
<details>
  <summary>操作方式</summary>
  
1. 执行以下命令，将此仓库添加为子模块  
```shell
git submodule add https://github.com/231software/fmplib.git <放置此仓库的文件夹>
```
例如你要让一个满月平台项目引用该仓库：  
```shell
git submodule add https://github.com/231software/fmplib.git lib
```

2. 执行以下命令，初始化子模块  
```shell
git submodule init
```

3. 执行以下命令，更新子模块
```shell
git submodule update
```

4. 提交更改
</details>

不建议直接将仓库复制粘贴，尤其是对于大型的项目，这样可能会不便于管理。