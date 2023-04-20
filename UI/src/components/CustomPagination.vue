<template>
  <v-container>
    <v-row>
      <v-col>
        <v-pagination
          v-model="pageNumber"
          :length="length"
          @update:modelValue="(val) => handlePageNumber(val)"
        />
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="page.max"
          class="ma-2 pa-2"
          density="compact"
          label="顯示頁數"
          :items="['20', '50', '100', '200']"
          @update:modelValue="(val) => handleMax(val)"
        />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { PaginationType } from '@/types';
import { onUpdated, ref, reactive } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  pagination: {
    type: Object as PropType<PaginationType>,
    default: () => ({}),
  },
  onPageChanged: {
    type: Function,
    default: () => {},
  },
});

const page = reactive({
  first: 0,
  max: 20,
  total: 0,
});

const length = ref(1);
const pageNumber = ref(1);

function handleMax(value: number) {
  props.onPageChanged({
    first_result: 0,
    max_results: value,
  });
}

function handlePageNumber(value: number) {
  props.onPageChanged({
    first_result: page.max * (value - 1),
    max_results: page.max,
  });
}

onUpdated(() => {
  const { pagination } = props;
  let { first, max, total } = page;

  first = pagination.first_result || 0;
  max = pagination.max_results || 20;
  total = pagination.total || 0;

  length.value = Math.ceil(total / max);
  pageNumber.value = Math.floor(first / max) + 1;
});
</script>
