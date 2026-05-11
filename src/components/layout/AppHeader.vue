<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import usePlayer from '../../composables/usePlayer';

const { logOut } = usePlayer()
const router = useRouter()
const menuOpen = ref(false)

function loginExit(){
  logOut()
  menuOpen.value = false
  router.push('/')
}

function closeMenu() {
  menuOpen.value = false
}

defineProps({
    isLoggedIn: Boolean,
    username: String,
    balance: Number,
})
</script>

<template>
    <header>
        <RouterLink to="/" class="logo" @click="closeMenu">ROYALE</RouterLink>

        <nav :class="{ 'nav-open': menuOpen }">
            <ul>
                <li><RouterLink to="/slots" @click="closeMenu">Слоты</RouterLink></li>
                <li><RouterLink to="/blackjack" @click="closeMenu">Блэкджек</RouterLink></li>
                <li><RouterLink to="/crash" @click="closeMenu">Краш</RouterLink></li>
                <li><RouterLink to="/roulette" @click="closeMenu">Рулетка</RouterLink></li>
            </ul>
            <div class="nav-auth-mobile" v-if="!isLoggedIn">
                <RouterLink to="/login" class="btn-enter" @click="closeMenu">Войти</RouterLink>
                <RouterLink to="/register" class="btn-reg" @click="closeMenu">Регистрация</RouterLink>
            </div>
            <div class="nav-auth-mobile user-info" v-else>
                <span class="user-balance">{{ balance }} ₽</span>
                <RouterLink to="/profile" class="user-name" @click="closeMenu">{{ username }}</RouterLink>
                <button class="btn-logout" @click="loginExit">Выйти</button>
            </div>
        </nav>

        <div class="auth" v-if="!isLoggedIn">
            <RouterLink to="/login" class="btn-enter">Войти</RouterLink>
            <RouterLink to="/register" class="btn-reg">Регистрация</RouterLink>
        </div>
        <div class="user-info" v-else>
            <span class="user-balance">{{ balance }} ₽</span>
            <RouterLink to="/profile" class="user-name">{{ username }}</RouterLink>
            <button class="btn-logout" @click="loginExit">Выйти</button>
        </div>

        <button class="burger" @click="menuOpen = !menuOpen" :class="{ 'burger-open': menuOpen }">
            <span></span>
            <span></span>
            <span></span>
        </button>
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
    text-decoration: none;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-sm);
    padding: 5px 12px;
    letter-spacing: 0.5px;
    transition: border-color var(--t-fast), color var(--t-fast);
}

.user-name:hover {
    border-color: var(--gold);
    color: var(--gold);
}

.btn-logout {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: var(--radius-sm);
    padding: 6px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: border-color var(--t-fast), color var(--t-fast);
}

.btn-logout:hover {
    border-color: var(--red);
    color: var(--red);
}

.burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 200;
}

.burger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--casino-text-primary);
    border-radius: 2px;
    transition: transform var(--t-fast), opacity var(--t-fast);
}

.burger-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger-open span:nth-child(2) { opacity: 0; }
.burger-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav-auth-mobile { display: none; }

@media (max-width: 768px) {
    header {
        padding: 0 20px;
    }

    .burger {
        display: flex;
    }

    .auth,
    header > .user-info {
        display: none;
    }

    nav {
        display: none;
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        background: var(--casino-bg-surface);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        padding: 20px;
        z-index: 99;
    }

    nav.nav-open {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    nav ul {
        flex-direction: column;
        gap: 0;
    }

    nav ul li a {
        display: block;
        padding: 12px 0;
        font-size: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.04);
    }

    .nav-auth-mobile {
        display: flex;
        gap: 12px;
        padding-top: 8px;
    }
}
</style>
