import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._img = this._popup.querySelector('.popup__image');
        this._caption = this._popup.querySelector('.popup__caption');
    }
    open(name, url) {
        // Clear popup before opening
        this._img.src = '';
        this._img.alt = '';
        this._caption.textContent = '';

        // Open popup with given image and caption
        this._img.src = url;
        this._img.alt = name;
        this._caption.textContent = name;
        super.open();
    }
}