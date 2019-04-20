<template>
    <v-form>
        <v-container fill-height>
            <v-layout align-center justify-center column mt-5>
                <logo></logo>
                <v-flex pt-5 mt-2>
                    <v-text-field
                            v-model="loginForm.username"
                            label="Логин">
                    </v-text-field>
                    <v-text-field
                            v-model="loginForm.password"
                            label="Пароль"
                            type="password">
                    </v-text-field>
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

    export default {
        components: {Logo},
        name: 'login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            async doLogin() {
                try {
                    this.validate(this.loginForm);
                    let data = await LoginService.login(this.loginForm);
                    console.log(data);
                } catch (e) {
                    console.log(e)
                }
            },
            validate(loginForm) {
                if (!loginForm.username) {
                    throw "Логин не может быть пустым";
                }
                if (!loginForm.password) {
                    throw "Пароль не может быть пустым";
                }
            }
        }
    };
</script>

