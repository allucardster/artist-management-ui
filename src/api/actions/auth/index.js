export const loginAction = (username, password) => ({
    method: 'POST',
    endpoint: '/api/login_check',
    body: {
        username,
        password
    }
});