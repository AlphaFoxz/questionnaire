import { Socket, io } from 'socket.io-client'
import type { QuestMeta, Questionnaire } from '~/define'

const config = useRuntimeConfig()

interface BizApi {
  readonly getHomeList: () => Promise<QuestMeta[]>
  readonly getQuestionnaireInfo: (id: string) => Promise<Questionnaire>
  readonly checkPassword: (id: string, password: string) => Promise<boolean>
  readonly getToken: () => Promise<string>
  readonly submitQuestionnaire: (id: string, token: string, results: { [k: string]: string }) => Promise<string>
}
interface ProjectApi {
  readonly getTitle: () => Promise<string>
}
interface FullyApi {
  readonly WEBSOCKET: Socket
  readonly project: ProjectApi
  readonly biz: BizApi
}

let socket: Socket
const api: FullyApi = {
  WEBSOCKET: socket!,
  project: {
    getTitle: function () {
      return new Promise((resolve) => {
        socket.emit('project.getTitle', (res: string) => {
          resolve(res)
        })
      })
    },
  },
  biz: {
    getHomeList: async function () {
      return new Promise((resolve) => {
        socket.emit('biz.getHomeList', (res: QuestMeta[]) => {
          resolve(res)
        })
      })
    },
    getQuestionnaireInfo: async function (id: string) {
      return new Promise((resolve) => {
        socket.emit('biz.getQuestionnaireInfo', { id }, (res: Questionnaire) => {
          resolve(res)
        })
      })
    },
    checkPassword: function (id: string, password: string) {
      return new Promise((resolve) => {
        socket.emit('biz.checkPassword', { id, password }, (res: boolean) => {
          resolve(res)
        })
      })
    },
    getToken: function () {
      return new Promise((resolve) => {
        socket.emit('biz.getToken', (res: string) => {
          resolve(res)
        })
      })
    },
    submitQuestionnaire: function (id: string, token: string, results: { [k: string]: string }) {
      return new Promise((resolve) => {
        socket.emit('biz.submitQuestionnaire', { id, token, results }, (res: string) => {
          resolve(res)
        })
      })
    },
  },
}

export default () => {
  const URL = `wss://${config.public.serverHost}:${config.public.serverPort}`
  if (!socket || !socket.connected) {
    socket = io(URL, { autoConnect: true })
    socket.on('disconnect', () => socket.connect())
  }
  return api
}
