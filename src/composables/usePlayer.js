import { ref, watch } from 'vue';


const username = ref("")
const balance = ref(1000)
const refillCount = ref(0)
const isLoggedIn = ref(false)
const gamesPlayed = ref(0)
const totalWinnings = ref(0)

if (localStorage.getItem('isLoggedIn')){
    username.value = localStorage.getItem('username')
    balance.value = Number(localStorage.getItem('balance'))
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
    gamesPlayed.value = Number(localStorage.getItem('gamesPlayed')) || 0
    totalWinnings.value = Number(localStorage.getItem('totalWinnings')) || 0
}

function recordGame(winAmount) {
    gamesPlayed.value++
    if (winAmount > 0) {
        totalWinnings.value += winAmount
    }
    localStorage.setItem('gamesPlayed', gamesPlayed.value)
    localStorage.setItem('totalWinnings', totalWinnings.value)
}

function topUp(amount) {
    balance.value += amount
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
    const savedBalance = Number(localStorage.getItem('balance'))
    balance.value = savedBalance || user.balance || 1000
    gamesPlayed.value = user.gamesPlayed || 0
    totalWinnings.value = user.totalWinnings || 0
    username.value = name
    isLoggedIn.value = true
    localStorage.setItem('username', username.value)
    localStorage.setItem('balance', balance.value)
    localStorage.setItem('isLoggedIn', isLoggedIn.value)
    localStorage.setItem('gamesPlayed', gamesPlayed.value)
    localStorage.setItem('totalWinnings', totalWinnings.value)
    return true
}

function logOut(){
    const users = getUsers()
    const idx = users.findIndex(u => u.username === username.value)
    if (idx !== -1) {
        users[idx].balance = balance.value
        users[idx].gamesPlayed = gamesPlayed.value
        users[idx].totalWinnings = totalWinnings.value
        localStorage.setItem('users', JSON.stringify(users))
    }

    username.value = ''
    isLoggedIn.value = false
    balance.value = 1000
    gamesPlayed.value = 0
    totalWinnings.value = 0
    localStorage.removeItem('username')
    localStorage.removeItem('balance')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('gamesPlayed')
    localStorage.removeItem('totalWinnings')
    
}

watch(balance, (newVal) => {
    if (isLoggedIn.value) {
        localStorage.setItem('balance', newVal)
    }
})

export default function usePlayer(){
    return { username, balance, refillCount, isLoggedIn, gamesPlayed, totalWinnings, handleLogin, logOut, register, recordGame, topUp }
}