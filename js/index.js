window.onload = function () {
    var imgs = ["images/a1.jpg", "images/a2.jpg", "images/a3.jpg", "images/a4.jpg",
        "images/a5.jpg", "images/a6.jpg", "images/a7.jpg", "images/a8.jpg"
    ];
    //图片数组
    var content = "";
    for (var i = 0; i < imgs.length; i++) {
        content = content + "<img src='" + imgs[i] + "'/>";
    }
    //显示到HTML上
    document.getElementById("div").innerHTML = content;
    var imgs__ = document.getElementsByTagName("img");
    for (var i in imgs) {
        /**
        imgs__[i].onmouseover=function(){                      
            this.src="images/a0.png";
        };
        imgs__[i].onmouseout=function(){
            this.src=imgs[i];
        }**/
        (function (i) {
            //鼠标移动到他上面
            imgs__[i].onmouseover = function () {
                this.src = "images/a0.jpeg";
            };
            //鼠标从上面移动去
            imgs__[i].onmouseout = function () {
                this.src = imgs[i];
            }
            //点击图片事件跳转游戏界面
            imgs__[i].onclick = function () {
                //缓存图片
                var h = sessionStorage.setItem("image", imgs[i]);
                //缓存难度值
                var items = document.getElementsByName("level");
                for (var j in items) {
                    if (items[j].checked) {
                        sessionStorage.setItem("level", items[j].value);
                        break;
                    }
                }
                window.location.href = "pintu.html";
            }
        })(i);
    }
}
