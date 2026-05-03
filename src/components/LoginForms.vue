<script setup>
import { ref } from 'vue'

// blok 4
const loginInput = ref('')
const passwordInput = ref('')
const errorMessage = ref('')

const emit = defineEmits(['login'])


function handleLogin(){
 if(!loginInput.value || !passwordInput.value){
    errorMessage.value = 'Заполните поля'
 } else {
    emit('login', loginInput.value)
    loginInput.value = ''
    passwordInput.value =''
    errorMessage.value = ''
 }
}

</script>

<template>
    <form @submit.prevent="handleLogin">
        <input type="text" v-model.trim="loginInput" placeholder="Имя">
        <input type="password" v-model.trim="passwordInput" placeholder="Пароль">
        <input type="submit" value="Войти">
        <div>{{ errorMessage }}</div>
    </form>
</template>

<style scoped>

</style>
