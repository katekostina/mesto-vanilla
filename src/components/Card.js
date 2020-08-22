export default class Card {
    constructor(name, url, cardSelector, handleCardClick){
        this._cardSelector = cardSelector;
        this._name = name;
        this._url = url;
        this._handleCardClick = handleCardClick;
        this._element = null;
    }

    _getMarkup(){
        const cardMarkup = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardMarkup;
    }

    _handleImageClick(cardname, cardurl) {
        this._handleCardClick(cardname, cardurl);
    }

    _handleHeartClick(cardHeartButton) {
        cardHeartButton.classList.toggle('card__heart_active');
    }

    _handleTrashClick(cardDeleteButton) {
        cardDeleteButton.parentElement.remove();
    }

    _setEventListeners(cardImage, cardHeartButton, cardDeleteButton) {
        cardImage.addEventListener('click', () => {
            this._handleImageClick(this._name, this._url);
        });

        cardHeartButton.addEventListener('click', () => { 
            this._handleHeartClick(cardHeartButton);
        });

        cardDeleteButton.addEventListener('click', () => {
            this._handleTrashClick(cardDeleteButton);
        });
    }

    render() {
        this._element = this._getMarkup();
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._url;
        cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        const cardHeartButton = this._element.querySelector('.card__heart');
        const cardDeleteButton = this._element.querySelector('.card__delete');
        this._setEventListeners(cardImage, cardHeartButton, cardDeleteButton);
        return this._element;
    }    
}