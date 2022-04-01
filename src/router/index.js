import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login';
import Index from '@/components/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
});

router.beforeEach((to, from, next) => {
  if ((to.name !== 'login' && document.cookie === '') || (to.name !== 'login' && document.cookie === 'userInfo=; token=')) next({ name: 'login' });
  next();
});
export default router;
