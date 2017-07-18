var menu = document.getElementById('menu-button');
menu.addEventListener('click', function () {
    var display = document.getElementById('menu-bar').className;
    display === 'menu invisible' || display === 'menu'
        ? document.getElementById('menu-bar').className = 'menu visible'
        : document.getElementById('menu-bar').className = 'menu invisible';
});

var i, width, left, right;
var black0_5 = 'rgba(0, 0, 0, 0.5)';
var black0_8 = 'rgba(0, 0, 0, 0.8)';
var white0_5 = 'rgba(255, 255, 255, 0.5)';
var isSlider = false;
var gallery = document.getElementsByClassName('gallery')[0];
var galleryChildren = document.getElementsByClassName('gallery')[0].childNodes;
var images = [];
var amountImages = 3;
var indexOfCurrSlide = 0;
var arrPagination = [];

for (i = 0; i < galleryChildren.length; i++) {
    if (i % 2 === 1 && i < amountImages * 2 + 1) {
        images.push(galleryChildren[i]);
    }
}

if (window.innerWidth < 980) {
    isSlider = true;
    buildSlider(gallery, galleryChildren);
}
else {
    isSlider = false;

}

window.onresize = function () {
    width = window.innerWidth;

    if (width < 980 && !isSlider) {
        isSlider = true;
        buildSlider();
    }

    if (width >= 980 && galleryChildren.length === amountImages * 2 + 1 + 3) {
        isSlider = false;
        indexOfCurrSlide = 0;
        arrPagination = [];
        destroySlider();
    }

    if (width < 335) {
        gallery.style.minHeight = 285 + 'px';
    }
};

function buildSlider() {
    gallery.style.height = 88.5 + 'vw';

    for (i = 0; i < galleryChildren.length; i++) {
        if (i % 2 === 1 && i < amountImages * 2 + 1) {
            galleryChildren[i].style.position = 'absolute';
            if (i === 1) {
                galleryChildren[i].style.zIndex = 1;
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
    left.style.zIndex = 5;
    left.style.color = white0_5;
    left.style.fontSize = 9 + 'vw';
    left.style.position = 'absolute';
    left.style.top = 42 + '%';
    left.style.fontFamily = '"QuickSand Bold", sans-serif';
    left.style.left = 2 + '%';
    left.style.maxWidth = 5 + 'vw';
    left.style.userSelect = 'none';
    left.style.cursor = 'pointer';

    left.addEventListener('click', function () {
        if (indexOfCurrSlide !== 0) {
            images[indexOfCurrSlide].style.zIndex = 0;
            arrPagination[indexOfCurrSlide].className = '';
            arrPagination[indexOfCurrSlide].style.color = black0_5;

            images[indexOfCurrSlide - 1].style.zIndex = 1;
            arrPagination[indexOfCurrSlide - 1].className = 'active';
            arrPagination[indexOfCurrSlide - 1].style.color = black0_8;

            --indexOfCurrSlide;
            if (indexOfCurrSlide === 0) {
                left.style.color = white0_5;
            }
            if (indexOfCurrSlide !== amountImages - 1) {
                right.style.color = 'white';
            }
        }
    });

    right.style.zIndex = 5;
    right.style.color = 'white';
    right.style.fontSize = 9 + 'vw';
    right.style.position = 'absolute';
    right.style.top = 42 + '%';
    right.style.fontFamily = '"QuickSand Bold", sans-serif';
    right.style.left = 93 + '%';
    right.style.maxWidth = 5 + 'vw';
    right.style.userSelect = 'none';
    right.style.cursor = 'pointer';

    right.addEventListener('click', function () {
        if (indexOfCurrSlide !== amountImages - 1) {
            images[indexOfCurrSlide].style.zIndex = 0;
            arrPagination[indexOfCurrSlide].className = '';
            arrPagination[indexOfCurrSlide].style.color = black0_5;

            images[indexOfCurrSlide + 1].style.zIndex = 1;
            arrPagination[indexOfCurrSlide + 1].className = 'active';
            arrPagination[indexOfCurrSlide + 1].style.color = black0_8;

            ++indexOfCurrSlide;
            if (indexOfCurrSlide === amountImages - 1) {
                right.style.color = white0_5;
            }
            if (indexOfCurrSlide !== 0) {
                left.style.color = 'white';
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
        if ((+e.target.id !== indexOfCurrSlide && e.target.id) || e.target.id === '0') {
            id = +e.target.id;
            images[indexOfCurrSlide].style.zIndex = 0;
            arrPagination[indexOfCurrSlide].className = '';
            arrPagination[indexOfCurrSlide].style.color = black0_5;

            images[id].style.zIndex = 1;
            arrPagination[id].className = 'active';
            arrPagination[id].style.color = black0_8;
            indexOfCurrSlide = id;

            if (indexOfCurrSlide === amountImages - 1) {
                right.style.color = white0_5;
                left.style.color = 'white';
            }
            else if (indexOfCurrSlide === 0) {
                right.style.color = 'white';
                left.style.color = white0_5;
            } else {
                right.style.color = 'white';
                left.style.color = 'white';
            }
        }
    });

    for (i = 0; i < images.length; i++) {
        li = document.createElement('li');
        li.innerHTML = '&#9679;';
        li.style.display = 'inline-block';
        li.style.marginLeft = 2 + '%';
        li.style.color = black0_5;
        li.style.fontSize = 4 + 'vw';
        li.style.cursor = 'pointer';
        li.id = i + '';
        pagination.appendChild(li);
        arrPagination.push(li);

        if (i === 0) {
            li.className = 'active';
        }

        if (i === indexOfCurrSlide) {
            li.style.className = 'active';
            li.style.color = black0_8;
        } else {
            li.style.color = black0_5;
        }

        li.addEventListener('mouseover', function () {
            this.style.color = black0_8;
        });

        li.addEventListener('mouseout', function (e) {
            if (e.target.className !== 'active') {
                this.style.color = black0_5;
            }
        });
    }

    pagination.style.position = 'absolute';
    pagination.style.zIndex = 5;
    pagination.style.height = 4 + 'vw';
    pagination.style.width = 100 + '%';
    pagination.style.textAlign = 'center';
    pagination.style.bottom = 0;

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

    gallery.style.cssText = "";
    gallery.style.height = "";
}