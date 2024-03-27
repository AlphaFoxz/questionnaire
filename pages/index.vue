<script setup lang="ts">
import DataView from 'primevue/dataview'
import type { QuestMeta } from '~/define'

const list = ref<QuestMeta[]>([])
const layout = ref<'list' | 'grid' | undefined>('list')
const api = useApi()
api.biz.getHomeList((data: QuestMeta[]) => {
  list.value = data
})
</script>

<template>
  <DataView :value="list" :layout="layout" data-key="id">
    <template #list="slotProps: {items: QuestMeta[]}">
      <div v-for="item in slotProps.items" :key="item.id">
        <RouterLink :to="`/quest/${item.id}`">{{ item.title }}</RouterLink>
      </div>
    </template>
  </DataView>
</template>
