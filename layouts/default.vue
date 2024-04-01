<script setup lang="ts">
import Dropdown from 'primevue/dropdown'

const title = ref('')
const api = useApi()
api.project.getTitle().then((t) => {
  title.value = t
})
const { locale } = useI18n()
</script>

<template>
  <div style="padding: 0 0.5rem">
    <div>
      <Dropdown
        class="hidden"
        v-model="locale"
        :options="[{ name: '简体中文', code: 'zh' }]"
        option-label="name"
        option-value="code"
      ></Dropdown>
      <h1 class="inline-block">{{ title }}</h1>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
