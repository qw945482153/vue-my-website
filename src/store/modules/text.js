import { defineStore } from 'pinia'

export const useTextStore = defineStore('text',{
    state:() => {
        return{
            isIn:false
        }   
        
    },
    // getters:{

    // },
    // actions:{
    //     changeState(e){
    //         this.isIn = e;
    //     }
    // }
})
