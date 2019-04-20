<template>
    <v-form>
        <v-container fill-height>
            <v-layout align-center justify-center column mt-5>
                <logo></logo>
                <v-flex pt-5 mt-2>
                    <v-text-field
                            validate-on-blur
                            label="Логин"
                            v-model="register.username"
                            :rules="loginRules">
                    </v-text-field>
                    <v-text-field
                            validate-on-blur
                            label="E-mail"
                            v-model="register.email"
                            :rules="emailRules">
                    </v-text-field>
                    <v-text-field
                            type="password"
                            validate-on-blur
                            label="Пароль"
                            v-model="register.password"
                            :rules="passwordRules">
                    </v-text-field>
                    <v-text-field
                            type="password"
                            validate-on-blur
                            label="Пароль повторно"
                            v-model="passwordAgain"
                            :rules="passwordAgainRules">
                    </v-text-field>
                </v-flex>
                <v-flex>
                    <v-btn color="success" @click="doRegistration">Зарегистрироваться</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>

    import Logo from "../Logo";
    import RegistrationService from "../../service/RegistrationService"

    export default {
        components: {Logo},
        data() {
            return {
                valid: false,
                register: {
                    username: '',
                    email: '',
                    password: ''
                },
                passwordAgain: '',
                loginRules: [
                    v => this.validateUsername(v)
                ],
                emailRules: [
                    v => this.validateEmail(v)
                ],
                passwordRules: [
                    v => this.validatePassword(v)
                ],
                passwordAgainRules: [
                    v => this.validatePasswordAgain(this.register.password, v)
                ]
            }
        },

        methods: {
            async doRegistration() {
                try {
                    this.validate(this.register, this.passwordAgain);
                    await RegistrationService.registerUser(this.register);
                    this.$router.push({path: 'login'})
                } catch (err) {
                    console.log(err)
                }
            },

            validate(register, passwordAgain) {
                let validations = [
                    this.validateUsername(register.username),
                    this.validateEmail(register.email),
                    this.validatePassword(register.password),
                    this.validatePasswordAgain(register.password, passwordAgain)
                ];
                for (let valid in validations) {
                    if (valid instanceof String) {
                        throw valid;
                    }
                }
            },

            validateUsername(username) {
                if (!username) {
                    return 'Логин не может быть пустым'
                } else if (username.length > 20) {
                    return 'Логин должен содержать не более 20 символов'
                }
                return true;
            },

            validateEmail(email) {
                if (!email) {
                    return 'E-mail не может быть пустым';
                } else if (!/.+@.+/.test(email)) {
                    return 'Неправильный формат E-mail';
                }
                return true;
            },

            validatePassword(password) {
                if (!password) {
                    return 'Пароль не может быть пустым';
                } else if (password.length < 6) {
                    return 'Пароль должен содержать не менее 6 символов';
                } else if (password.length > 30) {
                    return 'Пароль должен содержать не более 30 символов';
                }
                return true;
            },

            validatePasswordAgain(password, passwordAgain) {
                if (password !== passwordAgain) {
                    return 'Пароли не совпадают';
                }
                return true;
            }
        }
    }
</script>
