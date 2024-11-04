class SettingsService {
    constructor() {
        let data = localStorage.getItem("aether-venues-settings");
        this._settings = data ? JSON.parse(data) : {};
        this._observers = [];
    }

    getSetting(settingId) {
        return this._settings[settingId];
    }

    setSetting(settingId, value) {
        this._settings[settingId] = value;
        localStorage.setItem("aether-venues-settings", JSON.stringify(this._settings));
        this._observers.forEach(o => o());
    }

    observe(observer) {
        this._observers.push(observer);
        return () => this._observers = this._observers.filter(o => o === observer);
    }
}

export const settingsService = new SettingsService();
