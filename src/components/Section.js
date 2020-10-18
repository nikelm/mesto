export class Section {
  constructor({ items, renderer }, cardsContainer) {

    this._items = items;
    this._renderer = renderer;
    this._container = cardsContainer;
   
  }

  renderItems() {    
    this._renderer(this._items);
    
  }

  addItem(element, isArray) {
    if (isArray) {
      
      this._container.append(element);
      
    } else {

      this._container.prepend(element);
    }
   
    
  }

}
