import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
document.head.appendChild(link);

store.dispatch('auth/checkAuthState')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
