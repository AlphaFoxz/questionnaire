<script setup lang="ts">
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import MeterGroup, { type MeterItem } from 'primevue/metergroup'
import QuestionInfo from '~/components/QuestionInfo.vue'
import type { Question } from '~/define'

const route = useRoute()
const id = route.params.id as string
const processStat = reactive<MeterItem[]>([
  {
    label: $t('completed'),
    color: '#34d399',
    icon: '',
    value: 0,
  },
])

const questions = ref<Question[]>([])
const api = useApi()
api.biz.getQuestContent(id, (data) => {
  questions.value = data
})
</script>

<template>
  <div>
    <MeterGroup :value="processStat" class="mt-3"></MeterGroup>
    <Button :label="$t('back')" severity="secondary" @click="$router.push('/')"></Button>
    <Button :label="$t('submit')" :disabled="false"></Button>
    <template v-for="item in questions">
      <QuestionInfo :content="item.content" :options="item.options" />
    </template>
    <Button :label="$t('prevQuestion')" severity="info"></Button>
    <Button :label="$t('nextQuestion')" severity="info"></Button>
  </div>
</template>
