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
    // 네비게이션 메뉴 선택 이벤트
    const menuList = document.querySelector('#menu-list');

    menuList.addEventListener('click', (event) => {
        const target = event.target;
        const clickedTag = target.tagName;
        if (clickedTag === 'UL' || clickedTag === 'A' || clickedTag === 'I') return;

        const categoryId = changeSelectedClass(target);

        moveToSelectedContents(categoryId);
    });

    const changeSelectedClass = (target) => {
        const clickedTag = target.tagName;
        const selectedClassName = 'selected';
        const buttonList = menuList.querySelectorAll('.nav-menu-item');
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

    const navigationMenu = document.querySelector('#nav-menu');
    const navHeight = navigationMenu.getBoundingClientRect().height;

    const moveToSelectedContents = (categoryId) => {
        const selector = '#' + categoryId;
        const selectedMenu = document.querySelector(selector);
        const selectedLocationY = selectedMenu.offsetTop - navHeight;
        window.scrollTo({top: selectedLocationY, behavior: 'smooth'});
    }

    const fixNavigation = () => {
        navigationMenu.style.position = 'fixed';
        navigationMenu.style.top = '0';
        navigationMenu.style.width = '100%';
        navigationMenu.style.backgroundColor = '#fff';

        const bodyElement = document.querySelector('body');
        bodyElement.style.padding = navHeight+'px 0 0 0';
    }

    const getBackFixedNavigation = () => {
        navigationMenu.style.position = 'static';
        navigationMenu.style.width = 'none';
        navigationMenu.style.backgroundColor = '#transparent';

        const bodyElement = document.querySelector('body');
        bodyElement.style.padding = '0 2em';
    }

    const mediaQuery = window.matchMedia('screen and (max-width: 376px)');
    // 스크롤 이동 시 이벤트
    window.addEventListener('scroll', () => {
        if (mediaQuery.matches) {
            return;
        }

        const scrollLocation = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const header = document.querySelector('.portfolio-title');
        const headerHeight = header.scrollHeight;

        if (scrollLocation >= headerHeight) {
            fixNavigation();
        } else if (scrollLocation < headerHeight) {
            getBackFixedNavigation();
        }
    });

    const toggleNavigationMenu = () => {
        const menuListDisplay = menuList.style.display;
        if (menuListDisplay === 'block') {
            menuList.style.display = 'none';
            return;
        }
        if (!menuListDisplay || menuListDisplay === 'none') {
            menuList.style.display = 'block';
        }
    }

    // hidden 메뉴 클릭 이벤트
    const hiddenMenu = document.querySelector('#toggle-nav-button');
    hiddenMenu.addEventListener('click', () => {
        toggleNavigationMenu();
    });
});
