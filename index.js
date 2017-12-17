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