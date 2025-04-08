<script setup lang="ts">
import router from '@/router';
import SectionThree from '@/components/SectionThree.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/store.ts'
const { sectionThreeMeta } = storeToRefs(useStore());
</script>

<template>
  <h1>Page Two</h1>
  <section>
    <h2>
      DOB Section
      <i
        v-if="sectionThreeMeta.valid"
        class="pi pi-check"
      />
    </h2>

    <SectionThree />
  </section>
  <Button
    severity="danger"
    label="Back"
    @click="router.back()"
  />
</template>
