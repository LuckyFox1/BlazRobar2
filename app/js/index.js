function toggle() {
    let display = document.getElementById('menu-bar').className;
    display === 'menu invisible' || display === 'menu'
        ? document.getElementById('menu-bar').className = 'menu visible'
        : document.getElementById('menu-bar').className = 'menu invisible';
}
/*

window.onresize = function () {
    console.log("asdsf");
};*/
