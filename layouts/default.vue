<script setup lang="ts">
import Dropdown from 'primevue/dropdown'

const title = ref('')
const api = useApi()
api.project.getTitle((t) => {
  title.value = t
})
const { locale } = useI18n()
</script>

<template>
  <div>
    <div style="height: 5vh">
      <Dropdown
        v-model="locale"
        :options="[{ name: '简体中文', code: 'zh' }]"
        option-label="name"
        option-value="code"
      ></Dropdown>
      <h1 class="inline-block">{{ title }}</h1>
    </div>
    <div style="height: calc(100vh - 5vh)">
      <slot></slot>
    </div>
  </div>
</template>
