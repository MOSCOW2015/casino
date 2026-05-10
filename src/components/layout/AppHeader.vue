<script setup>
import { useRouter } from 'vue-router';
import usePlayer from '../../composables/usePlayer';

const { logOut } = usePlayer()
const router = useRouter()

function loginExit(){
  logOut()
  router.push('/')
}

defineProps({
    isLoggedIn: Boolean,
    username: String,
    balance: Number,
})
</script>

<template>
    <header>
        <RouterLink to="/" class="logo">ROYALE</RouterLink>

        <nav>
            <ul>
                <li><RouterLink to="/slots">Слоты</RouterLink></li>
                <li><RouterLink to="/blackjack">Блэкджек</RouterLink></li>
                <li><RouterLink to="/poker">Покер</RouterLink></li>
                <li><RouterLink to="/roulette">Рулетка</RouterLink></li>
            </ul>
        </nav>

        <div class="auth" v-if="!isLoggedIn">
            <RouterLink to="/login" class="btn-enter">Войти</RouterLink>
            <RouterLink to="/register" class="btn-reg">Регистрация</RouterLink>
        </div>
        <div class="user-info" v-else>
            <span class="user-balance">{{ balance }} ₽</span>
            <span class="user-name">{{ username }}</span>
            <button @click="loginExit">Выйти</button>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: var(--casino-bg-surface);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 64px;
    box-shadow: 0 1px 0 rgba(255,255,255,0.06);
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    color: var(--gold);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 4px;
    text-decoration: none;
}

nav ul {
    display: flex;
    gap: 32px;
    list-style: none;
    margin: 0;
    padding: 0;
}

nav a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 1px;
    transition: color var(--t-fast);
}

nav a:hover,
nav a.router-link-active {
    color: var(--casino-text-primary);
}

.auth {
    display: flex;
    gap: 12px;
    align-items: center;
}

.btn-enter {
    color: var(--casino-text-primary);
    text-decoration: none;
    font-size: 14px;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(255,255,255,0.15);
    transition: border-color var(--t-fast);
}

.btn-enter:hover {
    border-color: var(--gold);
    color: var(--gold);
}

.btn-reg {
    background: var(--gold);
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    padding: 8px 20px;
    border-radius: var(--radius-sm);
    transition: background var(--t-fast);
}

.btn-reg:hover {
    background: var(--gold-hover);
}

.user-info {
    display: flex;
    align-items: center;
    gap: 16px;
}

.user-balance {
    color: var(--gold);
    font-weight: 700;
    font-size: 15px;
}

.user-name {
    color: var(--casino-text-primary);
    font-size: 14px;
}
</style>
