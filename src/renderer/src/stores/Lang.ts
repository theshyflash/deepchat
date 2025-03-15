import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLangStore = defineStore('lang',()=>{
    const FirstLang = ref('')
    const SecondLang = ref('')
    const setFirstLang = (lang:string) => {
        FirstLang.value = lang
    }
    const setSecondLang = (lang:string) => {
        SecondLang.value = lang
    }
    return {
      FirstLang,
      SecondLang,
      setFirstLang,
      setSecondLang}
})
