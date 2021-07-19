class Hobbies {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
    }

    init() {

    }

    isValidSelector() {
        return true;
    }

    isValidData() {
        return true;
    }

    findTargetElement() {
        return true;
    }

    render() {
        let HTML = '';

        for (const item of this.data) {
            if (this.isValidDataItem(item)) {
                HTML += this.generateHobbiesItem(item);
            }
        }

        if (HTML === '') {
            // duomenys visiskai klaidingi
        }

        this.DOM.innerHTML = HTML;
    }

    generateHobbiesItem(item) {
        return `<div class="col-12 col-md-4 col-lg-3">ITEM 1</div>`;
    }

    isValidDataItem() {
        return true;
    }
}

export { Hobbies }