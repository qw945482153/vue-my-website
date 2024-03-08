export const genNickName = () => {
    // 获取指定范围内的随机数
   const randomAccess = (min, max) => Math.floor(Math.random() * (min-max) + max)
   // 解码
   const decodeUnicode =  (str) => {
        // Unicode显示方式是\u4e00
        str = '\\u'+str;
        str = str.replace(/\\/g,"%");
        // 转换成中文
        str = unescape(str);
        // 多余的转变回来
        str = str.replace(/%/g,"\\");
        return str;
   }

   const getRandomName = (len) => {
    let name = "";
    for(let i = 0; i < len; i++){
        let unicodeNum = "";
        unicodeNum = randomAccess(0x4e00,0x9fa5).toString(16);
        name += decodeUnicode(unicodeNum)
    }
    return name;
   }
   return getRandomName(3);
}