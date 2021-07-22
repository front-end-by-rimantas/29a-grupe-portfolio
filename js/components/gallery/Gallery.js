class Gallery {
    constructor(selector, data, componentClass) {
        this.selector = selector;
        this.data = data;
        this.componentClass = componentClass;

        this.DOM = null;
        this.renderingStrategiesOptions = {
            first: this.filterDataListFirst.bind(this),
            last: this.filterDataListLast.bind(this),
            mostViews: this.filterDataListMostViews.bind(this),
            leastViews: this.filterDataListLeastViews.bind(this),
            random: this.filterDataListRandom.bind(this),
        }
        this.renderingStrategy = 'first';
        this.maxItems = 6;
        this.validListItems = [];
        this.usedDataListItems = [];

        this.init();
    }

    init() {
        if (!this.isValidSelector() ||
            !this.isValidData() ||
            !this.findTargetElement() ||
            !this.filterValidListItems()) {
            return false
        }

        this.filterDataList();
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

        const { imgPath: path, list, maxItems: max, renderStrategy: strat } = this.data;

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
        const options = Object.keys(this.renderingStrategiesOptions);
        if (typeof strat === 'string' &&
            strat !== '' &&
            options.includes(strat)) {
            this.renderingStrategy = strat;
        }

        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    filterValidListItems() {
        for (const item of this.data.list) {
            if (this.componentClass.isValid(item)) {
                this.validListItems.push(item);
            }
        }

        return !!this.validListItems.length;
    }

    filterDataList() {
        this.renderingStrategiesOptions[this.renderingStrategy]();
    }

    filterDataListFirst() {
        if (this.validListItems.length <= this.maxItems) {
            this.usedDataListItems = this.validListItems;
        } else {
            this.usedDataListItems = this.validListItems.slice(0, this.maxItems);
        }
    }

    filterDataListLast() {
        const count = this.validListItems.length;
        if (count <= this.maxItems) {
            this.usedDataListItems = this.validListItems;
        } else {
            this.usedDataListItems = this.validListItems.slice(count - this.maxItems, count);
        }
    }

    filterDataListMostViews() {
        const sorted = this.validListItems.sort((a, b) => b.viewsCount - a.viewsCount);
        if (this.validListItems.length <= this.maxItems) {
            this.usedDataListItems = sorted;
        } else {
            this.usedDataListItems = sorted.slice(0, this.maxItems);
        }
    }

    filterDataListLeastViews() {
        const sorted = this.validListItems.sort((a, b) => a.viewsCount - b.viewsCount);
        if (this.validListItems.length <= this.maxItems) {
            this.usedDataListItems = sorted;
        } else {
            this.usedDataListItems = sorted.slice(0, this.maxItems);
        }
    }

    filterDataListRandom() {
        const itemsCount = this.validListItems.length
        const count = itemsCount <= this.maxItems ? itemsCount : this.maxItems;
        const selectedIndexes = [];

        // surenkam random indexes
        while (selectedIndexes.length < count) {
            const randomIndex = Math.floor(Math.random() * this.validListItems.length);
            if (!selectedIndexes.includes(randomIndex)) {
                selectedIndexes.push(randomIndex);
                this.usedDataListItems.push(this.validListItems[randomIndex]);
            }
        }
    }

    render() {
        const HTML = `${this.generateFilterHTML()}
                    <div class="content">${this.generateContentHTML()}</div>`;

        this.DOM.innerHTML = HTML;
    }

    generateContentHTML() {
        let HTML = '';
        let count = 0;

        for (const item of this.usedDataListItems) {
            HTML += this.componentClass.HTML(this.data.imgPath, item);
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

        for (const item of this.usedDataListItems) {
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