import { ref } from 'vue';


const username = ref("")
const balance = ref(1000)
const refillCount = ref(0)
const isLoggedIn = ref(false)

function handleLogin(name){
    username.value = name
    isLoggedIn.value = true
}

export default function usePlayer(){
    return {username, balance, refillCount, isLoggedIn, handleLogin}
}