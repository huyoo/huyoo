(function (window) {
    const MENU_LIST = ['Home', "Demo", "About"],
        container = document.getElementsByClassName('container')[0],
        menu = document.getElementById('menu');
    let currentIndex = 0;

    menu.onclick = function (ev) {
        console.log(ev);
        if (ev.target.className === 'active' || ev.target.nodeName === "UL") {
            return;
        }

        currentIndex = MENU_LIST.findIndex(item => item === ev.target.innerHTML);
        scrollPage(currentIndex);
        moveActiveMenu();
        ev.target.className = 'active';
    };

    document.onwheel = function (ev) {
        if ((ev.deltaY > 0 && currentIndex < (MENU_LIST.length - 1)) || (ev.deltaY < 0 && currentIndex > 0)) {
            currentIndex = currentIndex + (ev.deltaY > 0 ? 1 : -1);
            moveAndScroll(currentIndex);
        }
    };

    function moveAndScroll(currentIndex) {
        scrollPage(currentIndex);
        moveActiveMenu(currentIndex);
    }

    function scrollPage(nextIndex) {
        container.style.top = nextIndex ? `-${nextIndex}00vh` : 0
    }

    function moveActiveMenu(currentIndex) {
        Array.from(menu.children).forEach(item => {
            item.className = ''
        });

        if (currentIndex !== undefined && currentIndex !== null) {
            menu.children[currentIndex].className = 'active'
        }
    }

    //第二屏图片延迟加载
    function delayLoad(){
        const imgs = document.getElementsByClassName('demo')[0].querySelectorAll('img');

        imgs.forEach(img => {
            img.src = img.getAttribute("imgPath")
        });
    }
    //节流函数
    function throttle(fn){
        return function (){
            window.setTimeout(fn, 1000)
        }
    }

    window.onload = throttle(delayLoad);
})(window);


