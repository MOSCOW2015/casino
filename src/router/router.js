import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'


const routes = [
    {path:'/', component: HomeView, name: 'HomeView'},
    {path:'/login', component: LoginView, name: 'LoginView'},
    {path:'/register', component: RegisterView, name: 'RegisterView'},
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})