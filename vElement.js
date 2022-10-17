/**
 * 实现虚拟dom
 */

const vElement = function(tagName, props, children) {
    if (!(this instanceof vElement)) {
        return new vElement(tagName, props, children)
    }

    if (Array.isArray(props)) {
        children = props
        props = {}
    }

    this.tagName = tagName
    this.props = props || {}
    this.children = children || []
    this.key = props ? props.key : ''
}

vElement.prototype.render = function() {
    let el = document.createElement(this.tagName)
    let props = this.props
    for (let propName in props) {
        let propVal = props[propName]
        el.setAttribute(propName, propVal)
    }
    this.children.forEach(function(child) {
        let childEl = (child instanceof vElement) ? child.render() : document.createTextNode(child)
        el.appendChild(childEl);
    })
    return el
}