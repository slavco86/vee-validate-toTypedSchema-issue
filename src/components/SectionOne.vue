<script setup lang="ts">
import { useStore } from '@/stores/store.ts'
import { storeToRefs } from 'pinia'

const store = useStore()
const { sectionOneHandleSubmit, sectionOneValidateField, sectionOneSetTouched } = store
const {
  sectionOneErrors,
  firstName,
  firstNameProps,
  lastName,
  lastNameProps,
  zipCode,
  zipCodeProps,
} = storeToRefs(store)

const handleValidSubmit = sectionOneHandleSubmit((values) => {
  // this only runs when the entire form is valid. So, this is where we call the API
  // and handle API success or error, like navigating to next page after form was
  // successfully submitted to API
  alert(`Section one completed with ${JSON.stringify(values, 0, 2)}`)
})
const onSubmit = async () => {
  // This is how we can partially validate a form
  // We check individual field props for their state and value to decide whether we want
  // to validate only specific field(s) or the entire form

  // Here I am checking if zipCode field is not empty or even if it is empty
  // then if it is the first time we are running this validation against the zipCode field.
  // Also, if the 2 hidden fields have the flags set to true or not
  // I am doing because 2 hidden fields are only shown to the user when
  // zipCode field has been filled in and validated. Otherwise, we don't show
  // and hence we don't care about their state until then.
  if (
    (zipCode.value || !zipCodeProps.value.validated) &&
    !firstNameProps.value.touched &&
    !lastNameProps.value.touched
  ) {
    const { valid } = await sectionOneValidateField('zipCode')
    // Here, after I validate specific field and ensured that it is valid, I am setting touched flags
    // to make sure that the next time I submit a form - entire form will be validated and I see
    // errors on 2 conditional fields which should now be rendered.

    // !NB - need to use string dotted notation as otherwise setTouched() is not setting props correctly
    sectionOneSetTouched({ ['nested.firstName']: valid, ['nested.lastName']: valid })
  } else {
    await handleValidSubmit()
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form-field">
      <InputText v-model="zipCode" placeholder="Zip" :invalid="!!sectionOneErrors.zipCode" />
      <small v-if="!!sectionOneErrors.zipCode">{{ sectionOneErrors.zipCode }}</small>
    </div>
    <div v-if="zipCodeProps.valid" class="form-field">
      <InputText
        v-model="firstName"
        placeholder="First Name"
        :invalid="!!sectionOneErrors['nested.firstName']"
      />
      <!-- using string access here due to weird behaviour of setTouched(),
      otherwise normal notation is not supported by TS -->
      <small v-if="!!sectionOneErrors['nested.firstName']">
        {{ sectionOneErrors['nested.firstName'] }}
      </small>
    </div>
    <div v-if="zipCodeProps.valid" class="form-field">
      <InputText
        v-model="lastName"
        placeholder="Last Name"
        :invalid="!!sectionOneErrors['nested.lastName']"
      />
      <small v-if="!!sectionOneErrors['nested.lastName']">
        {{ sectionOneErrors['nested.lastName'] }}
      </small>
    </div>
    <Button label="Submit Section One" type="submit" />
  </form>
</template>
