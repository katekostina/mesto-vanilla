export default class UserInfo {
    constructor(nameSelector, captionSelector){
        this._name = document.querySelector(nameSelector);
        this._caption = document.querySelector(captionSelector);
    }

    getUserInfo() {
        return { profilename: this._name.textContent, profilecaption: this._caption.textContent };
    }

    setUserInfo(name, caption) {
        this._name.textContent = name;
        this._caption.textContent = caption;
    }
}