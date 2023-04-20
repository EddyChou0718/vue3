<template>
  <v-btn
    class="ma-2"
    color="red"
    icon="mdi-delete"
    size="small"
    @click="toggleDialog(true)"
  />

  <v-dialog v-model="open" width="auto">
    <v-card>
      <v-card-title>Delete</v-card-title>
      <v-divider />
      <v-card-text>Delete {{ props.entry.username }}?</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" color="red" @click="submitDelete">OK</v-btn>
        <v-btn variant="outlined" color="gray" @click="toggleDialog(false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import request from '../utils/request';

const props = defineProps({
  entry: {
    type: Object,
    default: () => ({}),
  },
  getData: {
    type: Function,
    default: () => {},
  },
});

const open = ref<boolean>(false);

function toggleDialog(val: boolean) {
  open.value = val;
}

async function submitDelete() {
  const out = await request('DELETE', `/user/${props.entry.id}`);

  if (out?.result === 'ok') {
    props.getData();
    toggleDialog(false);
  }
}
</script>
