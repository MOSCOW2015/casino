<script setup>
import { ref } from 'vue';
import usePlayer from '../composables/usePlayer';
import { useRouter } from 'vue-router';

const { handleLogin } = usePlayer()
const router = useRouter()
const loginInput = ref('')
const passwordInput = ref('')
const error = ref('')

function submit(){
    if(!loginInput.value || !passwordInput.value){
        error.value = 'Заполните все поля'
        return
    }
    const ok = handleLogin(loginInput.value, passwordInput.value)
    if (!ok) {
        error.value = 'Неверный логин или пароль'
        return
}
    router.push('/')
}
</script>

<template>
    <div class="page">
        <div class="card">
            <h1 class="title">ВХОД</h1>
            <form class="form" @submit.prevent="submit">
                <div class="field">
                    <input
                        class="input"
                        type="text"
                        v-model.trim="loginInput"
                        placeholder="Имя"
                        autocomplete="username"/>
                </div>
                <div class="field">
                    <input
                        class="input"
                        type="password"
                        v-model.trim="passwordInput"
                        placeholder="Пароль"
                        autocomplete="current-password"/>
                </div>
                <button class="btn-submit" type="submit">Войти</button>
                <p class="error" v-if="error">{{ error }}</p>
            </form>
            <p class="register-link">
                Нет аккаунта?
                <RouterLink to="/register">Регистрация</RouterLink>
            </p>
        </div>
    </div>
</template>

<style scoped>
.page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--casino-bg);
    padding: 1rem;
}

.card {
    width: 100%;
    max-width: 400px;
    background-color: var(--casino-bg-card);
    border: 1px solid var(--border-card);
    border-radius: var(--radius-md);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--gold);
    margin: 0;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
}

.input {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: var(--casino-bg);
    color: var(--casino-text-primary);
    border: 1px solid var(--border-card);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    outline: none;
    transition: border-color var(--t-fast);
    box-sizing: border-box;
}

.input::placeholder {
    color: var(--text-secondary);
}

.input:focus {
    border-color: var(--gold);
}

.btn-submit {
    margin-top: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: var(--gold);
    color: #000;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background-color var(--t-fast), opacity var(--t-fast);
}

.btn-submit:hover {
    background-color: var(--gold-hover);
}

.btn-submit:active {
    opacity: 0.85;
}

.register-link {
    text-align: center;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
}

.register-link a {
    color: var(--gold);
    text-decoration: none;
    transition: opacity var(--t-fast);
}

.register-link a:hover {
    opacity: 0.8;
}

.error {
    color: var(--red);
    font-size: 0.85rem;
    text-align: center;
    margin: 0;
}
</style>
