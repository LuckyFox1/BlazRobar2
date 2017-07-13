'use strict';

function toggle() {
    var display = document.getElementById('menu-bar').className;
    display === 'menu invisible' ? document.getElementById('menu-bar').className = 'menu visible' : document.getElementById('menu-bar').className = 'menu invisible';
}