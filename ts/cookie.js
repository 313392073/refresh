let cookieObj = {
    /**
     * saveCookie 存储cookie
     * @param {String} name 存取的名字 
     * @param {*} value  //存入的值
     * @param {*} time  //过期时间设置
     */
    saveCookie(name,value,time = 1) { //time默认为1小时
        let nowTime = new Date()
        nowTime.setTime(nowTime.getTime()+time*6*60*1000*10)
        let expires = "expires="+nowTime.toGMTString(); //转化成格林威治时间
        document.cookie = name + "=" + value + "; " + expires
    },
    /**
     * getCookie 获取cookie
     * @param {String} name 获取name名字的cookie值  
     */
    getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        }else{
            return null
        }
    },
    /**
     * delCookie 删除指定的cookie值
     * @param {String} name 删除name名字的cookie值 
     */
    delCookie(name) {
        this.saveCookie(name,'',-1)
    }
}