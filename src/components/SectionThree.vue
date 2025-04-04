<script setup>
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { sectionThreeHandleSubmit } = store;
const { dateOfBirth, sectionThreeErrors } = storeToRefs(store);

const onSubmit = sectionThreeHandleSubmit((values) => {
  console.log(values);
  alert(`Section three completed with ${JSON.stringify(values, 0, 2)}`);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form-field">
      <InputMask
        v-model="dateOfBirth"
        slot-char="mm/dd/yyyy"
        mask="99/99/9999"
        placeholder="Date of Brith"
        :invalid="!!sectionThreeErrors.dateOfBirth"
      />
      <small v-if="!!sectionThreeErrors.dateOfBirth">{{ sectionThreeErrors.dateOfBirth }}</small>
    </div>
    <Button
      label="Submit Section Three"
      type="submit"
    />
  </form>
</template>
