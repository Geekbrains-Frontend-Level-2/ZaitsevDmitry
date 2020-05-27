// import Cart from './cart'
// import ItemList from './itemList'

// // import './css/uglify.css'

// console.log(123);

// const CartObject = new Cart(document.querySelector('.cart'))
// new ItemList(document.querySelector('main'), CartObject)

import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: 'main',
  template: '<App />',
  components: {
    App
  }
})
