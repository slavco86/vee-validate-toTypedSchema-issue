import { defineStore } from 'pinia';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { isAfter, isPast, subYears } from 'date-fns';

const phoneUtil = PhoneNumberUtil.getInstance();

// We should keep each field schema separate because this allows us
// to refer to this schema in conditional rules and re-use same
// rules between multiple forms.
// We compose form schemas from individual field schemas
const zipCode = yup.number().required().min(2).label('Zip code');

// Custom validations - we use test() method
const phoneNumber = yup
  .string()
  .test({
    name: 'is US phone number',
    message: ({ value }) => `${value} is not a valid US phone number`,
    test: (value) => {
      // we need this try/catch because of how isValidNumberForRegion method treats non-numeric strings to ensure a
      // boolean is returned to yup
      try {
        return phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, 'US'), 'US');
      } catch {
        return false;
      }
    }
  })
  .required()
  .label('Phone number');

const dateOfBirth = yup
  .date()
  // custom message in case the user input doesn't yield a valid date object
  .typeError('Date of Birth must be a valid date')
  .test({
    name: 'is in the past',
    message: 'Date of Birth cannot be in the future',
    test: (value) => isPast(value)
  })
  .test({
    name: 'is less than 125 years ago',
    message: 'Date of Birth cannot be more than 125 years ago',
    test: (value) => isAfter(value, subYears(new Date(), 125))
  })
  .required()
  .label('Date of Birth');

const sectionOneSchema = yup.object({
  firstName: yup
    .string()
    .when('zipCode', {
      // This is how we can achieve conditional rules in yup
      // We refer to another field schema and use isValidSync,
      // which return boolean. When true - then callback result
      // will be added to this field's schema. In other word, we
      // add required() and min() rules only when zipCode is valid
      // Otherwise, firstName is not required
      is: (val) => zipCode.isValidSync(val),
      then: (schema) => schema.required().min(2),
      otherwise: (schema) => schema.optional()
    })
    .label('First name'),
  lastName: yup
    .string()
    .when('zipCode', {
      is: (val) => zipCode.isValidSync(val),
      then: (schema) => schema.required().min(2),
      otherwise: (schema) => schema.optional()
    })
    .label('Last name'),
  zipCode
});

const sectionTwoSchema = yup.object({
  phoneNumber
});

const sectionThreeSchema = yup.object({
  dateOfBirth
});

export const useStore = defineStore('store', () => {
  const {
    errors: sectionOneErrors,
    defineField: sectionOneDefineField,
    validate: sectionOneValidate,
    handleSubmit: sectionOneHandleSubmit,
    values: sectionOneValues,
    validateField: sectionOneValidateField,
    setErrors: sectionOneSetErrors,
    setTouched: sectionOneSetTouched,
    meta: sectionOneMeta
  } = useForm({
    validationSchema: sectionOneSchema,
    keepValuesOnUnmount: true
  });

  const {
    errors: sectionTwoErrors,
    defineField: sectionTwoDefineField,
    validate: sectionTwoValidate,
    handleSubmit: sectionTwoHandleSubmit,
    values: sectionTwoValues,
    validateField: sectionTwoValidateField,
    setErrors: sectionTwoSetErrors,
    setTouched: sectionTwoSetTouched,
    meta: sectionTwoMeta
  } = useForm({
    validationSchema: sectionTwoSchema,
    keepValuesOnUnmount: true
  });
  const {
    errors: sectionThreeErrors,
    defineField: sectionThreeDefineField,
    validate: sectionThreeValidate,
    handleSubmit: sectionThreeHandleSubmit,
    values: sectionThreeValues,
    validateField: sectionThreeValidateField,
    setErrors: sectionThreeSetErrors,
    setTouched: sectionThreeSetTouched,
    meta: sectionThreeMeta
  } = useForm({
    validationSchema: sectionThreeSchema,
    keepValuesOnUnmount: true
  });

  // We need to pass config object to each invocation of setField
  // because we want lazy validation, and we need to pass through
  // all the state, so we can interrogate thing like validated
  // status for each field
  const [firstName, firstNameProps] = sectionOneDefineField('firstName', {
    validateOnModelUpdate: false,
    props: (state) => state
  });
  const [lastName, lastNameProps] = sectionOneDefineField('lastName', {
    validateOnModelUpdate: false,
    props: (state) => state
  });
  const [zipCode, zipCodeProps] = sectionOneDefineField('zipCode', {
    validateOnModelUpdate: false,
    props: (state) => state
  });

  const [phoneNumber, phoneNumberProps] = sectionTwoDefineField('phoneNumber', {
    validateOnModelUpdate: false,
    props: (state) => state
  });

  const [dateOfBirth, dateOfBirthProps] = sectionThreeDefineField('dateOfBirth', {
    validateOnModelUpdate: false,
    props: (state) => state
  });

  return {
    // we need to expose these methods in order to control and
    // interrogate specific form, because we have multiple forms in our store
    sectionOneMeta,
    sectionOneErrors,
    sectionOneDefineField,
    sectionOneValidate,
    sectionOneValidateField,
    sectionOneHandleSubmit,
    sectionOneSetErrors,
    sectionOneSetTouched,
    sectionOneValues,
    firstName,
    firstNameProps,
    lastName,
    lastNameProps,
    zipCode,
    zipCodeProps,
    sectionTwoErrors,
    sectionTwoDefineField,
    sectionTwoValidate,
    sectionTwoHandleSubmit,
    sectionTwoValues,
    sectionTwoValidateField,
    sectionTwoSetErrors,
    sectionTwoSetTouched,
    sectionTwoMeta,
    phoneNumber,
    phoneNumberProps,
    sectionThreeErrors,
    sectionThreeDefineField,
    sectionThreeValidate,
    sectionThreeHandleSubmit,
    sectionThreeValues,
    sectionThreeValidateField,
    sectionThreeSetErrors,
    sectionThreeSetTouched,
    sectionThreeMeta,
    dateOfBirth,
    dateOfBirthProps
  };
});
