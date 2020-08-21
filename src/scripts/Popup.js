export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._overlay = this._popup.querySelector('.popup__overlay');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add('popup_shown');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popup.classList.remove('popup_shown');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose(event) {
        const openedPopup = document.querySelector('.popup_shown');
        if (event.code === 'Escape') {
            openedPopup.classList.remove('popup_shown');
            document.removeEventListener('keydown', this._handleEscClose);
        }
    }
    setEventListeners() {
        this._closeButton.addEventListener('click', () => { this.close() });
        this._overlay.addEventListener('click', () => { this.close() });
    }
}