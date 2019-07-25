import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignUp from './views/Signup.vue';
import Login from './views/Login.vue';
import Boards from './views/Boards.vue';
import Board from './views/Board.vue';
import store from './store';

Vue.use(Router);

function isLoggedIin(to, from, next) {
  store.dispatch('auth/authenticate')
    .then(() => {
      next();
    })
    .catch(e => {
      next("/login");
    });

}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            // Logged in
            console.log("user already logged in..");
            next("/boards");
          })
          .catch(e => {
            // Show login page (potentially with `e.message`)
            console.error("Authentication error", e);
            next("/login");
          });
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: isLoggedIin
    },
    {
      path: '/board/:id',
      name: 'board',
      component: Board,
      beforeEnter: isLoggedIin
    },

  ],
});
