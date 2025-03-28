function newLoggerDateString(){
    const now=new Date()
    return (
        //now.getFullYear().toString().padStart(4,'0')+
        (now.getMonth()+1).toString().padStart(2,'0')+
        now.getDate().toString().padStart(2,'0')+"-"+
        now.getHours().toString().padStart(2,'0')+":"+
        now.getMinutes().toString().padStart(2,'0')+":"+
        now.getSeconds().toString().padStart(2,'0')+"."+
        (now.getTime()%1000).toString().padStart(3,'0')
    )
}
/**
 * 在控制台中打印日志  
 * 由于并不是所有平台都拥有日志，所以此API可能执行后没有任何效果
 */
export class FMPLogger{
    /**
     * 以debug等级打印日志  
     * debug等级是大部分平台的最低日志等级，默认设置下可能不会直接打印，需要在相应平台的软件中进行配置才能显示该等级日志
     * @param args 所有需要打印的信息，使用any类型是因为对应平台可能会将不是字符串类型的数据转换成字符串并根据其值和平台自身特性进行格式化
     */
    static debug(...args:any){
        console.debug(newLoggerDateString(),"DEBUG",...args);
    }
    /**
     * 以info等级打印日志  
     * @param args 所有需要打印的信息，使用any类型是因为对应平台可能会将不是字符串类型的数据转换成字符串并根据其值和平台自身特性进行格式化
     */
    static info(...args:any){
        console.log(newLoggerDateString(),"INFO ",...args);
    }
    /**
     * 以warn等级打印日志  
     * 如果平台不支持warn等级，执行效果可能与`FMP.info`或`FMP.error`相同
     * @param args 所有需要打印的信息，使用any类型是因为对应平台可能会将不是字符串类型的数据转换成字符串并根据其值和平台自身特性进行格式化
     */
    static warn(...args:any){
        console.warn(newLoggerDateString(),"WARN ",...args);
    }
    /**
     * 以error等级打印日志  
     * @param args 所有需要打印的信息，使用any类型是因为对应平台可能会将不是字符串类型的数据转换成字符串并根据其值和平台自身特性进行格式化
     */
    static error(...args:any){
        console.error(newLoggerDateString(),"ERROR",...args);
    }
    /**
     * 以fatal等级打印日志  
     * 如果平台不支持fatal等级，执行效果可能与`FMP.info`或`FMP.error`相同
     * @param args 所有需要打印的信息，使用any类型是因为对应平台可能会将不是字符串类型的数据转换成字符串并根据其值和平台自身特性进行格式化
     */
    static fatal(...args:any){
        console.error(newLoggerDateString(),"FATAL",...args)
    }
}