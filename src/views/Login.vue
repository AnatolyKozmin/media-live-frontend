<template>
    <div class="login">
        <h1 class="login__title">MEDIA LIVE !</h1>
        <form class="login__form" @submit.prevent="handleLogin">
            <div class="login__field">
                <label class="login__label" for="firstName">Имя</label>
                <input 
                    class="login__input"
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    required
                /> 
            </div>
            <div class="login__field">
                <label class="login__label" for="lastName">Фамилия</label>
                <input 
                    class="login__input"
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    required
                /> 
            </div>
            <button class="login_btn" type="submit">Войти</button>
            <p class="login__error" v-if="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import login from '../api';

export default {
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
            },
            error: '',
        };
    },
    mounted() {
        const webApp = window.Telegram.webApp;
        webApp.MainButton.setText('Войти').onClick(this.handleLogin);
        webApp.MainButton.show();
    },
    beforeUnmount() {
        window.Telegram.webApp.MainButton.hide();
    },
    methods: {
        async handleLogin() {
            try {
                const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
                if (!telegramUser?.id) {
                    this.error = 'Telegram ID не найден, попробуйте позднее';
                    return;
                }
                const { role } = await login(this.form);
                this.$router.push(role === 'admin' ? '/admin' : '/');
                
            } catch (error) {
                this.error = error.response?.data?.error || 'Ошибка регестрации, попробуйте позднее';
            }
        },
    },
};

</script>

<style lang="scss" scoped>
$spacing: 16px;
$radius: 4px;
$color-border: #ccc;
$color-primary: #007bff;
$color-primary-hover: #0056b3;

@mixin button {
    padding: 16px;
    background-color: $color-primary;
    color: white;
    border: none;
    border-redius: $radius;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: $color-primary-hover;
    }
}

.login {
    max-width: 100vw;
    padding: spacing;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    box-sizing: border-box;


    &__title {
        font-size: 1.5rem;
        margin-bottom: $spacing;
        color: #333;

    }

    &__form {
        width: 100%;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        gap: $spacing;
    }

    &__field {
        display: flex;
        flex-direction: column;
    }

    &__label {
        font-size: 0.9rem;
        margin-bottom: 4px;
        color: #555;
    }

    &__input {
        padding: 8px;
        border: 1px solid $color-border;
        border-radius: $radius;
        font-size: 1rem;
        transition: border-color 0.2s;

        &:focus {
            border-color: $color-primary;
            outline: none;
        }
    }

    &__btn {
        @include button;
        width: 100%;
    }

    &__error {
        color: red;
        font-size: 0.9rem;
        margin-top: 8px;
        text-align: center;
    }
}
</style>