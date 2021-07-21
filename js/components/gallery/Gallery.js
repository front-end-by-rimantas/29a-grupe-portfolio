class Gallery {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
        this.renderingStrategiesOptions = ['first', 'last', 'mostViews', 'leastViews', 'random'];
        this.renderingStrategy = this.renderingStrategiesOptions[0];
        this.maxItems = 3;

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.isValidData() ||
            !this.findTargetElement()) {
            return false
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
        // this.data type
        if (typeof this.data !== 'object' ||
            this.data === null ||
            Array.isArray(this.data)) {
            return false;
        }

        const { imgPath: path, list, maxItems: max, renderingStrategy: start } = this.data;

        // imgPath
        if (typeof path !== 'string' ||
            path === '') {
            return false;
        }

        // list
        if (!Array.isArray(list) ||
            list.length === 0) {
            return false;
        }

        // maxItems update
        if (typeof max === 'number' &&
            isFinite(max) &&
            max > 0 &&
            max % 1 === 0) {
            this.maxItems = max;
        }

        // renderStrategy update
        if (typeof strat === 'string' &&
            strat !== '' &&
            this.renderingStrategiesOptions.includes(start)) {
            this.renderingStrategy = strat;
        }

        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    render() {
        console.log(this.data);
    }
}

export { Gallery }