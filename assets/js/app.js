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
    const introductionCard = document.querySelector('#introduction');
    const skillsCard = document.querySelector('#skills');
    const careerCard = document.querySelector('#career');
    const projectsCard = document.querySelector('#projects');

    // 네비게이션 메뉴 선택 이벤트
    const menuList = document.querySelector('#menu-list');

    menuList.addEventListener('click', (event) => {
        const target = event.target;
        const clickedTag = target.tagName;
        if (clickedTag === 'UL' || clickedTag === 'A' || clickedTag === 'I') return;

        const categoryId = getCategoryId(target);

        moveToSelectedContents(categoryId);
    });

    const getCategoryId = (target) => {
        const clickedTag = target.tagName;
        const listItemList = menuList.querySelectorAll('.nav-menu-item');
        let categoryId = '';
        let selectedMenu;

       if (clickedTag === 'LI') {
            selectedMenu = target;
            categoryId = selectedMenu.dataset.category;
        } else if (clickedTag === 'BUTTON') {
            selectedMenu = target.parentElement;
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
        bodyElement.style.padding = navHeight+'px 2em 0';
    }

    const getBackFixedNavigation = () => {
        navigationMenu.style.position = 'static';
        navigationMenu.style.width = 'none';
        navigationMenu.style.backgroundColor = '#transparent';

        const bodyElement = document.querySelector('body');
        bodyElement.style.padding = '0 2em';
    }

    const displayCurrentMenu = (scrollLocation) => {
        const modifyActive = new ModifyClass();
        const selectedClassName = 'selected';
        const listItemList = menuList.querySelectorAll('.nav-menu-item');

        modifyActive.removeAllClasses(listItemList, selectedClassName);
        if (scrollLocation < introductionCard.offsetTop - navHeight ) {
            return;
        }
        if (scrollLocation >= projectsCard.offsetTop - navHeight) {
            modifyActive.addClass(listItemList.item(3), selectedClassName);
        } else if (scrollLocation >= careerCard.offsetTop - navHeight) {
            modifyActive.addClass(listItemList.item(2), selectedClassName);
        } else if (scrollLocation >= skillsCard.offsetTop - navHeight) {
            modifyActive.addClass(listItemList.item(1), selectedClassName);
        } else {
            modifyActive.addClass(listItemList.item(0), selectedClassName);
        }
    }

    const maxWidth376px = window.matchMedia('screen and (max-width: 376px)');
    // 스크롤 이동 시 이벤트
    window.addEventListener('scroll', () => {
        if (maxWidth376px.matches) {
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

        displayCurrentMenu(scrollLocation);
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
