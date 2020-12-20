function moveToSelectedContents(categoryId) {
    const selector = '#' + categoryId;
    const contentsLocationY = document.querySelector(selector).offsetTop;
    window.scrollTo({top: contentsLocationY, behavior: 'smooth'});
}