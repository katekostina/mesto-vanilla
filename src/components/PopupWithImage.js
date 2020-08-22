import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelector, captionSelector){
        super(popupSelector);
        this._img = this._popup.querySelector(imageSelector);
        this._caption = this._popup.querySelector(captionSelector);
    }

    _clear() {
        this._img.src = '';
        this._img.alt = '';
        this._caption.textContent = '';
    }

    open(name, url) {
        this._clear();
        this._img.src = url;
        this._img.alt = name;
        this._caption.textContent = name;
        super.open();
    }
}