'use strict'
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