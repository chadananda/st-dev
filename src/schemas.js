import * as yup from 'yup'

export const personSchema = yup.object().shape({
  FirstName: yup.string().default('').label('First Name').required().max(255),
  LastName: yup.string().default('').label('Last Name').max(255),
  Email: yup.string().default('').label('Email').email(),
  Phone: yup.string().default('').label('Phone number').matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, { excludeEmptyString: true, message: 'This is not a valid phone number.'}),
  Housing: yup.string().default('dorm').label('Housing').oneOf(['dorm','RV','day']),
  Sex: yup.mixed().default(undefined).label('Dorm gender').when('Housing', {
    is: 'dorm',
    then: yup.string().required().oneOf(['M', 'F']),
    otherwise: yup.string().oneOf(['M','F'])
  }),
  Sleep: yup.string().default(3).label('Slumber depth').when('Housing', {
    is: 'dorm',
    then: yup.string().required().oneOf(['1','2','3','4','5']),
    otherwise: yup.string().oneOf(['','1','2','3','4','5'])
  }),
  Snore: yup.mixed().default(3).label('Snore probability').when('Housing', {
    is: 'dorm',
    then: yup.string().required().oneOf(['1','2','3','4','5']),
    otherwise: yup.string().oneOf(['','1','2','3','4','5'])
  }),
  Diet: yup.array().default([]).label('Diet'),
  Allergies: yup.array().default([]).label('Allergies'),
  Transport: yup.string().default('').label('Transport').oneOf(['', 'flight', 'bus', 'train']),
  Arrival: yup.string().default('').label('Arrival').max(255),
  Departure: yup.string().default('').label('Departure').max(255),
  remember: yup.mixed().default(true).oneOf([true,false]),
  opts: yup.object().shape({
    allergies: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        title: yup.string().required()
      })
    ).default(() => [
      { id: "nuts", title: "nuts" },
      { id: "dairy", title: "dairy" },
      { id: "soy", title: "soy" },
    ])
  })
})

export const cartItemSchema = personSchema.shape({
  session: yup.object({
    CourseID: yup.string().default('').required().max(50),
    Title: yup.string().default(''),
    StartDate: yup.string().default('').required().matches(/^\d{4}-\d{2}-\d{2}/),
    StartDateDisplay: yup.string().default(''),
    EndDateDisplay: yup.string().default(''),
  })
})

export const signupFormSchema = yup.object().shape({
  StartDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, {message: 'Please choose a valid start date'}),
  people: yup.array().min(1).of(personSchema.shape({
    idx: yup.number().default(0),
    Email: yup.string().default('').label('Email').when('idx', {
      is: 0,
      then: yup.string().required().email(),
      otherwise: yup.string().email()
    }),
    Phone: yup.string().default('').label('Phone number').when('idx', {
      is: 0,
      then: yup.string().matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, {message: 'A valid phone number is required'}),
      otherwise: yup.string().matches(/(^\+[-\d\. ]+$|^\(?\d{3}[-\.\) ]*\d{3}[-\. ]*\d{4}$)/, { excludeEmptyString: true, message: 'This is not a valid phone number.'}),
    }),
  })),
})

