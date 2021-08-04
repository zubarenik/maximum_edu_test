import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cities: [],
    problemThemes: [
      'Возврат товара',
      'Поломка оборудования',
      'Местоположение моего заказа',
      'Проблема с сайтом',
      'Проблема с оплатой заказа'
    ]
  },
  mutations: {
    loadCities(state, cities) {
      let titles = cities.map(item => item.title)
      state.cities = [...titles]
    }
  },
  actions: {
    loadCities(context) {
      Vue.axios.get('city')
      .then(response => {
          context.commit('loadCities', response.data)
      })
    }
  },
  modules: {
  }
})
