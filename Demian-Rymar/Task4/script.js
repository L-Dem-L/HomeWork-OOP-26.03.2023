class CssClass {
    constructor(name, styles) {
        this.name = name;
        this.styles = styles;
    }

    getCode() {
        let styleCode = `.${this.name} {\n`;
        for (let [key, value] of Object.entries(this.styles)) {
            styleCode += `  ${key}: ${value};\n`;
        }
        styleCode += `}\n`;
        return styleCode;
    }
}

class HtmlElement {
    constructor(tag, attrs = {}, children = []) {
        this.tag = tag;
        this.attrs = attrs;
        this.children = children;
    }

    getCode() {
        let elementCode = `<${this.tag}`;
        for (let [key, value] of Object.entries(this.attrs)) {
            elementCode += ` ${key}="${value}"`;
        }
        elementCode += '>\n';
        for (let child of this.children) {
            if (typeof child === 'string') {
                elementCode += child;
            } else {
                elementCode += child.getCode();
            }
            elementCode += '\n';
        }
        elementCode += `</${this.tag}>`;
        return elementCode;
    }
}

class HtmlBlock {
    constructor(rootElement, cssClasses = []) {
        this.rootElement = rootElement;
        this.cssClasses = cssClasses;
    }

    getCode() {
        let htmlCode = '<style>\n';
        for (let cssClass of this.cssClasses) {
            htmlCode += cssClass.getCode();
        }
        htmlCode += '</style>\n';
        htmlCode += this.rootElement.getCode();
        return htmlCode;
    }

    addToPage() {
        document.write(this.getCode());
    }
}

// Створюємо необхідні css-класи
const cssClasses = [
    new CssClass('wrap', { display: 'flex' }),
    new CssClass('block', { width: '300px', margin: '10px' }),
    new CssClass('img', { width: '100%' }),
    new CssClass('text', { 'text-align': 'justify' }),
];

const rootElement = new HtmlElement('div', { id: 'wrapper', class: 'wrap' }, [
    new HtmlElement('div', { class: 'block' }, [
        new HtmlElement('h3', {}, 'What is Lorem Ipsum?'),
        new HtmlElement('img', { class: 'img', src: 'Lipsum.jpg', alt: 'Lorem Ipsum' }, []),
        new HtmlElement(
            'p',
            { class: 'text' },
            [
                '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the\n',
                "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and\n",
                'scrambled it to make a type specimen book. ',
                new HtmlElement('a', { href: 'https://www.lipsum.com/', target: '_blank' }, 'More...'),
            ],
        ),
    ]),
    new HtmlElement('div', { class: 'block' }, [
        new HtmlElement('h3', {}, 'What is Lorem Ipsum?'),
        new HtmlElement('img', { class: 'img', src: 'Lipsum.jpg', alt: 'Lorem Ipsum' }, []),
        new HtmlElement(
            'p',
            { class: 'text' },
            [
                '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the\n',
                "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and\n",
                'scrambled it to make a type specimen book. ',
                new HtmlElement('a', { href: 'https://www.lipsum.com/', target: '_blank' }, 'More...'),
            ],
        ),
    ]),
]);

const htmlBlock = new HtmlBlock(rootElement, cssClasses);
htmlBlock.addToPage();
