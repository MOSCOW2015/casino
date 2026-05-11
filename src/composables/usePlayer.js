import { ref, watch } from 'vue';


const username = ref("")
const balance = ref(1000)
const refillCount = ref(0)
const isLoggedIn = ref(false)

if (localStorage.getItem('isLoggedIn')){
    username.value = localStorage.getItem('username')
    balance.value = Number(localStorage.getItem('balance'))
    isLoggedIn.value = localStorage.getItem('isLoggedIn')
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || []
}


function register(name, password){
    const users = getUsers()
    const exists = users.find(u => u.username === name)
    if (exists){
        return false
    } else {
        users.push({ username: name, password })
        localStorage.setItem('users', JSON.stringify(users))
        handleLogin(name, password)
        return true
    }
}


function handleLogin(name, password){
    const users = getUsers()
    const user = users.find(u => u.username === name && u.password === password)
    if (!user) {
        return false
    }
    balance.value = user.balance || 1000;
    username.value = name
    isLoggedIn.value = true
    localStorage.setItem('username', username.value)
    localStorage.setItem('balance', balance.value)
    localStorage.setItem('isLoggedIn', isLoggedIn.value)
    return true
}

function logOut(){
    const users = getUsers()
    const idx = users.findIndex(u => u.username === username.value)
    if (idx !== -1) {
        users[idx].balance = balance.value
        localStorage.setItem('users', JSON.stringify(users))
    }

    username.value = ''
    isLoggedIn.value = false
    balance.value = 1000
    localStorage.removeItem('username')
    localStorage.removeItem('balance')
    localStorage.removeItem('isLoggedIn')
    
}

watch(balance, (newVal) => {
    if (isLoggedIn.value) {
        localStorage.setItem('balance', newVal)
    }
})

export default function usePlayer(){
    return {username, balance, refillCount, isLoggedIn, handleLogin, logOut, register };
}