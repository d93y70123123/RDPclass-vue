import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import RDPclass from '../views/Show.vue'
import Connect from '../components/Connect.vue'
import Open_machine from '../components/Open_machine.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  }, 
  {
    path: '/RDPclass',
    name: 'RDPclass',
    component: RDPclass,
    children: [
      {
        path:"connect",
        name:"Connect",
        component: Connect,
      },{
        path:"open_machine",
        name:"Open_machine",
        component: Open_machine,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,routes
})

// 要放在上面宣告過的router下面
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('Username');
  if (isLogin) {
    next();
    if( to.path == '/' ) {
      next('/RDPclass');
    }
    // if( to.path == '/RDPclass/*' ) {
    //   next('/RDPclass/Show');
    // }
  } else {
    next()
    next('/');
    if( to.path !== '/RDPclass' && to.path !== '/')
      next('/')
    else
      next()
  }
})

export default router
