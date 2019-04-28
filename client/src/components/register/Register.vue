<template>
    <v-form ref="registrationForm">
        <v-container fill-height>
            <v-layout align-center justify-center column mt-5>
                <logo></logo>
                <v-flex pt-5 mt-2>
                    <v-text-field
                            validate-on-blur
                            label="Username"
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
                            label="password"
                            v-model="register.password"
                            :rules="passwordRules">
                    </v-text-field>
                    <v-text-field
                            type="password"
                            validate-on-blur
                            label="password again"
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
                if (this.validate(this.register, this.passwordAgain)) {
                    try {
                        await RegistrationService.registerUser(this.register);
                        this.$router.push({path: 'login'})
                    } catch (err) {
                        if (err.response.status === 400) {
                            this.$showSnackbar("error", err.response.data.message)
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
                    return 'Username required'
                } else if (username.length > 20) {
                    return 'Username must be less than 20 characters'
                }
                return true;
            },

            validateEmail(email) {
                if (!email) {
                    return 'E-mail required';
                } else if (!/.+@.+/.test(email)) {
                    return 'Invalid E-mail format';
                }
                return true;
            },

            validatePassword(password) {
                if (!password) {
                    return 'Password required';
                } else if (password.length < 6) {
                    return 'Password must be more than 6 characters';
                } else if (password.length > 30) {
                    return 'Password must be less than 30 characters';
                }
                return true;
            },

            validatePasswordAgain(password, passwordAgain) {
                if (password !== passwordAgain) {
                    return 'Passwords do not match';
                }
                return true;
            }
        }
    }
</script>
