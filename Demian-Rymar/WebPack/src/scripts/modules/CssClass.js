export class CssClass {
    constructor(className) {
        this.className = className;
        this.styles = {};
    }

    setStyle(property, value) {
        this.styles[property] = value;
    }

    removeStyle(property) {
        delete this.styles[property];
    }

    getCss() {
        let cssString = `.${this.className} {`;
        for (let property in this.styles) {
            cssString += `${property}: ${this.styles[property]}; `;
        }
        cssString += '}';
        return cssString;
    }
}
