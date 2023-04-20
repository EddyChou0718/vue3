<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item>
          <RouterLink to="/">View1</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/view2">View2</RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleNav" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer />
      <EditDialog :isNew="true" :getData="getData" />
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { DataType, PaginationType } from '@/types';
import { RouterView } from 'vue-router';
import request from './utils/request';
import EditDialog from './components/EditDialog.vue';

const drawer = ref(true);
const dataTable = reactive({
  pagination: {} as PaginationType,
  data: [] as DataType[],
});

function toggleNav() {
  drawer.value = !drawer.value;
}

async function getData(page: PaginationType | null = null): Promise<void> {
  const payload: PaginationType = {};

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
