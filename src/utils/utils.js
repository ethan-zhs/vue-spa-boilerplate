// 存储COOKIE
export const setCookie = (cname, value, s) => {
    const exdate = new Date();
    exdate.setTime(exdate.getTime() + s * 1000);
    document.cookie = cname + '=' + escape(value) + ';expires=' + exdate.toGMTString();
};


// 获取COOKIE
export const getCookie = (cname) => {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cname + '=');
        if (cStart != -1) {
            cStart = cStart + cname.length + 1;
            let cEnd = document.cookie.indexOf(';', cStart);
            if (cEnd == -1) cEnd = document.cookie.length;
            return unescape(document.cookie.substring(cStart, cEnd));
        }
    }
    return false;
};
