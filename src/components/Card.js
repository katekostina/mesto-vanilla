export default class Card {
    constructor(name, url, cardSelector, { handleCardClick, handleDelete, handleLike}, likes, cardOwnerId, userId, cardId){
        this._cardSelector = cardSelector;
        this._name = name;
        this._url = url;
        this._handleCardClick = handleCardClick;
        this._handleDelete = handleDelete;
        this._element = null;
        this._likes = likes;
        this._cardOwnerId = cardOwnerId;
        this._userId = userId;
        this._cardId = cardId;
        this._handleLike = handleLike;
        this._isLiked = false;
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
        this._handleLike(this._cardId, this._isLiked);
        this._isLiked = !this._isLiked;
    }

    _handleTrashClick(cardDeleteButton) {
        this._handleDelete(cardDeleteButton.parentElement, this._cardId);
    }

    _setEventListeners(cardImage, cardHeartButton, cardDeleteButton) {
        cardImage.addEventListener('click', () => {
            this._handleImageClick(this._name, this._url);
        });

        cardHeartButton.addEventListener('click', () => { 
            this._handleHeartClick(cardHeartButton);
        });

        if (cardDeleteButton) {
            cardDeleteButton.addEventListener('click', () => {
                this._handleTrashClick(cardDeleteButton);
            });
        }
    }

    updateLikes(likes) {
        this._likes = likes;
        this._likesNumberElement.textContent = this._likes;
    }

    render() {
        this._element = this._getMarkup();
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._url;
        cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._likesNumberElement = this._element.querySelector('.card__likes');
        this._likesNumberElement.textContent = this._likes;
        const cardHeartButton = this._element.querySelector('.card__heart');
        const cardDeleteButton = this._element.querySelector('.card__delete');
        if (this._cardOwnerId == this._userId) {
            this._setEventListeners(cardImage, cardHeartButton, cardDeleteButton);
        } else {
            cardDeleteButton.remove();
            this._setEventListeners(cardImage, cardHeartButton);
        }
        return this._element;
    }
}