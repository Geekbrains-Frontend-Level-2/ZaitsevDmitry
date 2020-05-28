<template>
  <div>
    <header>
      <div :class="[$style.logo]">GBShop</div>
      <div :class="[$style.cart]">
        <a :class="[$style.btn, $style.btn_primary]">Корзина</a>
      </div>
    </header>
    <main>
      <h1>Список товаров</h1><br>
      <Item
        v-for="id in getItemsOnPage"
        :key="id"
        :id="id"
      />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Item from './Item.vue'
export default {
  data () {
    return {}
  },
  components: {
    Item,
  },
  methods: {
    ...mapActions('goods', [
      'requestData'
    ])
  },
  computed: {
    ...mapGetters('goods', [
      'getItemsOnPage'
    ])
  },
  mounted () {
    this.requestData()
  }
}
</script>

<style module>
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #fff;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.btn_primary {
  color: #fff;
  background: #1797d2;
  border-color: #186385;
  text-decoration: none;
}

.btn_primary:hover {
  background: #0f90cd;
  text-decoration: none;
}

.btn_primary:active {
  background: #076e9f;
  text-decoration: none;
}

header {
  background: #0e0450;
  height: 40px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: #fff;
  font-size: 32px;
}

h1 {
  font-size: 28px;
  padding: 20px;
}
</style>
