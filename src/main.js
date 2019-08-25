import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

import About from './components/AboutMe'
import Work from './components/Work'
import Projects from './components/Projects'

const routes = [
    { path: '/', component: About },
    { path: '/work', component: Work },
    { path: '/projects', component: Projects },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return {selector: to.hash}
        } else if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
