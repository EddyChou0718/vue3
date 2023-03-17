<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleNav"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer />
      <EditDialog :isNew="true" :getData="getData" />
    </v-app-bar>

    <v-main>
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
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import request from './utils/request';
import EditDialog from './components/EditDialog.vue';
import DeleteDialog from './components/DeleteDialog.vue';
import CustomPagination from './components/CustomPagination.vue';

const drawer = ref(true);
const dataTable = reactive({
  pagination: {},
  data: []
});


function toggleNav() {
  drawer.value = !drawer.value;
}

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
