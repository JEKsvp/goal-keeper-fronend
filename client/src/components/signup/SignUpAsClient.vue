<template>
    <v-form ref="registrationAsClientForm">
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
    import Roles from "../../util/Roles";
    import Btn from "../util/Btn";
    import SignUpMixin from "./SignUpMixin";

    export default {
        name: "SignUpAsClient",
        components: {Btn},
        mixins: [SignUpMixin],
        data() {
            return {
                valid: false,
                register: {
                    username: '',
                    email: '',
                    password: '',
                    role: Roles.CLIENT
                },
                passwordAgain: ''
            }
        },

        methods: {
            validate(register, passwordAgain) {
                let validations = [
                    this.validateUsername(register.username),
                    this.validateEmail(register.email),
                    this.validatePassword(register.password),
                    this.validatePasswordAgain(register.password, passwordAgain)
                ];
                for (let valid of validations) {
                    if (valid !== true) {
                        this.$refs.registrationAsClientForm.validate();
                        return false;
                    }
                }
                return true;
            }
        }
    }
</script>

<style scoped>

</style>