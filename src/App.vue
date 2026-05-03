<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import GameCards from './components/GameCards.vue';
import LoginForms from './components/LoginForms.vue';
import { ref } from 'vue';


const balance = ref(1000)
const username = ref("Игрок")

const refillCount = ref(0)


const isLoggedIn = ref(false)

function handleLogin(name){
    username.value = name
    isLoggedIn.value = true
}


</script>

<template>
    <AppHeader :isLoggedIn :username/>

    <main>
        <LoginForms v-if="!isLoggedIn" @login="handleLogin"/>
        <div>Добро пожаловать, {{ username }}</div>
        <div :class="{
            'balance-high': balance > 1000,
            'balance-low': balance < 100
        }">
        Баланс: {{ balance }} ₽</div>
        <div>Пополнений сегодня {{ refillCount }}</div>
        <div v-if="balance > 5000">Статус: ★ VIP</div>
        <div v-if="balance===0">
            Пополните счёт
        </div>
        <div v-else>
            <button @click="balance = 0">Обнулить</button>
            <button v-if="balance > 0" @click="balance *= 2">Удвоить</button>
            <button @click="balance += 1000; refillCount++">+1000</button>
        </div>

    <GameCards />
    </main>

    <AppFooter />
</template>

<style scoped>



.badge-jackpot {
    color: var(--gold);
}

.balance-high {
    color: var(--green);
}

.balance-low {
    color: var(--red)
}
</style>