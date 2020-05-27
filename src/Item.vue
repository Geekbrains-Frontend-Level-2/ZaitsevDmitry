<template>
  <div :class="[$style.item]">
    <div :class="[$style.item__img]">
      <div>NO IMAGE AVAILABLE</div>
    </div>
    <div :class="[$style.item__meta]">Товар: <span>{{ title }}</span></div>
    <div :class="[$style.item__meta]">Цена: <span>{{ price }}</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // title: 'My title',
      // price: 12345
    }
  },
  props: {
    title: String,
    price: Number,
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
