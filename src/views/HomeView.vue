<script setup>
import LoginForms from '../components/LoginForms.vue';
import GameCards from '../components/GameCards.vue';
import usePlayer from '../composables/usePlayer';

const { username, balance, refillCount, isLoggedIn, handleLogin } = usePlayer()
</script>
<template>
    <LoginForms v-if="!isLoggedIn" @login="handleLogin"/>
    <main>
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
    </main>

    <GameCards />
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