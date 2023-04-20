<template>
  <VDataTable :headers="dataTable.headers" :items="dataTable.data">
    <template v-slot:[`item.locked`]="{ item }">
      <v-icon
        :color="item.raw.locked ? 'red' : 'green'"
        :icon="item.raw.locked ? 'mdi-lock' : 'mdi-lock-open'"
      />
    </template>
    <template #[`item.enable`]="{ item }">
      <v-icon
        :color="item.raw.enable ? 'green' : 'red'"
        :icon="item.raw.enable ? 'mdi-check' : 'mdi-cancel'"
      />
    </template>
    <template #[`item.operate`]="{ item }">
      <EditDialog :entry="item.raw" :getData="getData" />
      <DeleteDialog :entry="item.raw" :getData="getData" />
    </template>
  </VDataTable>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import type { DataType, PaginationType, TableHeaderType } from '@/types';
import DeleteDialog from '../components/DeleteDialog.vue';
import EditDialog from '../components/EditDialog.vue';
import request from '../utils/request';

const dataTable = reactive<{
  headers: TableHeaderType[],
  pagination: PaginationType,
  data: DataType[]
}>({
  headers: [
    { title: 'ID', key: 'id', sortable: false },
    { title: 'Username', key: 'username', sortable: false },
    { title: 'Locked', key: 'locked', sortable: false },
    { title: 'Enable', key: 'enable', sortable: false },
    { title: 'Operate', key: 'operate', sortable: false },
  ],
  pagination: {},
  data: [
    {
      id: '',
      username: '',
      locked: 0,
      enable: 0,
    },
  ],
});

async function getData(page: PaginationType | null = null) {
  const payload: PaginationType = {};

  if (page) {
    payload.first_result = page.first_result;
    payload.max_results = page.max_results;
  }

  const out = await request('GET', '/users', payload);

  if (out?.result === 'ok') {
    const { pagination, ret }: { pagination: PaginationType, ret: DataType[] } = out;
    dataTable.data = ret;
    dataTable.pagination = pagination;
  }
}

onMounted(() => {
  getData();
});
</script>
