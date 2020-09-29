export class Section {
  constructor({ items, renderer }, cardsContainer) {

    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._container.append(element);
  }
}
