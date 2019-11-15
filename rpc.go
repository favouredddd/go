package main
import (
	"net/http"
	"log"
	"bytes"
)
// 模拟RPC客户端的请求和接收消息封装
func DoReQuestServer(ch chan string){
	client := &http.Client{}
	//生成要访问的url
	url := "https://nodom.store"
	//http请求
	request,error := http.NewRequest("GET",url,nil)
 
	if(error != nil){
		panic(error)
	}
 
	//处理返回结果
	response,_ := client.Do(request)
 
	//将结果定位到标准输出 也可以直接打印出来 或者定位到其他地方进行相应的处理
 
		buf := new(bytes.Buffer)
		buf.ReadFrom(response.Body)
		ch<-buf.String();
}
func main() {
    // 创建一个无缓冲字符串通道
    ch := make(chan string)
    // 并发执行服务器逻辑
    go DoReQuestServer(ch)
	// 客户端请求数据和接收数据
	var data =<-ch;
	log.Print(data);
	
}
