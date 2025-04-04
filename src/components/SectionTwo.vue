<script setup>
import { useStore } from '@/store.js';
import { storeToRefs } from 'pinia';

const store = useStore();

const { sectionTwoHandleSubmit } = store;

const { phoneNumber, sectionTwoErrors } = storeToRefs(store);

const onSubmitHandler = sectionTwoHandleSubmit((values) => {
  alert(`Section two completed with ${JSON.stringify(values, 0, 2)}`);
});
</script>

<template>
  <form @submit.prevent="onSubmitHandler">
    <div class="form-field">
      <InputText
        v-model.trim="phoneNumber"
        placeholder="Phone number"
        :invalid="!!sectionTwoErrors.phoneNumber"
      />
      <small v-if="!!sectionTwoErrors.phoneNumber">{{ sectionTwoErrors.phoneNumber }}</small>
    </div>
    <Button
      label="Submit Section One"
      type="submit"
    />
  </form>
</template>
