package utils
import (
	"strconv"
	"fmt"
)
func ToNum(s string) int {
	b,error := strconv.Atoi(s)
    if error != nil{
	   fmt.Println("字符串转换成整数失败");
    }
    return b;
}
func ToString(num int) string{
	var s string;
	s= strconv.Itoa(num) 
	return s
}