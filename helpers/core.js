export function appendComponent(parentComponent, childComponent) {
    parentComponent.innerHTML += childComponent;
}

export function setInnerHtml(parentComponent, childComponent) {
    parentComponent.innerHTML = childComponent;
}

export function setEmptyElement(parentComponent) {
    parentComponent.innerHTML = '';
}