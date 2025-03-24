import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLangStore = defineStore('lang', () => {
  const FirstLang = ref('');
  const SecondLang = ref('');

  // 设置 FirstLang
  const setFirstLang = (lang: string) => {
    FirstLang.value = lang;
    console.log(FirstLang.value);
  };

  // 设置 SecondLang
  const setSecondLang = (lang: string) => {
    SecondLang.value = lang;
    console.log(SecondLang.value);
  };

  // 清空 FirstLang 和 SecondLang
  const DeleteLang = () => {
    FirstLang.value = '';
    SecondLang.value = '';
  };

  return {
    FirstLang,
    SecondLang,
    setFirstLang,
    setSecondLang,
    DeleteLang,
  };
});
