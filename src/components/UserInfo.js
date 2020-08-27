export default class UserInfo {
    constructor(nameSelector, captionSelector, avatarSelector){
        this._name = document.querySelector(nameSelector);
        this._caption = document.querySelector(captionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { profilename: this._name.textContent, profilecaption: this._caption.textContent };
    }

    setUserInfo(name, caption) {
        this._name.textContent = name;
        this._caption.textContent = caption;
    }

    setAvatar(url){
        this._avatar.src = url;
    }

    setUserId(id) {
        this._id = id;
    }

    getUserId() {
        return this._id;
    }
}