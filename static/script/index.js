(function (window) {
    init();

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

    function init() {
        let banner = document.getElementsByClassName('banner');
        banner[0].children[0].style.backgroundImage = `url("${window.location.host.includes('localhost') ? '/huyoo.github.io' : ''}/static/img/AlbertaThanksgiving_ZH-CN5899007960_1920x1080.bg.jpg")`;
    }


    // var date,
    //     menuDate = document.getElementById("menuDate"),
    //     menuTime = document.getElementById("menuTime");
    // function menu() {
    //     date = new Date();
    //     menuDate.innerHTML = date.getFullYear().toString()+"/" +
    //         (date.getMonth()+1)+ "/"+ date.getDate();
    //     menuTime.innerHTML =  date.getHours().toString() +" : "+
    //         date.getMinutes()+ " : "+ date.getSeconds();
    // };
    // // window.setInterval(menu,500);
    //
    // var menuMsc = document.getElementById('menuMsc');
    // menuMsc.onclick = function () {
    //     var status = document.getElementById('menuMscCont'),
    //         targ = menuMsc.children[0].children[2],
    //         targClass = targ.className;
    //     targ.className = targClass.match(/fa-plus/) ?
    //         targClass.replace('fa-plus','fa-minus') : targClass.replace('fa-minus','fa-plus');
    //     status.style.display = status.style.display === 'block'? 'none': 'block';
    // };
})(window);


