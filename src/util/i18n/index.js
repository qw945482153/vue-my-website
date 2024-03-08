import {createI18n} from 'vue-i18n'
import EN from '../../config/language/en.js'
import ZH from '../../config/language/zh.js'

const messages={
    en:EN,
    zh:ZH
}
//判断游览器语言
let language=window.navigator.language.toLocaleLowerCase().indexOf('zh')!=-1?'zh':'en'
if(!localStorage.getItem('languageSetting')){
    localStorage.setItem('languageSetting',language)
}

export const i18n=createI18n({
    locale:localStorage.getItem('languageSetting'),
    messages:messages
})

