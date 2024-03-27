export type QuestMeta = {
  id: string
  title: string
  description: string
}

export type Option = {
  id: string
  content: string
}

export type Question = {
  id: string
  content: string
  questionnaire_id: string
  options: Option[]
}
