<template>
  <div :class="[$style.item]" @click="updateAmount(id)">
    <div :class="[$style.item__img]">
      <div>NO IMAGE AVAILABLE</div>
    </div>
    <div :class="[$style.item__meta]">Товар: <span>{{ title }}</span></div>
    <div :class="[$style.item__meta]">Цена: <span>{{ price }}</span></div>
    <div :class="[$style.item__meta]">Количество: <span>{{ amount }}</span></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      // title: 'My title',
      // price: 12345
    }
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapActions('goods', [
      'updateAmount'
    ])
  },
  computed: {
    ...mapGetters('goods', [
      'getData'
    ]),
    data () {
      return this.getData[this.id]
    },
    title () {
      return this.data.title
    },
    price () {
      return this.data.price
    },
    amount () {
      return this.data.amount || 0
    }
  }
}
</script>

<style module>
.item {
  background: #f6f6f6;
  border-radius: 4px;
  width: 200px;
  margin: 20px;
  padding: 20px;
  cursor: pointer;
}

.item:hover {
  background: #f1f1f1;
}

.item__img > *  {
  display: block;
  max-width: 100%;
  margin: auto;
  color: #aaa;
}

.item__meta {
  display: block;
  font-weight: bold;
  margin-top: 8px;
}

.item__meta span {
  font-weight: normal;
}
</style>
