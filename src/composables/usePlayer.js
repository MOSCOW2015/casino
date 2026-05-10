import { ref } from 'vue';


const username = ref("")
const balance = ref(1000)
const refillCount = ref(0)
const isLoggedIn = ref(false)

if (localStorage.getItem('isLoggedIn')){
    username.value = localStorage.getItem('username')
    balance.value = Number(localStorage.getItem('balance'))
    isLoggedIn.value = localStorage.getItem('isLoggedIn')
}

function handleLogin(name){
    username.value = name
    isLoggedIn.value = true
    localStorage.setItem('username', username.value)
    localStorage.setItem('balance', balance.value)
    localStorage.setItem('isLoggedIn', isLoggedIn.value)
}

function logOut(){
    username.value = ''
    isLoggedIn.value = false
    balance.value = 1000
    localStorage.clear()
}

export default function usePlayer(){
    return {username, balance, refillCount, isLoggedIn, handleLogin, logOut };
}