import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/components/Main";
import Add from "@/components/department/Add";
import UserIndex from "@/components/user/UserIndex";



Vue.use(VueRouter)
const Login = () => import('../components/Login')
const home = () => import('../components/Home')
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        redirect: '/home/index'
    },
    {
        path: '/home',
        name: 'Home',
        component: home,
        children: [
            {path: 'index',component: Main},
            {path: 'department',component: Add},
            {path: 'user',component: UserIndex}
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
        y: 0
    }),
    routes
})

router.beforeEach((to, from, next) => {

    if (to.path == "/") {
        next();
    } else {
        Vue.axios.post("/refresh", {token: window.sessionStorage.getItem("token")}).then(
            res => {
                if (res.data.code == 200) {
                    // console.log("token refresh++++++++++++++++++++++++++++++++++")
                    window.sessionStorage.setItem("token", res.data.data)
                    next();
                } else {
                    next('/')
                }
            }
        ).catch(err => {
            console.log(err);
        })
    }
})

export default router
