import type { UnwrapNestedRefs } from 'vue'

type QuestionResults = {
  [k: string]: string
}
const questionMap: { [k: string]: UnwrapNestedRefs<QuestionResults> } = {}

function load(id: string): UnwrapNestedRefs<QuestionResults> {
  if (questionMap[id]) {
    return questionMap[id]
  }
  try {
    const v = reactive(JSON.parse(localStorage.getItem(id) || '{}'))
    questionMap[id] = v
    return v
  } catch (e) {
    return reactive({})
  }
}

type StoreReturnType = {
  readonly results: UnwrapNestedRefs<QuestionResults>
  readonly setResult: (id: string, value: string) => void
  readonly getResult: (id: string) => string | undefined
  readonly save: () => void
}

export default (id: string) => {
  const results = load(id)
  function setResult(id: string, value: string) {
    results[id] = value
  }
  function getResult(id: string) {
    return results[id]
  }
  function save() {
    localStorage.setItem(id, JSON.stringify(results))
  }
  const r: StoreReturnType = {
    results,
    getResult,
    setResult,
    save,
  }
  return r
}
