# fmplib
Library file to be referenced by full moon platform projects. It is also responsible for defining APIs and providing documents.

> [!WARNING]  重要通知  
> 为了进一步扩大满月平台的适用范围，fmplib近期有大量API重构。  
> 更新至最新的满月平台API时，您需要修改现有插件的源代码  
> [受影响的API列表](RefactoredAPIs.md)


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