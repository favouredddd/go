
package main
import (
	"net/http"
	"html/template"
	"log"
	"regexp"
	"./upload"
	"./chan"
)
func main() {
	http.Handle("/assets/",http.FileServer(http.Dir("/Users/jurrychen/Desktop/person/go/goserver")))
	http.HandleFunc("/",Route);
    http.ListenAndServe(":8888", nil)
}
type routeInfo struct {
    pattern string                                       // 正则表达式
    f       func(w http.ResponseWriter, r *http.Request) //Controller函数
}
var routePath = []routeInfo{
	routeInfo{"^/vue",NotFoundHandler},
	routeInfo{"^/api",ApiHandler},
}
var routeMap = []routeInfo{
	routeInfo{"/api/getChipe", upload.UploadHandler },
}
func ApiHandler(w http.ResponseWriter, r *http.Request) {
	var url string =r.URL.Path;
	 for _ ,p := range routeMap{
		 if url==p.pattern { 
			 p.f(w,r);
		 }
	 }
}
func Route(w http.ResponseWriter, r *http.Request) {
    isFound := false
    for _, p := range routePath {
        // 这里循环匹配Path，先添加的先匹配
        reg, err := regexp.Compile(p.pattern)
        if err != nil {
            continue
        }
        if reg.MatchString(r.URL.Path) {
            isFound = true
            p.f(w, r)
        }
	}
    if !isFound {
		// 未匹配到路由
		NotFoundHandler(w,r);
    }
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
    t, err := template.ParseFiles("index.html")
    if (err != nil) {
        log.Println(err)
	}
    t.Execute(w, nil)
}
