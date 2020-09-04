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
                                @keyup.enter="focusPassword"
                                v-model="loginForm.username"
                                label="Имя пользователя или email"
                                placeholder="Введите Имя пользователя">
                        </v-text-field>
                        <v-text-field
                                ref="loginFormPassword"
                                @keyup.enter="doLogin"
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
                    <btn @click="doLogin" dark type="primary">Войти</btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col pt-0 mt-0 class="text-center">
                    <btn type="cancel" to="/">Назад</btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>

    import Logo from '../util/Logo';
    import SignInService from '../../service/SignInService';
    import Btn from "../util/Btn";

    export default {
        components: {Btn, Logo},
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
            focusPassword() {
                this.$refs.loginFormPassword.focus()
            },

            async doLogin() {
                try {
                    await SignInService.login(this.loginForm);
                    await this.$router.push('/home')
                } catch (e) {
                    if (e.response.status === 400) {
                        this.$showSnackbar('error', 'Неправильное имя пользователя или пароль');
                    }
                }
            },
        }
    };
</script>

