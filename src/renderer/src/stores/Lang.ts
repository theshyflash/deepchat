// stores/selectStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSelectStore = defineStore('select', () => {
  // 定义两个响应式变量
  const LangFirst = ref('');
  const LangSecond = ref('');

  // 设置 LangFirst 的值
  function setLangFir(value: string): void {
    LangFirst.value = value;
    console.log("pinia这边的内容是:"+value);
  }

  // 设置 LangSecond 的值
  function setLangSecond(value: string): void {
    LangSecond.value = value;
    console.log("pinia这边的内容是:"+value);
  }

  // 返回状态和方法
  return {
    LangFirst,
    LangSecond,
    setLangFir,
    setLangSecond,
  };
});
