<script setup lang="ts">
import SectionOne from '@/components/SectionOne.vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/store.ts';
import SectionTwo from '@/components/SectionTwo.vue';
import router from '@/router';

const store = useStore();
const { sectionOneValidate, sectionTwoValidate } = store;
const { sectionOneMeta, sectionTwoMeta, phoneNumber, firstName, lastName, zipCode } =
  storeToRefs(store);

const submitAll = async () => {
  await Promise.all([sectionOneValidate(), sectionTwoValidate()]);
  if (sectionTwoMeta.value.valid && sectionOneMeta.value.valid) {
    await router.push('/two');
  }
};
const fetchData = () => {
  phoneNumber.value = null;
  firstName.value = 'Test';
  lastName.value = 'Testington';
  zipCode.value = 1234;
};
</script>

<template>
  <section>
    <h1>
      Section One
      <i
        v-if="sectionOneMeta.valid"
        class="pi pi-check"
      />
    </h1>
    <SectionOne />
  </section>
  <section>
    <h2>
      Section Two
      <i
        v-if="sectionTwoMeta.valid"
        class="pi pi-check"
      />
    </h2>
    <SectionTwo />
  </section>
  <section>
    <Button
      outlined
      label="Submit All"
      @click="submitAll"
    />
  </section>
  <section>
    <Button
      severity="danger"
      label="Fetch Data"
      @click="fetchData"
    />
  </section>
</template>
