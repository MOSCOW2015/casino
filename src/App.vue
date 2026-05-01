<script setup>
import { ref } from 'vue';

// blok 1
const balance = ref(1000)
const username = ref("Игрок")

// blok 2
const refillCount = ref(0)

// blok 3
const isLoggedIn = ref(false)

// blok 4
const loginInput = ref('')
const passwordInput = ref('')
const errorMessage = ref('')

function handleLogin(){
 if(!loginInput.value || !passwordInput.value){
    errorMessage.value = 'Заполните поля'
 } else {
    username.value = loginInput.value
    isLoggedIn.value = true
    loginInput.value = ''
    passwordInput.value =''
    errorMessage.value = ''
 }
}

// blok 5

const games = ref([
    {id: 1,
    name: "Book of Ra",
    provider: "Royal Casino",
    badge: "NEW",
    emoji: '🎰'},

    {id: 2,
    name: "Black Jack Pro",
    provider: "Royal Casino",
    badge: "FIRE",
    emoji: '♠️'},

    {id: 3,
    name: "Poker Texas",
    provider: "Royal Casino",
    badge: "FIRE",
    emoji: '♦️'},

    {id: 4,
    name: "Roulette",
    provider: "Royal Casino",
    badge: "Live",
    emoji: '🎡'},
])

</script>

<template>
    <header>
    <h1>ROYALE</h1>
    <nav>
      <ul>
        <li>Игры</li>
        <li>Бонусы</li>
        <li>Профиль</li>
      </ul>
    </nav>
    <div v-if="!isLoggedIn">
        <button class="enterButton">Войти</button>
        <button class="regButton">Регистрация</button>
    </div>
    <div v-else>
        <div>{{ username }}</div>
    </div>

  </header>

  <main>
    <form v-if="!isLoggedIn" @submit.prevent="handleLogin">
        <input type="text" v-model.trim="loginInput" placeholder="Имя">
        <input type="password" v-model.trim="passwordInput" placeholder="Пароль">
        <input type="submit" value="Войти">
        <div>{{ errorMessage }}</div>
    </form>

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

    <section>
        <div v-for="game in games" :key="game.id">
            <div>{{ game.name }}</div>
            <div>{{ game.provider }}</div>
            <div :class="{
                'badge-new': game.badge === 'NEW',
                'badge-fire': game.badge === 'FIRE',
                'badge-live': game.badge === 'Live'
                }">
                {{ game.badge }}
            </div>

            <div>{{ game.emoji }}</div>
        </div>
    </section>
    
  </main>
</template>

<style scoped>

header {
  background-color: #0d0d1a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  box-shadow: 0px 1px #e8e0f0;
}

nav ul {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

h1 {
  color: #d4af37;
}

section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.badge-new {
    color: var(--green);
}

.badge-fire {
    color: var(--red);
}

.badge-live {
    color: rgb(0, 0, 255);
}

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