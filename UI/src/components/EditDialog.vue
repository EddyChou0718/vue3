<template>
  <v-btn
    class="ma-2"
    size="small"
    :icon="!isNew"
    :color="isNew ? 'green' : 'primary'"
    @click="toggleDialog(true)"
  >
    <template v-if="isNew"> Add </template>
    <v-icon :icon="isNew ? 'mdi-plus' : 'mdi-pencil'" />
  </v-btn>

  <v-dialog v-model="open" width="auto">
    <v-card>
      <v-card-title>{{ props.isNew ? 'New' : 'Edit' }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-text-field
          v-model="entry.username"
          :error="nameError"
          @update:modelValue="(val) => handleVerify(val)"
        />
        <v-switch color="primary" v-model="entry.locked" label="Locked" />
        <v-switch color="primary" v-model="entry.enable" label="Enable" />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" color="green" @click="submitEdit">Submit</v-btn>
        <v-btn variant="outlined" color="red" @click="toggleDialog(false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onUpdated, toRefs } from 'vue';
import request from '../utils/request';

const props = defineProps({
  entry: {
    type: Object,
    default: () => ({
      id: '',
      username: '',
      locked: false,
      enable: false,
    }),
  },
  getData: {
    type: Function,
    default: () => {},
  },
  isNew: {
    type: Boolean,
    default: false,
  },
});

const open = ref<boolean>(false);
const nameError = ref<boolean>(false);
const entry = reactive({
  id: '',
  username: '',
  locked: false,
  enable: false,
});

function handleVerify(val: string) {
  nameError.value = !!val;
}

function toggleDialog(val: boolean) {
  open.value = val;
}

async function submitEdit() {
  if (nameError.value) {
    return;
  }

  const payload = {
    username: entry.username,
    locked: entry.locked ? 1 : 0,
    enable: entry.enable ? 1 : 0,
  };

  const method = props.isNew ? 'POST' : 'PUT';
  const url = props.isNew ? '/user' : `/user/${entry.id}`;

  const out = await request(method, url, payload);

  if (out?.result === 'ok') {
    props.getData();
    toggleDialog(false);
  }
}

onUpdated(() => {
  const { entry: propsEntry } = toRefs(props);

  if (propsEntry.value) {
    const { id, username, locked, enable } = propsEntry.value;

    entry.id = id;
    entry.username = username;
    entry.locked = locked;
    entry.enable = enable;
  }
});
</script>
