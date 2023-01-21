import emailValidation from '@/constants/EmailValidation'

export default {
    email: [
        {
            required: true,
            trigger: 'blur'
        },
        {
            validator: (_:unknown, value: string) => emailValidation.test(value),
            message: 'email is not valid',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            trigger: 'blur'
        }, {
            min: 8,
            message: 'Password should have at least 8 symbols',
            trigger: 'blur'
        }
    ],
    name: [
        {
            required: true,
            trigger: 'blur'
        }, {
            min: 5,
            message: 'Name should have at least 5 symbols',
            trigger: 'blur'
        }
    ]
}
