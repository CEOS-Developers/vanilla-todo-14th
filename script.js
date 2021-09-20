['div', 'span', 'ul', 'li', 'dd', 'dl', 'section', 'h1', 'a', 'img', 'form', 'button', 'header', 'footer', 'input', 'p'].forEach(e => {
    document.querySelectorAll(e).forEach(element => {
        element.style.outline = "1px solid dodgerblue"
    })
})