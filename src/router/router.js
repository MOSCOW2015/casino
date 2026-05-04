import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import SlotsView from '../views/SlotsView.vue'
import BlackJackView from '../views/BlackJackView.vue'
import RouletteView from '../views/RouletteView.vue'
import PokerViews from '../views/PokerViews.vue'


const routes = [
    {path:'/', component: HomeView, name: 'HomeView'},
    {path:'/login', component: LoginView, name: 'LoginView'},
    {path:'/register', component: RegisterView, name: 'RegisterView'},
    {path: '/slots', component: SlotsView, name: 'SlotsView'},
    {path: '/blackjack', component: BlackJackView, name: 'BlackJackView'},
    {path: '/poker', component: PokerViews, name: 'PokerViews'},
    {path: '/roulette', component: RouletteView, name: 'RouletteView'},
    {path:'/:routeMatch(.*)*', component: NotFoundView, name: 'NotFoundView'}
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})