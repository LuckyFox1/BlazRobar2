'use strict';

(function () {

    var menu = document.getElementById('menu-button');
    menu.addEventListener('click', function () {
        var display = document.getElementById('menu-bar').className;
        display === 'menu invisible' || display === 'menu' ? document.getElementById('menu-bar').className = 'menu visible' : document.getElementById('menu-bar').className = 'menu invisible';
    });

    var i, width, left, right;
    var boundaryWidth = 980;
    var isSlider = false;
    var gallery = document.getElementsByClassName('gallery')[0];
    var galleryChildren = document.getElementsByClassName('gallery')[0].childNodes;
    var images = [];
    var indexOfCurrSlide = 0;
    var arrPagination = [];

    console.log(galleryChildren);
    for (i = 0; i < galleryChildren.length; i++) {
        if (i % 2 === 1) {
            images.push(galleryChildren[i]);
            console.log(images);
        }
    }

    var amountImages = images.length;

    if (window.innerWidth < boundaryWidth) {
        isSlider = true;
        buildSlider(gallery, galleryChildren);
    } else {
        isSlider = false;
    }

    window.onresize = function () {
        width = window.innerWidth;

        if (width < boundaryWidth && !isSlider) {
            isSlider = true;
            buildSlider();
        }

        if (width >= boundaryWidth && galleryChildren.length === amountImages * 2 + 1 + 3) {
            isSlider = false;
            indexOfCurrSlide = 0;
            arrPagination = [];
            destroySlider();
        }
    };

    function buildSlider() {
        for (i = 0; i < galleryChildren.length; i++) {
            if (i % 2 === 1 && i < amountImages * 2 + 1) {
                if (i === 1) {
                    galleryChildren[i].className = 'active-slide';
                }
            }
        }

        if (galleryChildren.length === amountImages * 2 + 1) {
            createArrow();
        }

        if (galleryChildren.length === amountImages * 2 + 3) {
            createPagination();
        }
    }

    function createArrow() {
        left = document.createElement('span');
        left.innerHTML = '<';
        right = document.createElement('span');
        right.innerHTML = '>';
        left.className = 'left-arrow';

        left.addEventListener('click', function () {
            if (indexOfCurrSlide !== 0) {
                images[indexOfCurrSlide].className = '';
                arrPagination[indexOfCurrSlide].className = '';
                images[indexOfCurrSlide - 1].className = 'active-slide';
                arrPagination[indexOfCurrSlide - 1].className = 'active';
                --indexOfCurrSlide;
                if (indexOfCurrSlide === 0) {
                    left.className = 'left-arrow';
                }
                if (indexOfCurrSlide !== amountImages - 1) {
                    right.className = 'right-arrow enabled';
                }
            }
        });

        right.className = 'right-arrow enabled';

        right.addEventListener('click', function () {
            if (indexOfCurrSlide !== amountImages - 1) {
                images[indexOfCurrSlide].className = '';
                arrPagination[indexOfCurrSlide].className = '';
                images[indexOfCurrSlide + 1].className = 'active-slide';
                arrPagination[indexOfCurrSlide + 1].className = 'active';
                ++indexOfCurrSlide;

                if (indexOfCurrSlide === amountImages - 1) {
                    right.className = 'right-arrow';
                }

                if (indexOfCurrSlide !== 0) {
                    left.className = 'left-arrow enabled';
                }
            }
        });

        gallery.appendChild(left);
        gallery.appendChild(right);
    }

    function createPagination() {
        var pagination = document.createElement('ul');
        var li;

        pagination.addEventListener('click', function (e) {
            var id;

            if (+e.target.id !== indexOfCurrSlide && e.target.id || e.target.id === '0') {
                id = +e.target.id;
                images[indexOfCurrSlide].className = '';
                arrPagination[indexOfCurrSlide].className = '';
                images[id].className = 'active-slide';
                arrPagination[id].className = 'active';
                indexOfCurrSlide = id;

                if (indexOfCurrSlide === amountImages - 1) {
                    right.className = 'right-arrow';
                    left.className = 'left-arrow enabled';
                } else if (indexOfCurrSlide === 0) {
                    right.className = 'right-arrow enabled';
                    left.className = 'left-arrow';
                } else {
                    right.className = 'right-arrow enabled';
                    left.className = 'left-arrow enabled';
                }
            }
        });

        for (i = 0; i < images.length; i++) {
            li = document.createElement('li');
            li.innerHTML = '&#9679;';
            li.id = i + '';
            pagination.appendChild(li);
            arrPagination.push(li);

            if (i === 0) {
                li.className = 'active';
            }

            if (i === indexOfCurrSlide) {
                li.className = 'active';
            } else {
                li.className = '';
            }

            li.addEventListener('mouseover', function () {
                this.className += ' temp';
            });

            li.addEventListener('mouseout', function (e) {
                if (e.target.className !== 'active temp' && e.target.className !== 'active') {
                    this.className = '';
                } else {
                    this.className = 'active';
                }
            });
        }

        pagination.className = 'pagination';

        gallery.appendChild(pagination);
    }

    function destroySlider() {
        var pag = gallery.lastChild;
        gallery.removeChild(pag);
        gallery.removeChild(right);
        gallery.removeChild(left);

        for (i = 0; i < galleryChildren.length; i++) {
            if (i % 2 === 1 && i < amountImages * 2 + 1) {
                galleryChildren[i].style.cssText = "";
                galleryChildren[i].style.zIndex = "";
                galleryChildren[i].style.position = "";
            }
        }

        for (i = 0; i < images.length; i++) {
            images[i].className = '';
        }

        gallery.style.cssText = "";
        gallery.style.height = "";
    }
})();