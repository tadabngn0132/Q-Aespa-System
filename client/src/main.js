import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

Vue.config.productionTip = false;

Vue.prototype.$flashMessage = {
  show(message, type = 'success') {
    Vue.prototype.$flash.show({
      text: message,
      time: 3000,
      persistOnHover: true,
      type: type
    });
  }
};

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
