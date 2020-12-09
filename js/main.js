'use strict'
function scroll(page, duration) {
    let target = document.querySelector(page);
    let startPosition = window.pageYOffset || window.scrollY;
    let distance = target.getBoundingClientRect().top;
    distance += 10;
    let startTime = null;
    function anim(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(anim);
    }
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    requestAnimationFrame(anim);
};
function headerScroll() {
    let btn = document.querySelector('.header_button');
    btn.addEventListener('click', function () { scroll('.services', 500); })
}
headerScroll();
function dropDownMenu() {
    let menuBtn = document.querySelector('.header__menu');
    let menu = document.querySelector('.dropdown-menu');
    let closeField = document.querySelector('.dropdown-close');
    menuBtn.addEventListener('click', function () { menu.classList.add('active'); })
    closeField.addEventListener('click', function () { closeMenu(); })
    function closeMenu() { menu.classList.remove('active'); }
    function menuScroll(button, target, scrollTime = 500) {
        let btn = document.querySelector(button);
        btn.addEventListener('click', function () {
            closeMenu();
            scroll(target, scrollTime)
        })
    }
    menuScroll('.menu__link_services', '.services');
    menuScroll('.menu__link_calc', '.calculate');
    menuScroll('.menu__link_portfolio', '.portfolio', 600);
    menuScroll('.menu__link_team', '.team', 900);
    menuScroll('.menu__link_blog', '.blog', 1000);
    menuScroll('.menu__link_contacts', '.contacts', 1000);
}
dropDownMenu();
function calculate() {
    let buttons = document.querySelectorAll('.plan__btn');
    let slider = document.querySelector('.calc__range');
    let areaValue = document.querySelector('.area__value');
    let costValue = document.querySelector('.cost__value');
    let objectValue = document.querySelector('.object__value');
    let prices = [250, 500, 1050];
    function changeValue() {
        areaValue.innerHTML = String(slider.value * 100);
        if (buttons[0].classList.contains('active')) {
            costValue.innerHTML = prices[0] * slider.value + ' ';
        } else if (buttons[1].classList.contains('active')) {
            costValue.innerHTML = prices[1] * slider.value + ' ';
        } else if (buttons[2].classList.contains('active')) {
            costValue.innerHTML = prices[2] * slider.value + ' ';
        }
        objectValue.innerHTML = costValue.innerHTML * 11 + ' ';
    }
    slider.oninput = function () { changeValue(); }
    for (let button of buttons) {
        button.addEventListener('click', function () {
            for (let button of buttons) {
                button.classList.remove('active');
                this.classList.add('active');
            }
            changeValue();
        })
    }
}
calculate();
function showPortfolio() {
    let buttons = document.querySelectorAll('.portfolio__btn')
    let categories = document.querySelectorAll('.portfolio__category');
    changeCategory();
    for (let button of buttons) {
        button.addEventListener('click', function () {
            for (let button of buttons) {
                button.classList.remove('active');
                this.classList.add('active');
                changeCategory();
            }
        })
    }
    function changeCategory() {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains('active')) {
                if (buttons[0].classList.contains('active')) {
                    for (let elem of categories) elem.style.display = 'flex';
                } else {
                    for (let elem of categories) elem.style.display = 'none';
                    categories[i - 1].style.display = 'flex';
                }
            }
        }
    }
}
showPortfolio();
function companiesSlider() {
    let slider = document.querySelector('.companies__slider-range');
    let slides = document.querySelector('.companies__slides');
    slider.addEventListener('input', function () {
        slides.style.transform = `translateX(-${slider.value * (slides.scrollWidth - slides.clientWidth) / 100}px)`;
    })
};
companiesSlider();