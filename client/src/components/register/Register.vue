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
                    <v-btn color="success" @on-click="doRegistration">Зарегистрироваться</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
    import Logo from "../Logo";

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
                    v => validateUsername(v)
                ],
                emailRules: [
                    v => validateEmail(v)
                ],
                passwordRules: [
                    v => validatePassword(v)
                ],
                passwordAgainRules: [
                    v => validatePasswordAgain(this.register.password, v)
                ]
            }
        },

        methods: {
            doRegistration() {
                try {
                    validate(this.register, this.passwordAgain)
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    function validate(register, passwordAgain) {
        let validations = [];
        validations.push(validateUsername(register.username));
        validations.push(validateEmail(register.email));
        validations.push(validatePassword(register.password));
        validations.push(validatePasswordAgain(register.password, passwordAgain));
        for (let valid in validations) {
            if(valid instanceof String){
                throw valid;
            }
        }
    }

    function validateUsername(username) {
        if (!username) {
            return 'Логин не может быть пустым'
        } else if (username.length > 10) {
            return 'Логин должен содержать не более 10 символов'
        }
        return true;
    }

    function validateEmail(email) {
        if (!email) {
            return 'E-mail не может быть пустым';
        } else if (!/.+@.+/.test(email)) {
            return 'Неправильный формат E-mail';
        }
        return true;
    }

    function validatePassword(password) {
        if (!password) {
            return 'Пароль не может быть пустым';
        } else if (password.length < 6) {
            return 'Пароль должен содержать не менее 6 символов';
        } else if (password.length > 30) {
            return 'Пароль должен содержать не более 30 символов';
        }
        return true;
    }

    function validatePasswordAgain(password, passwordAgain) {
        if(password !== passwordAgain){
            return 'Пароли не совпадают';
        }
        return true;
    }
</script>
