function toggle() {
    var display = document.getElementById('menu-bar').className;
    display === 'menu invisible' || display === 'menu'
        ? document.getElementById('menu-bar').className = 'menu visible'
        : document.getElementById('menu-bar').className = 'menu invisible';
}

var gallery  = document.getElementsByClassName('gallery')[0];
var galleryChildren = document.getElementsByClassName('gallery')[0].childNodes;

if(document.documentElement.clientWidth < 980) {
    buildSlider(gallery, galleryChildren);
}


window.onresize = function () {
    var width = document.documentElement.clientWidth;

    if (width < 980) {
        buildSlider(gallery, galleryChildren);
    }
};

function buildSlider(gallery, galleryChildren) {
    var i;
    gallery.style.height = 86 + 'vw';

    for(i = 0; i < galleryChildren.length; i++) {
        if(i % 2 === 1) {
            galleryChildren[i].style.position = 'absolute';
            if(i === 1) {
                galleryChildren[i].style.zIndex = 1;
            }
        }
    }

    console.log(document.getElementsByClassName('gallery')[0].childNodes);
}