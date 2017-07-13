function toggle() {
    let display = document.getElementById('menu-bar').style.display;
    display === 'block'
        ? document.getElementById('menu-bar').style.display = 'none'
        : document.getElementById('menu-bar').style.display = 'block';
}
