<template>
  <v-table>
    <thead>
      <tr>
        <th>
          ID
        </th>
        <th>
          Username
        </th>
        <th>
          Locked
        </th>
        <th>
          Enable
        </th>
        <th>
          Operate
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in dataTable.data"
        :key="item.id"
      >
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>
          <v-icon
            :color="item.locked ? 'red' : 'green'"
            :icon="item.locked ? 'mdi-lock' : 'mdi-lock-open'" />
        </td>
        <td>
          <v-icon
            :color="item.enable ? 'green' : 'red'"
            :icon="item.enable ? 'mdi-check' : 'mdi-cancel'" />
        </td>
        <td>
          <EditDialog :isNew="false" :entry="item" :getData="getData" />
          <DeleteDialog :entry="item" :getData="getData" />
        </td>
      </tr>
    </tbody>
  </v-table>
  <CustomPagination
    :pagination="dataTable.pagination"
    :onPageChanged="getData"
  />
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import request from '../utils/request';
import EditDialog from '../components/EditDialog.vue';
import DeleteDialog from '../components/DeleteDialog.vue';
import CustomPagination from '../components/CustomPagination.vue';

const dataTable = reactive({
  pagination: {},
  data: []
});

async function getData({ page = null } = {}) {
  const payload = {};

  if (page) {
    payload.first_result = page.first_result
    payload.max_results = page.max_results
  }

  const out = await request('GET', '/users', payload);

  if (out?.result === 'ok') {
    const { pagination, ret } = out;
    dataTable.data = ret.map((i) => {
      i.locked = Boolean(i.locked)
      i.enable = Boolean(i.enable)

      return i
    });

    dataTable.pagination = pagination
  }
}

onMounted(() => {
  getData()
})
</script>
