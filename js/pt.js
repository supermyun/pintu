var img = new Image();
img.src = sessionStorage.getItem("image");
img.width = "500";
img.height = "500";

//将图像分为value行value列共value*value个块

var widthNum = parseInt(sessionStorage.getItem("level"));
var heightNum = parseInt(sessionStorage.getItem("level"));

var k = 0;
//定义二维数组：[[0,1,2...],[...]...]
var martix = new Array();
for (var i = 0; i < heightNum; i++) {
    martix[i] = new Array();
    for (var j = 0; j < widthNum; j++) {
        martix[i][j] = k;
        k++;
    }
}
//改变数组的第1行最后一个数的值为行数和列数的积，即为value*value
martix[0][widthNum - 1] = widthNum * heightNum;

var canvas = document.getElementById("my");
var context = canvas.getContext("2d");
var wid = canvas.width;
var hgt = canvas.height;
//得到每个图像块的高度和宽度
var perWidth = wid / widthNum;
var perHeight = hgt / heightNum;
//将图像块画到画布上
var drawPic = function () {
    //先清空画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < martix.length; i++) {
        for (var j = 0; j < martix[i].length; j++) {
            //值为value*value 的那个块就是空白块，不画出来
            if (martix[i][j] != widthNum * heightNum) {
                //计算每个图像块的左上角的坐标（在原图像中）
                var ii = Math.floor(martix[i][j] % widthNum) * perWidth;
                var jj = Math.floor(martix[i][j] / widthNum) * perHeight;
                //下面的drawImage方法是画布的方法，此方法可以对原图进行切割显示
                context.drawImage(
                    img,//表示原图
                    ii,jj,//表示被显示的块在原图中的位置
                    perWidth,perHeight, //表示被显示的块的宽度和高度
                    j * perWidth,i * perHeight,//表示被显示的块在画布上显示的位置
                    perWidth,perHeight//表示被显示的块显示的宽度和高度
                );
            }
        }
    }
    //判断是否成功
    if (isSuccess()) {
        //调用成功
        success();
    } else {
        //没有就画线
        drawLine();
    }
};
//游戏开始时，首先要将图片的块打乱。打乱就是将空白块和相邻位置的块交换
var daLuan = function () {
    var i = 0;
    //空白块和相邻的块交换10次
    while (i < 10) {
        var r = Math.floor(Math.random() * 4);//0或4
        switch (r) {
            case 0: //空白块向下移动
                if (whiteBlock.row < heightNum - 1) {
                    martix[whiteBlock.row][whiteBlock.col] =
                        martix[whiteBlock.row + 1][whiteBlock.col];
                    martix[whiteBlock.row + 1][whiteBlock.col] = widthNum * heightNum;
                    whiteBlock.row = whiteBlock.row + 1;
                    i = i + 1;
                }
                break;
            case 1: //空白块向上移动
                if (whiteBlock.row > 0) {
                    martix[whiteBlock.row][whiteBlock.col] =
                        martix[whiteBlock.row - 1][whiteBlock.col];
                    martix[whiteBlock.row - 1][whiteBlock.col] = widthNum * heightNum;
                    whiteBlock.row = whiteBlock.row - 1;
                    i = i + 1;
                }
                break;
            case 2: //空白块向左移动
                if (whiteBlock.col > 0) {
                    martix[whiteBlock.row][whiteBlock.col] =
                        martix[whiteBlock.row][whiteBlock.col - 1];
                    martix[whiteBlock.row][whiteBlock.col - 1] = widthNum * heightNum;
                    whiteBlock.col = whiteBlock.col - 1;
                    i = i + 1;
                }
                break;

            case 3: //空白块向右移动
                if (whiteBlock.col < widthNum - 1) {
                    martix[whiteBlock.row][whiteBlock.col] =
                        martix[whiteBlock.row][whiteBlock.col + 1];
                    martix[whiteBlock.row][whiteBlock.col + 1] = widthNum * heightNum;
                    whiteBlock.col = whiteBlock.col + 1;
                    i = i + 1;
                }
                break;
        }
    }
};
//画线
var drawLine = function () {
    for (var i = 0; i <= widthNum; i++) {
        context.moveTo(i * perWidth, 0);
        context.lineTo(i * perWidth, wid);
    }
    for (var i = 0; i <= heightNum; i++) {
        context.moveTo(0, i * perHeight);
        context.lineTo(hgt, i * perHeight);
    }
    context.stroke();
};

document.body.onload = function () {
    daLuan();
    drawPic();
};
//定义空白块
var whiteBlock = {
    row: 0,
    col: widthNum - 1
};
//处理键盘事件
var j = 0;
$("body").bind("keydown", function (event) {
    event = event || window.event;
    if (event.keyCode == 40) {
        j++;
        if (whiteBlock.row < heightNum - 1) {
            martix[whiteBlock.row][whiteBlock.col] =
                martix[whiteBlock.row + 1][whiteBlock.col];
            martix[whiteBlock.row + 1][whiteBlock.col] = widthNum * heightNum;
            whiteBlock.row = whiteBlock.row + 1;
        }
    }
    if (event.keyCode == 38) {
        j++;
        if (whiteBlock.row > 0) {
            martix[whiteBlock.row][whiteBlock.col] =
                martix[whiteBlock.row - 1][whiteBlock.col];
            martix[whiteBlock.row - 1][whiteBlock.col] = widthNum * heightNum;
            whiteBlock.row = whiteBlock.row - 1;
        }
    }
    if (event.keyCode == 37) {
        j++;
        if (whiteBlock.col > 0) {
            martix[whiteBlock.row][whiteBlock.col] =
                martix[whiteBlock.row][whiteBlock.col - 1];
            martix[whiteBlock.row][whiteBlock.col - 1] = widthNum * heightNum;
            whiteBlock.col = whiteBlock.col - 1;
        }
    }
    if (event.keyCode == 39) {
        j++;
        if (whiteBlock.col < widthNum - 1) {
            martix[whiteBlock.row][whiteBlock.col] =
                martix[whiteBlock.row][whiteBlock.col + 1];
            martix[whiteBlock.row][whiteBlock.col + 1] = widthNum * heightNum;
            whiteBlock.col = whiteBlock.col + 1;
        }
    }
    drawPic();
    // let score = parseInt(document.getElementById("step").innerText) + j;
    //步数
    document.getElementById("step").innerText = j;
});
var success = function () {
    context.font = "60px Comic Sans Ms";
    context.fillStyle = "Orange";
    //居中
    context.textAlign = "center";
    context.textBaseline = "middle";
    //成功文字
    context.fillText("SUCCESS", 200, 200);
    //取消键盘事件
    $("body").unbind("keydown");
};
//判断是否成功
var isSuccess = function () {
    for (var i = 0; i < widthNum; i++) {

        for (var j = 0; j < heightNum; j++) {
            if (
                i * heightNum + j != martix[i][j] &&
                i * heightNum + j != heightNum - 1
            )
                return false;
        }
    }
    return true;
};
//计时

var gameTime=function(hour,minute,second){
    this.hour=hour;
    this.minute=minute;
    this.second=second;
    this.myTime="";
    this.show=function(){
        if (this.second==60){
            this.second=0;
            this.minute=this.minute+1;
        }
        if (this.minute==60){
            this.minute=0;
            this.hour=this.hour+1;
        }
        this.myTime="";
        if (this.hour<10){
            this.myTime=this.myTime+"0"+this.hour+":";
        }else{
            this.myTime=this.myTime+this.hour+":";
        }
        if (this.minute<10){
            this.myTime=this.myTime+"0"+this.minute+":";
        }else{
            this.myTime=this.myTime+this.minute+":";
        }
        if (this.second<10){
            this.myTime=this.myTime+"0"+this.second;
        }else{
            this.myTime=this.myTime+this.second+"";
        }
    };
    this.draw=function(){
        document.getElementById("gameTime").fillText("计时:"+this.myTime,700,10);
        
    }
}