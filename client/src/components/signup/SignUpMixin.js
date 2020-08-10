import SingUpService from "../../service/SingUpService";

export default {
    data() {
        return {
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

        validateUsername(username) {
            if (!username) {
                return 'Имя пользователя обязательно к заполению'
            } else if (username.length > 30) {
                return 'Длина имени пользователя должна быть не более 30 символов'
            } else if (username.match(/^[^\w]*$/)) {
                return 'Имя пользователя может содержать только символы латинского алфавита, цифры и символы подчеркивания.'
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
            } else if (password.length > 50) {
                return 'Длина пароля должна быть менее 50 символов';
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