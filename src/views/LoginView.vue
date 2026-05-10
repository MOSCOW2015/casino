<script setup>
import { ref } from 'vue';
import usePlayer from '../composables/usePlayer';
import { useRouter } from 'vue-router';

const { handleLogin } = usePlayer()
const router = useRouter()
const loginInput = ref('')
const passwordInput = ref('')

function submit(){
    handleLogin(loginInput.value)
    router.push('/')
}
</script>

<template>
    <form @submit.prevent="submit">
        <input type="text" v-model.trim="loginInput" placeholder="Имя">
        <input type="password" v-model.trim="passwordInput" placeholder="Пароль">
        <input type="submit" value="Войти">
    </form>
</template>

<style scoped>

</style>