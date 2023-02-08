export default {
    logIn: {
        email: 'autotest@test.test',
        password: 'qwerqwer'
    },
    create: {
        email: () => `test+${Date.now()}@test.test`,
        password: 'asdfasdf'
    }
}
