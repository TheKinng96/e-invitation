import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Plugins
import { registerPlugins } from '@/plugins';
import vuetify from './plugins/vuetify';
import VueGtag from 'vue-gtag';
import i18n from './plugins/i18n';
import './plugins/yup';

// Directive
import { outsideClick } from './_helpers/directives';

// Component
import Loader from '@/shared/components/Loader.vue';
import Icon from '@/shared/icons/Icon.vue';
import Countdown from 'vue3-flip-countdown';

const app = createApp(App);

registerPlugins();

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(i18n);
app.use(Countdown);
app.use(VueGtag, {
  config: { id: 'UA-149762776-1' },
});

// Directives
app.directive('outsideClick', outsideClick);
app.component('loader', Loader);
app.component('Icon', Icon);

app.mount('#app');
