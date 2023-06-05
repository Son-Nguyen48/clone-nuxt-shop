import Vue from 'vue'
import moment from 'moment'

Vue.use({
  install(Vue) {
    Vue.prototype.$moment = moment
  },
})
