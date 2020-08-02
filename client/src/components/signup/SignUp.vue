<template>
    <v-form ref="registrationForm">
        <v-container>
            <v-row mt-5>
                <v-col class="text-center" pt-5 mt-2>
                    <logo></logo>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset="1"
                       cols="10"
                       class="text-center mb-0 pb-0">
                    <v-text-field
                            @keyup.enter="focusEmail"
                            validate-on-blur
                            label="Логин"
                            placeholder=" "
                            v-model="register.username"
                            :rules="loginRules">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset="1"
                       cols="10"
                       class="text-center mb-0 pb-0">
                    <v-text-field
                            @keyup.enter="focusPassword"
                            ref="signUpEmail"
                            validate-on-blur
                            label="E-mail"
                            placeholder=" "
                            v-model="register.email"
                            :rules="emailRules">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset="1"
                       cols="10"
                       class="text-center mb-0 pb-0">
                    <v-text-field
                            @keyup.enter="focusPasswordAgain"
                            ref="signUpPassword"
                            type="password"
                            validate-on-blur
                            label="Пароль"
                            placeholder=" "
                            v-model="register.password"
                            :rules="passwordRules">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset="1"
                       cols="10"
                       class="text-center mb-0 pb-0">
                    <v-text-field
                            @keyup.enter="blurAndDoRegistration"
                            ref="signUpPasswordAgain"
                            type="password"
                            validate-on-blur
                            label="Пароль еще раз"
                            placeholder=" "
                            v-model="passwordAgain"
                            :rules="passwordAgainRules">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col offset="1"
                       cols="10"
                       class="text-center mb-0 pb-0">
                    <v-col>
                        <btn @click="doRegistration">Зарегистрироваться</btn>
                    </v-col>
                </v-col>
            </v-row>
            <v-row>
                <v-col pt-0 mt-0 class="text-center">
                    <btn color="cancel" to="/">Назад</btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>

    import Logo from "../util/Logo";
    import SingUpService from "../../service/SingUpService"
    import Btn from "../util/Btn";

    export default {
        components: {Btn, Logo},
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
            focusEmail() {
                this.$refs.signUpEmail.focus();
            },

            focusPassword() {
                this.$refs.signUpPassword.focus();
            },

            focusPasswordAgain() {
                this.$refs.signUpPasswordAgain.focus();
            },

            blurAndDoRegistration() {
                this.blurPasswordAgain();
                this.doRegistration();
            },

            blurPasswordAgain() {
                this.$refs.signUpPasswordAgain.blur();
            },

            async doRegistration() {
                if (this.validate(this.register, this.passwordAgain)) {
                    try {
                        await SingUpService.registerUser(this.register);
                        await this.$router.push({path: 'signin'})
                    } catch (err) {
                        if (err.response.status === 400) {
                            this.$showSnackbar("error", err.response.data.message)
                        } else {
                            console.log(err)
                        }
                    }
                }
            },

            validate(register, passwordAgain) {
                let validations = [
                    this.validateUsername(register.username),
                    this.validateEmail(register.email),
                    this.validatePassword(register.password),
                    this.validatePasswordAgain(register.password, passwordAgain)
                ];
                for (let valid of validations) {
                    if (valid !== true) {
                        this.$refs.registrationForm.validate();
                        return false;
                    }
                }
                return true;
            },

            validateUsername(username) {
                if (!username) {
                    return 'Логин обязателен к заполению'
                } else if (username.length > 20) {
                    return 'Длина логина должна быть не более 20 символов'
                }
                return true;
            },

            validateEmail(email) {
                if (!email) {
                    return 'E-mail Обязателен к заполнению';
                } else if (!/.+@.+/.test(email)) {
                    return 'Некорректный формат E-mail';
                }
                return true;
            },

            validatePassword(password) {
                if (!password) {
                    return 'Пароль обязателен к заполнению';
                } else if (password.length < 6) {
                    return 'Длина пароля должна быть более 6 символов';
                } else if (password.length > 30) {
                    return 'Длина пароля должна быть менее 30 символов';
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
