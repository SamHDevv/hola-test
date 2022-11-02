import { createApp } from 'vue'
import App from './App.vue';
import store from './store/index';

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(store);
app.use(PrimeVue);
app.use(ToastService);


app.component('prime-input-text', InputText);
app.component('prime-button', Button);
app.component('prime-data-table', DataTable);
app.component('prime-column', Column);
app.component('prime-toast', Toast);

app.mount('#app')

