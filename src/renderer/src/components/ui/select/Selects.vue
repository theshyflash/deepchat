<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLangStore } from '@/stores/Lang';
const LangStore = useLangStore()
// 定义左侧和右侧的选项
const leftOptions = ref(['中文', '日语', '英语']);
const rightOptions = ref(['中文', '日语', '英语']);

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
  width: 150px;
}
</style>
