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

class Item extends Renderer {
  constructor (data = {}, root) {
    super(root)
    this._data = data
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
    `
  }
}

class ItemList extends Renderer {
  constructor (root) {
    super(root)
    this.fetchData()
  }

  fetchData () {
    const items = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ]

    this._items = items.map(item => {
      return new Item(item)
    })
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

const List = new ItemList(document.querySelector('main'))
List.render()
