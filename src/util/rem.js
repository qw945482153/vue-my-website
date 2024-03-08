function remSize(){
    var deviceWidth = document.documentElement.clientWidth||window.innerWidth
    if(deviceWidth>=750){
        deviceWidth=750
    }
    else if(deviceWidth<=320){
        deviceWidth=320
    }
    document.documentElement.style.fontSize=(deviceWidth/7.5)+'px'
    document.querySelector('body').style.fontSize=0.3+'rem'
}
//手机端
// function remSize(){
//     console.log(document.documentElement.style.fontSize)
//     var width = document.documentElement.clientWidth||window.innerWidth
//     var deviceWidth=320;
//     let maxWidth=620;
//     width>maxWidth && (width=maxWidth)
//     let rem=width*100/deviceWidth;
//     document.documentElement.style.fontSize=rem+'px'
//     document.querySelector('body').style.fontSize=0.3+'rem'
// }
remSize()

window.onresize=function(){
    remSize()
}