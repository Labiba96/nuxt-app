<template>
  <div>
    <div v-if="loading" class="text-gray-600 mb-2">Loading users...</div>

    <DxDataGrid
      v-else
      :data-source="users"
      :show-borders="true"
      key-expr="id"
    >
      <DxColumn data-field="name" caption="Name" />
      <DxColumn data-field="email" caption="Email" />
      <DxColumn data-field="age" caption="Age" />
    </DxDataGrid>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid'

const userStore = useUserStore()
const { fetchUsers } = userStore

onMounted(() => {
  fetchUsers()
})

const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
</script>
