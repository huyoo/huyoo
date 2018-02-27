(function () {
    var date,
        menuDate = document.getElementById("menuDate"),
        menuTime = document.getElementById("menuTime");
    function menu() {
        date = new Date();
        menuDate.innerHTML = date.getFullYear().toString()+"/" +
            (date.getMonth()+1)+ "/"+ date.getDate();
        menuTime.innerHTML =  date.getHours().toString() +" : "+
            date.getMinutes()+ " : "+ date.getSeconds();
    };
    window.setInterval(menu,500);

    var menuMsc = document.getElementById('menuMsc');
    menuMsc.onclick = function () {
        var status = document.getElementById('menuMscCont'),
            targ = menuMsc.children[0].children[2],
            targClass = targ.className;

        targ.className = targ
        Class.replace('fa-plus','fa-minus');
        console.log(targ.className);

        status.hidden = !status.hidden;
    };
})();

