export default {
    data: () => ({
        email: "",
        password: "",
        confirmPassword: "",
    }),
    computed: {
        emailRules() {
            return [
                v => !!v || "Поле обязательно к заполнению",
                v => /.+@.+/.test(v) || "Ввведите корректный e-mail адрес"
            ]
        },
        passwordRules() {
            return [
                v => !!v || "Поле обязательно к заполнению",
                v => (v && v.length >= 6) || "Пароль должен быть не менее 6 символов"
            ]
        },
        confirmPasswordRules() {
            return [
                v => !!v || "Поле обязательно к заполнению",
                v => v === this.password || "Пароли не совпадают"
            ]
        }
    }
}