<script setup lang="ts">
import Card from 'primevue/card'
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider'
import type { Option } from '~/define'

const props = defineProps({
  content: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  options: { type: Array, required: true },
})
const value = ref()
</script>

<template>
  <Card class="w-2/3">
    <template #content>
      <p class="items-center">{{ content }}</p>
      <Divider></Divider>
      <template v-for="item in (options as Option[])" :key="item.id">
        <RadioButton v-model:value="value" :input-id="item.id" />
        <label :for="item.id">{{ item.content }}</label>
      </template>
    </template>
  </Card>
</template>
