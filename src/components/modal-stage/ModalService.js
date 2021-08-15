class ModalService {

    constructor() {
        this.modals = [];
        this._observers = [];
    }

    push(modal) {
        this.modals.push(modal);
        this._observers.forEach(o => o());
        return () => {
            this.modals = this.modals.filter(m => m !== modal);
            this._observers.forEach(o => o());
        };
    }

    observe(observer) {
        this._observers.push(observer);
        return () => this._observers = this._observers.filter(o => o === observer);
    }

}

const modalService = new ModalService();

export { modalService };