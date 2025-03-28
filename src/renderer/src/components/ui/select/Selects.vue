<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLangStore } from '@/stores/Lang';
const LangStore = useLangStore()
// 定义左侧和右侧的选项
const leftOptions = ref([
  '中文', // 中文
  '日语', // 日语
  '英语', // 英语
  '韩语', // 韩语
  '法语', // 法语
  '意大利语', // 意大利语
  '西班牙语', // 西班牙语
  '德语', // 德语
  '葡萄牙语', // 葡萄牙语
  '俄语', // 俄语
  '阿拉伯语', // 阿拉伯语
]);

const rightOptions = ref(leftOptions.value); // 右侧选项与左侧一致

// 定义左侧和右侧选中的值
const leftSelect = ref(''); // 左侧选中的值
const rightSelect = ref(''); // 右侧选中的值

// 监听左侧选中的值
watch(leftSelect, (newValue:string) => {
  LangStore.setFirstLang(newValue);
  console.log('左侧选中的值:', newValue);
});

// 监听右侧选中的值
watch(rightSelect, (newValue:string) => {
  LangStore.setSecondLang(newValue);
  console.log('右侧选中的值:', newValue);
});

// const settings = ref({
//   deepThinking: false,
//   webSearch: false
// })
</script>

<template>
  <div class="outer">
    <div class="input-group">
      <!-- 左侧下拉框 -->
      <select v-model="leftSelect" class="select">
        <option disabled value="">请选择</option>
        <option v-for="option in leftOptions" :key="option" :value="option">{{ option }}</option>
      </select>
      <span> → </span>
      <!-- 右侧下拉框 -->
      <select v-model="rightSelect" class="select">
        <option disabled value="">请选择</option>
        <option v-for="option in rightOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.outer {
  display: flex;
  justify-content: flex-end; /* 内容靠右 */
  padding: 10px;
  border-radius: 8px;
  width: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 150px; /* 设置正常宽度 */
  background-color: white; /* 默认背景色 */
  color: black; /* 默认文字颜色 */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

/* 聚焦时的样式 */
.select:focus {
  border-color: #007bff; /* 边框颜色变为蓝色 */
  outline: none; /* 移除默认的 outline */
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); /* 添加蓝色阴影 */
}

.dark .select {
  background-color: #333; /* 黑夜模式背景色 */
  color: white; /* 黑夜模式文字颜色 */
  border-color: #555; /* 黑夜模式边框颜色 */
}

/* 黑夜模式下的聚焦样式 */
.dark .select:focus {
  border-color: #007bff; /* 边框颜色变为蓝色 */
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); /* 添加蓝色阴影 */
}
</style>
