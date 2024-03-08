//home 
import sup from '../assets/img/sup.png'
import readme from '../assets/img/readme.png'
import msg from '../assets/img/msg.png'
import setting from '../assets/img/setting.png'
import ox from '../assets/img/ox.png'
import asciiflow from '../assets/img/asciiflow.png'
import someone from '../assets/img/someone.png'

const homeIcon = {
    sup,readme,msg,setting,ox,asciiflow,someone
}
// 登陆
import smile from '../assets/img/smile.png'
import mail from '../assets/img/mail.png'
// 点赞gif动画
// 点赞gif动画
import g1 from '../assets/gifs/g1.gif'
import g2 from '../assets/gifs/g2.gif'
import g3 from '../assets/gifs/g3.gif'
import g4 from '../assets/gifs/g4.gif'
import g5 from '../assets/gifs/g5.gif'
import g6 from '../assets/gifs/g6.gif'
import g7 from '../assets/gifs/g7.gif'
import g8 from '../assets/gifs/g8.gif'
import g9 from '../assets/gifs/g9.gif'
import g10 from '../assets/gifs/g10.gif'
import g11 from '../assets/gifs/g11.gif'
import g12 from '../assets/gifs/g12.gif'
import g13 from '../assets/gifs/g13.gif'
import g14 from '../assets/gifs/g14.gif'
import g15 from '../assets/gifs/g15.gif'
import g16 from '../assets/gifs/g1.gif'
import g17 from '../assets/gifs/g2.gif'
import g18 from '../assets/gifs/g3.gif'


// about
import imail from '../assets/about/mymail.png'
import igit from '../assets/about/mygit.png'
import icode from '../assets/about/qc.png'
import iadd from '../assets/about/myadd.png'
import icity from '../assets/about/citybg.png'
import emjz from '../assets/about/zzz.png'
import emjs from '../assets/about/sad.png'
import emja from '../assets/about/anger.png'
import emjd from '../assets/about/dis.png'
import emjh from '../assets/about/happy.png'
import icloud from '../assets/about/aboutbg.png'
import myfont from '../assets/about/131.jpg'

// game
import snake from '../assets/smallgame/snake.png'
import g2048 from '../assets/smallgame/2048.png'
import ai from '../assets/img/daoyu.png';
import ai_head from '../assets/img/jiqiren.png';
import usr from '../assets/img/lb.png'

const aboutImg = {
  imail,
  igit,
  icode : '',
  iadd,
  icity,
  emjz,
  emjs,
  emja,
  emjd,
  emjh,
  icloud,
  myfont,
  icode
}


const parrotSrc =  [
    g1,g2,g3,g4,g5,g6,g7,g8,g9,g10,g11,g12,g13,g14,g15,g16,g17,g18
  ] 

let parrotUrl = {}
parrotSrc.map((url)=>{
  [].push.call(parrotUrl,url)
})
let homeImg = {
  mail,smile
}
let gameImg = {
  snake, g2048, ai, ai_head, usr
}
export { homeIcon, parrotUrl, aboutImg, homeImg, gameImg } 