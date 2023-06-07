export default {
    logIn: {
        editor: {
            email: 'autotest-editor@test.test',
            password: 'qwerqwer'
        },
        teacher: {
            email: 'autotest-teacher@test.test',
            password: 'qwerqwer'
        },
        student: {
            email: 'autotest-student@test.test',
            password: 'qwerqwer'
        }
    },
    create: {
        email: () => `test+${Date.now()}@test.test`,
        password: 'asdfasdf'
    }
}
