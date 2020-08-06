import { toggleImagePopup } from './index.js';

export default class Card {
    constructor(name, url, templateSelector){
        this._templateSelector = templateSelector;
        this._name = name;
        this._url = url;
        this._element;
    }

    _getMarkup(){
        const cardMarkup = document.querySelector(this._templateSelector).content.cloneNode(true);
        return cardMarkup;
    }

    _handleImageClick() {
        toggleImagePopup(this._name, this._url);
    }

    _handleHeartClick(evt) {
        evt.target.classList.toggle('card__heart_active');
    }

    _handleTrashClick(evt) {
        evt.target.parentElement.remove();
    }

    _setListenersOnImage() {
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _setListenersOnHeart() {
        this._element.querySelector('.card__heart').addEventListener('click', (evt) => { 
            this._handleHeartClick(evt);
          });
    }

    _setListenersOnTrash() {
        this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });
    }

    render() {
        this._element = this._getMarkup();
        this._element.querySelector('.card__image').src = this._url;
        this._element.querySelector('.card__image').alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._setListenersOnImage();
        this._setListenersOnHeart();
        this._setListenersOnTrash();
        return this._element;
    }    
}