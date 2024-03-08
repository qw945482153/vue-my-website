<template>
    <div>
        <footer class="footer">
        <ul>
          <li>
            <b>const</b>
            {{dateValue}}
          </li>
          <li>
            <b>const</b> UseTime = {{timeValue}}s
          </li>
          <li>
            <b>const</b> Add=广东省深圳市
          </li>
          <li>WWW.rockcelltech.top</li>
          <li>
            <a target="_blank" href="http://www.miitbeian.gov.cn/">
                粤ICP备2023098148号
            </a>
          </li>
        </ul>
      </footer>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
let dateValue = ref();
let timeValue = ref();
function initDateState(){
    const date = new Date();
    dateValue.value  = 'Date = ' + date.getFullYear() + "/" + date.getMonth() + 1 + "/" + date.getDate();
    const useTime = window.__START_DATE__ ? (date.getTime() - window.__START_DATE__) / 1000 : 3;
    timeValue.value = useTime >1 ?Math.ceil(useTime) : useTime.toFixed(1);
}
onMounted(() => {
    initDateState();
})
// console.log(dateValue,timeValue);
</script>
<style lang="scss"> 
$b_border:1px solid #111111;
$color_main:#ffd03f;
.footer{
  width: 100%;
  position: absolute;
  bottom: 6px;
  
  ul{
    display: flex;
    width: 100%;
    flex-wrap:wrap;
    margin: 0;
    padding: 0;
    li{
      border-top: $b_border;
      text-align: center;
      flex-grow: 1;
      font-size: 1rem;
      border-right: $b_border;
      display: block;
      line-height: 64px;
      b{
        color: $color_main;
      }
   }
  }
  ul li:nth-child(4){
    flex-grow:4;
    font-size: 1.2rem;
    font-weight: bold;
  }
  ul li:nth-child(5){
    border-right:none;
    font-size: 12px;
    a{
      color:#fff;
    }
  }
}

@media screen and (max-width: 960px) {
  .footer ul{
    border-left: $b_border;
    li:nth-child(5){
      border-right: $b_border;
    }
  }
}
@media screen and (max-width: 480px) {
  .footer ul{
    li{
      font-size: .8rem;
    }
    li:nth-child(4){
      font-size: 1rem;
    }
  }
}
</style>