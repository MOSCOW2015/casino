<script setup>

const props = defineProps({
    isLoggedIn: Boolean,
    username: String,
})
</script>

<template>
    <header>
    <h1>ROYALE</h1>
    <nav>
      <ul>
        <li>Игры</li>
        <li>Бонусы</li>
        <li>Турниры</li>
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
</style>