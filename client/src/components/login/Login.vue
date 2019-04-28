<template>
    <v-form>
        <v-container fill-height>
            <v-layout align-center justify-center column mt-5>
                <logo></logo>
                <v-flex pt-5 mt-2>
                    <v-form ref="loginForm"
                            v-model="valid"
                            lazy-validation>
                        <v-text-field
                                v-model="loginForm.username"
                                label="Username">
                        </v-text-field>
                        <v-text-field
                                v-model="loginForm.password"
                                label="Password"
                                type="password">
                        </v-text-field>
                    </v-form>
                </v-flex>
                <v-flex pb-0 mb-0>
                    <v-btn color="success" @click="doLogin">Войти</v-btn>
                </v-flex>
                <v-flex pt-0 mt-0>
                    <v-btn color="info" to="/">Назад</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>

    import Logo from '../Logo';
    import LoginService from '../../service/LoginService';
    import UserService from '../../service/UserService'

    export default {
        components: {Logo},
        name: 'login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                valid: true,
                invalidAuth: false
            }
        },
        methods: {
            async doLogin() {
                let data = await this.sendLoginForm();
                if (data) {
                    try {
                        this.loadUserContext(data.accessToken);
                        this.$router.push({name: 'user', params: {username: this.loginForm.username}})
                    } catch (e) {
                        console.log(e)
                    }
                }
            },

            async sendLoginForm() {
                try {
                    return await LoginService.login(this.loginForm);
                } catch (err) {
                    if (err.response.status === 400) {
                        this.$showSnackbar('error', 'Invalid username or password');
                    }
                }
            },

            async loadUserContext(accessToken) {
                this.$session.set('token', accessToken);
                let username = this.loginForm.username;
                let user = await UserService.getUser(username);
                this.$store.commit('login', user);
            },
        }
    };
</script>

