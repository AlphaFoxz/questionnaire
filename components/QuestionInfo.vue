<script setup lang="ts">
import Card from 'primevue/card'
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider'
import type { Option } from '~/define'

const props = defineProps({
  id: { type: String, required: true },
  content: { type: String, required: true },
  options: { type: Array, required: true },
})

const questionStore = useQuestionStore(props.id)
const value = ref(questionStore.getResult(props.id))
watch([() => props.id, value], (v, o) => {
  if (v && o && v[0] === o[0]) {
    questionStore.setResult(o[0], v[1]!)
    return
  }
  value.value = questionStore.getResult(v[0])
})
onUnmounted(questionStore.save)
</script>

<template>
  <Card class="w-full">
    <template #content>
      <div>
        <p class="items-center">{{ content }}</p>
        <Divider></Divider>
        <div class="flex justify-start flex-wrap">
          <div v-for="item in (options as Option[])" :key="item.id" class="w-full" style="margin: 0.4rem 0">
            <RadioButton v-model="value" :value="item.id" :input-id="'option-' + item.id" />
            <label :for="'option-' + item.id">{{ item.content }}</label>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
