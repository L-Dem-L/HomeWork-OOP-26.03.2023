class HtmlElement {
    constructor(tag, selfClosing, content = '', attributes = [], styles = [], children = []) {
        this.tag = tag;
        this.selfClosing = selfClosing;
        this.content = content;
        this.attributes = attributes;
        this.styles = styles;
        this.children = children;
    }

    setAttribute(name, value) {
        this.attributes.push({ name, value });
    }

    setStyle(property, value) {
        this.styles.push({ property, value });
    }

    addChild(child) {
        this.children.push(child);
    }

    addFirstChild(child) {
        this.children.unshift(child);
    }

    getHtml() {
        let html = `<${this.tag}`;

        if (this.attributes.length > 0) {
            html += ' ' + this.attributes.map(attr => `${attr.name}="${attr.value}"`).join(' ');
        }

        if (this.styles.length > 0) {
            const styleString = this.styles.map(style => `${style.property}: ${style.value}`).join('; ');
            html += ` style="${styleString}"`;
        }

        if (this.selfClosing) {
            html += ' />';
        } else {
            html += `>${this.content}`;
            if (this.children.length > 0) {
                html += this.children.map(child => child.getHtml()).join('');
            }
            html += `</${this.tag}>`;
        }

        return html;
    }
}

const wrapper = new HtmlElement('div', false);
wrapper.setAttribute('id', 'wrapper');
wrapper.setStyle('display', 'flex');

const block1 = new HtmlElement('div', false);
block1.setStyle('width', '300px');
block1.setStyle('margin', '10px');

const block1Title = new HtmlElement('h3', false, 'What is Lorem Ipsum?');
block1.addChild(block1Title);

const block1Image = new HtmlElement('img', true);
block1Image.setAttribute('src', 'lipsum.jpg');
block1Image.setAttribute('alt', 'Lorem Ipsum');
block1Image.setStyle('width', '100%');
block1.addChild(block1Image);

const block1Text = new HtmlElement('p', false, '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."');
block1Text.setStyle('text-align', 'justify');
block1.addChild(block1Text);

const block1Link = new HtmlElement('a', false, 'More...');
block1Link.setAttribute('href', 'https://www.lipsum.com/');
block1Link.setAttribute('target', '_blank');
block1Text.addChild(block1Link);

wrapper.addChild(block1);

const block2 = block1;
wrapper.addChild(block2);

document.write(wrapper.getHtml());
