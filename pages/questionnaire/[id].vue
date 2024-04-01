<script setup lang="ts">
import Sidebar from 'primevue/sidebar'
import Button from 'primevue/button'
import MeterGroup, { type MeterItem } from 'primevue/metergroup'
import QuestionInfo from '~/components/QuestionInfo.vue'
import type { Questionnaire, Question } from '~/define'

const i18n = useI18n()
const route = useRoute()
const id = route.params.id as string
const questionnaire = ref<Questionnaire>({ meta: { title: '' }, questions: [] as any } as Questionnaire)
const questionStore = useQuestionStore(id)
const doneCount = ref(0)
const processStat = reactive<MeterItem[]>([
  {
    label: i18n.t('completed'),
    color: '#34d399',
    icon: '',
    value: 0,
  },
])
watch([questionStore.results, questionnaire], (v) => {
  if (!v[1]) {
    return
  }
  const questions = v[1].questions
  if (questions.length === 0) {
    processStat[0].value = 100
    return
  }
  doneCount.value = Object.values(v[0]).filter((v) => v !== undefined && v !== null).length
  processStat[0].value = NumberUtil.toFixedNumber((doneCount.value / questions.length) * 100, 2)
})

const api = useApi()
api.biz.getQuestionnaireInfo(id).then((data) => {
  questionnaire.value = data
})

const currentQuestion = ref(0)
function handlePrev() {
  currentQuestion.value--
}
function handleNext() {
  currentQuestion.value++
}

//=================侧边栏==================
const siderVisible = ref(false)
function isRaised(index: number) {
  return currentQuestion.value === index
}
function isDone(questionId: string) {
  return questionStore.getResult(questionId) ? 'success' : 'secondary'
}
function handleSwitch(index: number) {
  currentQuestion.value = index
  siderVisible.value = false
}

//=================提交==================
const token = await getToken()
function handleSubmit() {
  api.biz.submitQuestionnaire(id, token, questionStore.results).then((data) => {})
}
</script>

<template>
  <div>
    <Sidebar v-model:visible="siderVisible" header="Sidebar">
      <div class="flex">
        <div style="margin: 0.2rem" v-for="(item, index) in questionnaire.questions" :key="item.id">
          <Button :label="`${index + 1}`" :severity="isDone" @click="handleSwitch(index)" :raised="isRaised(index)" />
        </div>
      </div>
    </Sidebar>
    <h2>{{ questionnaire.meta.title }}<Button link icon="pi pi-flag" @click="siderVisible = true" /></h2>
    <div class="flex justify-around">
      <Button :label="$t('back')" severity="secondary" @click="$router.push('/')"></Button>
      <Button
        :label="$t('submit')"
        @click="handleSubmit"
        :disabled="doneCount !== questionnaire.questions.length"
      ></Button>
    </div>

    <MeterGroup :value="processStat" class="mt-3"></MeterGroup>

    <QuestionInfo
      @prev="handlePrev"
      @next="handleNext"
      v-if="questionnaire.questions[currentQuestion]"
      :id="questionnaire.questions[currentQuestion].id"
      :content="questionnaire.questions[currentQuestion].content"
      :options="questionnaire.questions[currentQuestion].options"
    />
    <div class="flex justify-around" style="margin: 1rem 0">
      <div class="w-1/2 text-center">
        <Button v-if="currentQuestion !== 0" @click="handlePrev" :label="$t('prevQuestion')" severity="info"></Button>
      </div>
      <div class="w-1/2 text-center">
        <Button
          v-if="currentQuestion !== questionnaire.questions.length - 1"
          @click="handleNext"
          :label="$t('nextQuestion')"
          severity="info"
        ></Button>
      </div>
    </div>
  </div>
</template>
