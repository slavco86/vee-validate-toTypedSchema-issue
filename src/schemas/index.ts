import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { isAfter, isPast, subYears } from 'date-fns'

const dateOfBirth = yup
  .date()
  // custom message in case the user input doesn't yield a valid date object
  .typeError('Date of Birth must be a valid date')
  .required()
  .test({
    name: 'is in the past',
    message: 'Date of Birth cannot be in the future',
    test: (value) => isPast(value),
  })
  .test({
    name: 'is less than 125 years ago',
    message: 'Date of Birth cannot be more than 125 years ago',
    test: (value) => isAfter(value, subYears(new Date(), 125)),
  })
  .label('Date of Birth')

export const sectionThreeSchema = toTypedSchema(
  yup.object({
    dateOfBirth,
  }),
)
