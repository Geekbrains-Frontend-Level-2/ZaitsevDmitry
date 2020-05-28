const state = {
  data: {
    "1": { "id": 1, "title": "Shirt", "price": 150, amount: 4 },
    "2": { "id": 2, "title": "Socks", "price": 50 },
    "3": { "id": 3, "title": "Jacket", "price": 350 },
    "4": { "id": 4, "title": "Shoes", "price": 250 },
    "5": { "id": 4, "title": "Shoes", "price": 250 },
    "6": { "id": 4, "title": "Shoes", "price": 250 }
  },
  itemsOnPage: [],
  itemsInCart: [1,2]
}

const getters = {
  getData: state => state.data,
  getItemsOnPage: state => state.itemsOnPage
}

const actions = {
  requestData({ commit }) {
    fetch('/database/items.json')
      .then(res => res.json())
      .then(res => {
        commit('setData', res)
      })
  },
  updateAmount({ commit }, id) {
    commit('updateAmount', id)
  }
  // addToCart ({commit}, id) {
  //   commit('add')
  // },
  // removeFromCart ('remove') {

  // }
}

const mutations = {
  setData (state, newData) {
    state.data = newData
    state.itemsOnPage = Object.keys(newData)
  },
  updateAmount (state, id) {
    if (!state.data[id].amount) {
      state.data[id].amount = 1
    }
    state.data[id].amount++
    state.data[id] = Object.assign({}, state.data[id])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
