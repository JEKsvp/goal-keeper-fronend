<template>
    <v-form>
        <v-container fill-height>
            <v-row>
                <logo></logo>
            </v-row>
            <v-row>
                <v-col pt-5 mt-2 offset="1" cols="10">
                    <v-form ref="loginForm"
                            v-model="valid"
                            lazy-validation>
                        <v-text-field
                                v-model="loginForm.username"
                                label="Логин"
                                placeholder="Введите логин">
                        </v-text-field>
                        <v-text-field
                                v-model="loginForm.password"
                                label="Пароль"
                                type="password"
                                placeholder="Введите пароль">
                        </v-text-field>
                    </v-form>
                </v-col>
            </v-row>
            <v-row>
                <v-col pb-0 mb-0 class="text-center">
                    <v-btn color="success" @click="doLogin">Войти</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col pt-0 mt-0 class="text-center">
                    <v-btn color="info" to="/">Назад</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>

    import Logo from '../util/Logo';
    import LoginService from '../../service/LoginService';

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
                        this.$session.set('token', data.accessToken);
                        this.$router.push('/main')
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
            }
        }
    };
</script>

