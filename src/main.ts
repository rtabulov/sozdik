import { createApp } from 'vue';
import App from './App.vue';

import 'virtual:windi.css';
import './main.scss';
import { secretWords } from './utils/words';

const daysPassed = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24);
const secretWord = secretWords.at(daysPassed % secretWords.length);

createApp(App, { secretWord }).mount('#app');
