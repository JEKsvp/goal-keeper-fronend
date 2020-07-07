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
    import SignInService from '../../service/SignInService';

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
                try {
                    await SignInService.login(this.loginForm);
                    await this.$router.push('/home')
                } catch (e) {
                    if (e.response.status === 400) {
                        this.$showSnackbar('error', 'Неправильный логин или пароль');
                    }
                }
            },
        }
    };
</script>

