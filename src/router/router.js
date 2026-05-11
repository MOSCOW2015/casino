import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import SlotsView from '../views/SlotsView.vue'
import BlackJackView from '../views/BlackJackView.vue'
import RouletteView from '../views/RouletteView.vue'
import CrashView from '../views/CrashView.vue'
import usePlayer from '../composables/usePlayer'

const { isLoggedIn } = usePlayer() 

const routes = [
    {path:'/', component: HomeView, name: 'HomeView'},
    {path:'/login', component: LoginView, name: 'LoginView'},
    {path:'/register', component: RegisterView, name: 'RegisterView'},
    {path: '/slots', component: SlotsView, name: 'SlotsView', meta: {needAuth: true}},
    {path: '/blackjack', component: BlackJackView, name: 'BlackJackView', meta: {needAuth: true}},
    {path: '/crash', component: CrashView, name: 'CrashView', meta: {needAuth: true}},
    {path: '/roulette', component: RouletteView, name: 'RouletteView', meta: {needAuth: true}},
    {path:'/:routeMatch(.*)*', component: NotFoundView, name: 'NotFoundView'}
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next, ) => {
    if(!isLoggedIn.value && to.meta.needAuth){
        next({name: 'LoginView'})
    } else {
        next()
    }
})