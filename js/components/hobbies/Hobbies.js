class Hobbies {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.isValidData() ||
            !this.findTargetElement()) {
            return false;
        }

        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }

    isValidData() {
        if (!Array.isArray(this.data) ||
            this.data.length === 0) {
            return false;
        }
        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    render() {
        let HTML = '';

        for (const item of this.data) {
            if (this.isValidDataItem(item)) {
                HTML += this.generateHobbiesItem(item);
            }
        }

        if (HTML === '') {
            console.error('ERROR: duomenu masyve nerasta nei viena valydi reiksme');
        }

        this.DOM.innerHTML = HTML;
    }

    generateHobbiesItem(item) {
        return `<div class="hobbie col-12 col-md-4 col-lg-3">
                    <i class="icon fa fa-${item.icon}"></i>
                    <div class="title">${item.text}</div>
                </div>`;
    }

    isValidDataItem(item) {
        if (typeof item !== 'object' ||
            item === null ||
            Array.isArray(item) ||
            typeof item.icon !== 'string' ||
            item.icon === '' ||
            typeof item.text !== 'string' ||
            item.text === '') {
            return false;
        }
        return true;
    }
}

export { Hobbies }