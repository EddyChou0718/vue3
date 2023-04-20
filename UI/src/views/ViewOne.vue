<template>
  <v-table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Locked</th>
        <th>Enable</th>
        <th>Operate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in dataTable.data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>
          <v-icon
            :color="item.locked ? 'red' : 'green'"
            :icon="item.locked ? 'mdi-lock' : 'mdi-lock-open'"
          />
        </td>
        <td>
          <v-icon
            :color="item.enable ? 'green' : 'red'"
            :icon="item.enable ? 'mdi-check' : 'mdi-cancel'"
          />
        </td>
        <td>
          <EditDialog :isNew="false" :entry="item" :getData="getData" />
          <DeleteDialog :entry="item" :getData="getData" />
        </td>
      </tr>
    </tbody>
  </v-table>
  <CustomPagination :pagination="dataTable.pagination" :onPageChanged="getData" />
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import type { DataType, PaginationType } from '@/types';
import request from '../utils/request';
import EditDialog from '../components/EditDialog.vue';
import DeleteDialog from '../components/DeleteDialog.vue';
import CustomPagination from '../components/CustomPagination.vue';

const dataTable = reactive({
  pagination: {} as PaginationType,
  data: [] as DataType[],
});

type GetDataPayload = {
  first_result?: number,
  max_results?: number,
};

async function getData(page: GetDataPayload | null = null) {
  const payload: GetDataPayload = {};

  if (page) {
    payload.first_result = page.first_result;
    payload.max_results = page.max_results;
  }

  const out = await request('GET', '/users', payload);

  if (out?.result === 'ok') {
    const { pagination, ret }: { pagination: PaginationType, ret: DataType[] } = out;

    dataTable.data = ret.map((i) => {
      const data = {
        id: i.id,
        username: i.username,
        locked: Boolean(i.locked),
        enable: Boolean(i.enable),
      };

      return data;
    });

    dataTable.pagination = pagination;
  }
}

onMounted(() => {
  getData();
});
</script>
