<template>
    <v-form ref="registrationAsPsychotherapistForm">
        <v-row>
            <v-col offset="1"
                   cols="10"
                   class="text-center mb-0 pb-0">
                <v-text-field validate-on-blur
                              label="Имя"
                              placeholder=" "
                              v-model="register.firstName"
                              :rules="firstNameRules">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="1"
                   cols="10"
                   class="text-center mb-0 pb-0">
                <v-text-field validate-on-blur
                              label="Фамилия"
                              placeholder=" "
                              v-model="register.lastName"
                              :rules="lastNameRules">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="1"
                   cols="10"
                   class="text-center mb-0 pb-0">
                <v-text-field @keyup.enter="focusEmail"
                              validate-on-blur
                              label="Имя пользователя"
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
                <v-text-field @keyup.enter="focusPassword"
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
                <v-text-field @keyup.enter="focusPasswordAgain"
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
                <v-text-field @keyup.enter="blurAndDoRegistration"
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
                <v-textarea validate-on-blur
                            rows="2"
                            label="Обо мне"
                            placeholder=" "
                            v-model="register.aboutMe"
                >
                </v-textarea>
            </v-col>
        </v-row>
        <v-row>
            <v-col offset="1"
                   cols="10"
                   class="text-center mb-0 pb-0">
                <v-col>
                    <btn type="primary" @click="doRegistration">Зарегистрироваться</btn>
                </v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col pt-0 mt-0 class="text-center">
                <btn type="cancel" to="/">Назад</btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    import SignUpMixin from "./SignUpMixin";
    import Roles from "../../util/Roles";
    import Btn from "../util/Btn";

    export default {
        name: "SignUpAsPsychotherapist",
        components: {Btn},
        mixins: [SignUpMixin],
        data() {
            return {
                valid: false,
                register: {
                    username: '',
                    email: '',
                    password: '',
                    role: Roles.PSYCHOTHERAPIST,
                    firstName: '',
                    lastName: '',
                    aboutMe: ''
                },
                passwordAgain: '',

                firstNameRules: [
                    v => this.validateFirstName(v)
                ],
                lastNameRules: [
                    v => this.validateLastName(v)
                ]
            }
        },

        methods: {
            validate(register, passwordAgain) {
                let validations = [
                    this.validateUsername(register.username),
                    this.validateEmail(register.email),
                    this.validatePassword(register.password),
                    this.validatePasswordAgain(register.password, passwordAgain),
                    this.validateFirstName(register.firstName),
                    this.validateLastName(register.lastName)
                ];
                for (let valid of validations) {
                    if (valid !== true) {
                        this.$refs.registrationAsPsychotherapistForm.validate();
                        return false;
                    }
                }
                return true;
            },

            validateFirstName(firstName) {
                if (!firstName) {
                    return 'Имя обязательно к заполнению';
                } else if (firstName.length > 50) {
                    return 'Длина имени должна быть менее 50 символов';
                }
                return true;
            },

            validateLastName(lastName) {
                if (!lastName) {
                    return 'Фамилия обязательно к заполнению';
                } else if (lastName.length > 50) {
                    return 'Длина фамилии должна быть менее 50 символов';
                }
                return true;
            },
        }
    }
</script>

<style scoped>

</style>