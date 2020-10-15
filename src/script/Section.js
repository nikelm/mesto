export class Section {
  constructor({ items, renderer }, cardsContainer) {

    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
    //this._id = '67cc4a327641f369d030b84f';
  }

  renderItems() {
    //this._items.forEach((item) => {
     
      this._renderer(this._items);
    //})
  }

  addItem(element) {
    this._container.append(element);
    
  }

}
