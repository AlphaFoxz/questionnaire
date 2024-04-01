<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import DataView from 'primevue/dataview'
import type { QuestMeta } from '~/define'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

//================查询列表==================
const list = ref<QuestMeta[]>([])
const layout = ref<'list' | 'grid' | undefined>('list')
const api = useApi()
api.biz.getHomeList().then((data: QuestMeta[]) => {
  list.value = data
})

//================页面跳转==================
const i18n = useI18n()
const router = useRouter()
const confirm = useConfirm()
const password = ref('')
const hasPassword = ref(false)
const toast = useToast()
async function handleInterQuest(item: QuestMeta) {
  password.value = ''
  hasPassword.value = item.has_password
  confirm.require({
    header: item.title,
    message: item.description,
    rejectLabel: i18n.t('cancel'),
    acceptLabel: i18n.t('start'),
    accept: async () => {
      if (item.has_password && !(await checkPassword(item.id, password.value))) {
        showError()
        return
      }
      router.push(`/questionnaire/${item.id}`)
    },
  })
}
async function checkPassword(id: string, password: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    api.biz.checkPassword(id, password).then((b) => {
      resolve(b)
    })
  })
}
function showError() {
  toast.add({
    severity: 'error',
    summary: '错误',
    detail: '密码错误',
    life: 3000,
  })
}
</script>

<template>
  <div>
    <ConfirmDialog class="flex-wrap">
      <template #message="slotProps">
        <div class="w-full">
          <p v-html="slotProps.message.message"></p>
        </div>
        <div v-if="hasPassword">
          <FloatLabel style="margin-top: 1rem">
            <InputText id="password-input" v-model="password" />
            <label for="password-input">{{ $t('requiredPassword') }}</label>
          </FloatLabel>
        </div>
      </template>
    </ConfirmDialog>
    <DataView :value="list" :layout="layout" data-key="id" :paginator="false">
      <template #list="slotProps: { items: QuestMeta[] }">
        <div v-for="item in slotProps.items" :key="item.id">
          <Button @click="handleInterQuest(item)">{{ item.title }}</Button>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style>
.p-confirm-dialog .p-dialog-content {
  flex-wrap: wrap;
}
</style>
