import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'

import './assets/main.css'
import './common/style/theme.css'
import 'vant/es/toast/style'
const app = createApp(App)

app.use(createPinia())
app.use(router)

import { prefix } from '@/common/js/utils'

// 全局过滤器
app.config.globalProperties.$filters = {
  prefix
}

app.mount('#app')
