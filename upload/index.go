package upload
import (
	"net/http"
	"log"
	"../utils"
	"os"
	"io"
	"time"
)
type fileMap struct{
	fileChipes   map[string]int
	total        int
	all          int
}
func merge(fileName string,file fileMap){
	var index int =file.all;
	t2 := time.Now()
	fii, err := os.OpenFile("./uploads/" + fileName, os.O_WRONLY | os.O_CREATE, 0666)
   if err != nil {
      panic(err)
      return
   }
   for i := 0; i <index; i++ {
	var pathName string="./uploads/"+fileName+utils.ToString(i)
      f, err := os.OpenFile(pathName, os.O_RDONLY, os.ModePerm)
      if err != nil {
         log.Println(err)
         return
	  }
	  buf := make([]byte, 1024)
	  _, cpErr := io.CopyBuffer(fii, f, buf)
	  if cpErr != nil {
		  log.Fatal(cpErr)
	  }
	  f.Close()
	  os.Remove(pathName)
   }
   fii.Close();
   t1 := time.Now()
   log.Println(t1.Sub(t2))
}
var filemap=map[string] *fileMap{};
func UploadHandler(w http.ResponseWriter, r *http.Request){
	r.ParseMultipartForm(32 << 20)
	var fileName,index string;
	var all int;
	if r.MultipartForm != nil {
	   values := r.MultipartForm.Value;
	   v:= values["date"][0];
	   a:= values["all"][0];
	   i:= values["index"][0];
	   fileName=v;
	   index=i;
	   all=utils.ToNum(a);
	}
	_,exit:=filemap[fileName];
	if exit==false {
		filemap[fileName]=&fileMap{map[string]int{},all,all}
	}
	_,ok:=filemap[fileName].fileChipes[index];
	fp:=filemap[fileName]
	if ok==false {
		fp.total--;
	}
	filemap[fileName].fileChipes[index]=1;
	file,handler, err := r.FormFile("file")
   if err != nil {
      log.Printf("Get form file failed: %s\n", err)
      return
   }
    file.Close();
	f, err := os.OpenFile("./uploads/" + handler.Filename+index, os.O_WRONLY | os.O_CREATE, 0666)
	if err != nil{
		log.Println("open file err: ", err)
		return
	}
	f.Close()
	//拷贝文件
	io.Copy(f, file)
	if filemap[fileName].total==0 {
		log.Println("merge")
		merge(handler.Filename,*filemap[fileName])
		filemap[fileName].total=-1;
	}
}