
var q1 = document.getElementById("q1");
var q2 = document.getElementById("q2");
var q3 = document.getElementById("q3");
var next1 = document.getElementById('next1')
var back1 = document.getElementById('back1')
var next2 = document.getElementById('next2')
var back2 = document.getElementById('back2')
document.addEventListener('DOMContentLoaded', function() {
    let query = window.matchMedia("(max-width: 767px)");
    if (query.matches) {
        next1.onclick = function() {
            q1.style.left = "-650px";
            q2.style.left = "15px";
        }
        back1.onclick = function() {
            q1.style.left = "15px";
            q2.style.left = "650px";
        }
        back2.onclick = function() {
            q2.style.left = "15px";
            q3.style.left = "650px";
        }
        next2.onclick = function() {
            q2.style.left = "-650px";
            q3.style.left = "15px";
        }
    } else {
        next1.onclick = function() {
            q1.style.left = "-650px";
            q2.style.left = "50px";
        }
        back1.onclick = function() {
            q1.style.left = "50px";
            q2.style.left = "650px";
        }
        back2.onclick = function() {
            q2.style.left = "50px";
            q3.style.left = "650px";
        }
        next2.onclick = function() {
            q2.style.left = "-650px";
            q3.style.left = "50px";
        }
    }
});

function uncheck() {
    var rad = document.getElementById('rd')
    rad.removeAttribute('checked')
}
document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('body')
    const toggleSwitch = document.querySelector('.slider')
    toggleSwitch.addEventListener('click', () => {
        main.classList.toggle('dark-theme')
    })
})