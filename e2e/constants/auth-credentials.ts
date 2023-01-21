export default {
    logIn: {
        email: 'test@test.test',
        password: 'qwerqwer'
    },
    create: {
        email: () => `test+${Date.now()}@test.test`,
        password: 'asdfasdf'
    }
}
