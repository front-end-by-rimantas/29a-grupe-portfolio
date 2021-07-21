class Gallery {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;
        this.renderingStrategiesOptions = ['first', 'last', 'mostViews', 'leastViews', 'random'];
        this.renderingStrategy = this.renderingStrategiesOptions[0];
        this.maxItems = 6;
        this.usedDataListItems = [];

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

        const { imgPath: path, list, maxItems: max, renderingStrategy: strat } = this.data;

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
            this.renderingStrategiesOptions.includes(strat)) {
            this.renderingStrategy = strat;
        }

        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    filterDataList() {
        // ar galima geriau/optimaliau?
        switch (this.renderingStrategy) {
            case this.renderingStrategiesOptions[0]:
                this.usedDataListItems = this.filterDataListFirst();
                break;

            case this.renderingStrategiesOptions[1]:
                this.usedDataListItems = this.filterDataListLast();
                break;

            default:
                this.usedDataListItems = [];
        }
    }

    filterDataListFirst() {
        return [];
    }

    filterDataListLast() {
        return [];
    }

    filterDataListMostViews() {
        return [];
    }

    filterDataListLeastViews() {
        return [];
    }

    render() {
        const HTML = `${this.generateFilterHTML()}
                    <div class="content">${this.generateContentHTML()}</div>`;

        this.DOM.innerHTML = HTML;
    }

    generateContentHTML() {
        let HTML = '';
        let count = 0;

        for (const item of this.data.list) {
            // item.isValid()
            if (!true) {
                continue;
            }
            HTML += `<div class="item">Item 1</div>`;
            ++count;

            if (count === this.maxItems) {
                break;
            }
        }

        return HTML;
    }

    generateFilterHTML() {
        const tags = this.getAllUniqueTags();
        if (tags.length === 0) {
            return '';
        }

        let tagsHTML = '';
        for (const tag of tags) {
            tagsHTML += `<div class="tag">${tag}</div>`;
        }

        const HTML = `<div class="filter">
                        <div class="tag active">All</div>
                        ${tagsHTML}
                    </div>`;

        return HTML;
    }

    getAllUniqueTags() {
        let tags = [];
        const uniqueTags = [];

        for (const item of this.data.list) {
            tags = [...tags, ...item.tags];
        }

        for (const tag of tags) {
            if (!uniqueTags.includes(tag.toLowerCase())) {
                uniqueTags.push(tag.toLowerCase());
            }
        }

        return uniqueTags;
    }
}

export { Gallery }