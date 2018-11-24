import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import Moment from 'moment'
import Lodash from 'lodash'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueResource)

var app = new Vue({
    el: '#app',
    components: {
        IndexComponent: () => import(/* webpackChunkName: "index" */ './index.vue')
    },
    data: {  
        snackbar: {
            visible: false,
            color: null,
            text: null
        },
    },
    methods: {
        encodeJSON: function (data) {
            var encoded = '?' + Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }).join('&')

            return encoded
        },
        toast: function (text, color) {
            this.snackbar.text = text
            this.snackbar.color = color
            this.snackbar.visible = true
        }
    }
})

window.Vue = Vue
window.App = app
window.moment = Moment
window.lodash = Lodash