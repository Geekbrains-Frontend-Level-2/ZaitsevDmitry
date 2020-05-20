class Renderer {
  constructor (root) {
    this._root = root
    this.prepareTemplate()
  }

  get root () {
    return this._root
  }

  get template () {
    return this._template
  }

  prepareTemplate () {
    this._template = document.createElement('div')
  }

  initTemplate () {
    if (!this._template) {
      return
    }
    return this._template.innerHTML = ''
  }

  render (primaryRoot) {
    if (primaryRoot) {
      this._root = primaryRoot
    }

    this.initTemplate()

    const { root, template } = this
    if (root) {
      root.appendChild(template)
    }
  }
}

class CartItem extends Renderer {
  constructor (data) {
    super()
    this._data = data
    this._counter = 1
  }

  get id () {
    return this._data.id
  }

  get totalPrice () {
    return this._data.price * this._counter
  }

  inc () {
    return Promise.resolve(this._counter++)
      .then(() => {
        this.render()
      })
  }

  dec () {

  }

  del () {

  }

  initTemplate () {
    if (!this._template) {
      return
    }

    this._template.innerHTML = `
      <div class="cart__item">
        ${this._data.title} x ${this._counter} = ${this.totalPrice}
      </div>
    `
  }
}

class Cart extends Renderer {
  constructor (root) {
    super(root)
    this._items = []
    this.render()
  }

  add (data) {
    const ExistedItem = this._items.filter(item => item.id === data.id)[0]
    if (ExistedItem) {
      return ExistedItem.inc()
        .then(() => {
          this.totalCostTemplate()
        })
    }

    return Promise.resolve(this._items.push(new CartItem(data)))
      .then(() => {
        this.render()
      })
  }

  remove (id) {

  }

  getTotalPrice () {
    // [CartItem, CartItem, CartItem, CartItem]
    return this._items.reduce((cost, item) => {
      return cost + item.totalPrice
    }, 0)
  }

  toggle () {
    if (!this._template) {
      return
    }

    this.template.classList.toggle('shown')
  }

  initTemplate () {
    if (!this._template) {
      return
    }

    if (!this._template.className) {
      this._template.className = 'cart__list'
      this.root.addEventListener('click', this.toggle.bind(this))
    }

    if (this._items.length) {
      this._template.innerHTML = ''
      this._items.forEach(item => item.render(this._template))
      this.totalCostTemplate()
    } else {
      this._template.innerHTML = `
        <div class="cart__empty">
          Вы пока не добавили товары в корзину
        </div>
      `
    }
  }

  totalCostTemplate () {
    let summaryContainer = document.querySelector('.cart__total')
    if (!summaryContainer) {
      summaryContainer = document.createElement('div')
      summaryContainer.className = 'cart__total'
    }

    summaryContainer.innerHTML = this.getTotalPrice()
    this._template.appendChild(summaryContainer)
  }
}

class Item extends Renderer {
  constructor (data = {}, cart, root) {
    super(root)
    this._cart = cart
    this._data = data
  }

  addInCart () {
    if (!this._cart) {
      return
    }

    this._cart.add(this._data)
  }

  initTemplate () {
    if (!this._template) {
      return
    }

    const { title, price } = this._data
    this._template.className = 'item'
    this._template.innerHTML = `
      <div class="item__img">
        <div>NO IMAGE AVAILABLE</div>
      </div>
      <div class="item__meta">Товар: <span>${title}</span></div>
      <div class="item__meta">Цена: <span>${price}</span></div>
      <button class="btn btn_primary">Купить</button>
    `
    
    const btn = this._template.querySelector('button')
    btn.addEventListener('click', this.addInCart.bind(this))
  }
}

class ItemList extends Renderer {
  constructor (root, cart) {
    super(root)
    this._cart = cart
    this.fetchData()
      .then(this.render.bind(this))
  }

  fetchData () {
    return fetch('http://localhost:3000/database/items.json')
      .then(res => {
        return res.json()
      })
      .then((res) => {
        this._items = res.data.map(item => {
            return new Item(item, this._cart)
          })
      })


    // const items = [
    //   { title: 'Shirt', price: 150 },
    //   { title: 'Socks', price: 50 },
    //   { title: 'Jacket', price: 350 },
    //   { title: 'Shoes', price: 250 },
    // ]

    // this._items = items.map(item => {
    //   return new Item(item)
    // })
  }

  get items () {
    return this._items
  }

  initTemplate () {
    if (!this._template) {
      return
    }

    this._template.className = 'items-list'
    this.items.forEach(item => item.render(this._template))
  }
}

const CartObject = new Cart(document.querySelector('.cart'))
const List = new ItemList(document.querySelector('main'), CartObject)
