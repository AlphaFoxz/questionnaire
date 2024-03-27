import { Socket, io } from 'socket.io-client'
import type { QuestMeta, Question } from '~/define'

const config = useRuntimeConfig()

type StringCallback = (s: string) => void
type QuestMetasCallback = (s: QuestMeta[]) => void
type QuestsCallback = (s: Question[]) => void
type BizApi = {
  readonly getHomeList: (callback: QuestMetasCallback) => void
  readonly getQuestContent: (id: string, callback: QuestsCallback) => void
  readonly submitQuest: (callback: StringCallback) => void
}
type ProjectApi = {
  readonly getTitle: (callback: StringCallback) => void
}
type FullyApi = {
  readonly WEBSOCKET: Socket
  readonly project: ProjectApi
  readonly biz: BizApi
}

let socket: Socket
const api: FullyApi = {
  WEBSOCKET: socket!,
  project: {
    getTitle: function (callback?: StringCallback) {
      socket.emit('project.getTitle', (res: string) => {
        callback?.(res)
      })
    },
  },
  biz: {
    getHomeList: function (callback?: (list: QuestMeta[]) => void) {
      socket.emit('biz.getHomeList', (res: QuestMeta[]) => {
        callback?.(res)
      })
    },
    getQuestContent: function (id: string, callback?: QuestsCallback) {
      socket.emit('biz.getQuestContent', { id }, (res: Question[]) => {
        callback?.(res)
      })
    },
    submitQuest: function (callback?: StringCallback) {
      socket.emit('biz.submitQuest', {}, (res: string) => {
        callback?.(res)
      })
    },
  },
}

export default () => {
  const URL = `http://${config.public.serverHost}:${config.public.serverPort}`
  if (!socket || !socket.connected) {
    socket = io(URL, { autoConnect: true })
    socket.on('disconnect', () => socket.connect())
  }
  return api
}
