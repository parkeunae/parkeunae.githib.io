ModifyClass = function() {}

ModifyClass.prototype = {
    removeAllClasses: function(element, classString){
        for(var i = 0, len = element.length; i<len; i++){
            this.removeClass(element[i], classString);
        }
    },

    removeClass: function(element, classString) {
        element.className = element.className.split(' ')
                                            .filter(function(name){return name !== classString})
                                            .join(' ');
    },

    addClass: function(element, classString) {
        element.className = element.className.split(' ')
                                            .filter(function(name){return name !== classString})
                                            .concat(classString)
                                            .join(' ');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navigationMenu = document.querySelector('#nav-menu>ul');

    navigationMenu.addEventListener('click', (event) => {
        const target = event.target;
        const clickedTag = target.tagName;
        if (clickedTag === 'UL') return;

        const categoryId = changeSelectedClass(target);

        moveToSelectedContents(categoryId);
    });

    const changeSelectedClass = (target) => {
        const clickedTag = target.tagName;
        const selectedClassName = 'selected';
        const buttonList = navigationMenu.querySelectorAll('.nav-menu-item');
        let categoryId = '';
        let selectedMenu;

        const modifyActive = new ModifyClass();

        modifyActive.removeAllClasses(buttonList, selectedClassName);
        if (clickedTag === 'LI') {
            selectedMenu = target;
            modifyActive.addClass(selectedMenu, selectedClassName);
            categoryId = selectedMenu.dataset.category;
        } else if (clickedTag === 'BUTTON') {
            selectedMenu = target.parentElement;
            modifyActive.addClass(selectedMenu, selectedClassName);
            categoryId = selectedMenu.dataset.category;
        }

        return categoryId;
    }

    const moveToSelectedContents = (categoryId) => {
        const selector = '#' + categoryId;
        const selectedMenu = document.querySelector(selector);
        const selectedLocationY = selectedMenu.offsetTop;
        window.scrollTo({top: selectedLocationY, behavior: 'smooth'});
    }
})
