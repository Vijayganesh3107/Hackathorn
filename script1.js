var container = document.createElement("div");
container.setAttribute("class", "container");
var body1 = document.createElement("div");
body1.setAttribute("class", "body");
var divhead = document.createElement("div");
divhead.setAttribute("class", "head-div");
var headp = document.createElement("p");
headp.setAttribute("class", "p-head");
var bold_1 = document.createElement("b");
bold_1.innerHTML = "Level - 1";
headp.appendChild(bold_1);
divhead.appendChild(headp);
container.appendChild(divhead);
var div1 = document.createElement("div");
var windiv = document.createElement("div");
windiv.setAttribute("class", "win");
var h2winorloose = document.createElement("h2");
h2winorloose.setAttribute("class", "winorlose");
windiv.appendChild(h2winorloose);
div1.appendChild(windiv);
var timerdiv = document.createElement("div");
timerdiv.setAttribute("class", "timer");
var span = document.createElement("span");
span.innerHTML = "Time Left:";
timerdiv.appendChild(span);
var timep = document.createElement("p");
timep.setAttribute("id", "time");
timerdiv.appendChild(timep);
div1.appendChild(timerdiv);
var divgame = document.createElement("div");
divgame.setAttribute("class", "game");
var tower1div = document.createElement("div");
tower1div.setAttribute("class", "tower");
tower1div.setAttribute("id", "t1");
var disk1div = document.createElement("div");
disk1div.setAttribute("class", "disk");
disk1div.setAttribute("id", "s1");
tower1div.appendChild(disk1div);
var disk2div = document.createElement("div");
disk2div.setAttribute("class", "disk");
disk2div.setAttribute("id", "s2");
tower1div.appendChild(disk2div);
var disk3div = document.createElement("div");
disk3div.setAttribute("class", "disk");
disk3div.setAttribute("id", "s3");
tower1div.appendChild(disk3div);
var bottomdiv = document.createElement("div");
bottomdiv.setAttribute("class", "bottom");
bottomdiv.setAttribute("id", "z1");
tower1div.appendChild(bottomdiv);
divgame.appendChild(tower1div);

var tower2div = document.createElement("div");
tower2div.setAttribute("class", "tower");
tower2div.setAttribute("id", "t2");

var bottomdiv1 = document.createElement("div");
bottomdiv1.setAttribute("class", "bottom");
bottomdiv1.setAttribute("id", "z2");
tower2div.appendChild(bottomdiv1);
divgame.appendChild(tower2div);

var tower3div = document.createElement("div");
tower3div.setAttribute("class", "tower");
tower3div.setAttribute("id", "t3");

var bottomdiv2 = document.createElement("div");
bottomdiv2.setAttribute("class", "bottom");
bottomdiv2.setAttribute("id", "z3");
tower3div.appendChild(bottomdiv2);
divgame.appendChild(tower3div);

div1.appendChild(divgame);

body1.appendChild(div1);
container.appendChild(body1);

var btndiv = document.createElement("div");
btndiv.setAttribute("class", "btn");
btndiv.setAttribute("id", "buttons");
container.appendChild(btndiv);
document.body.appendChild(container);

var disks, towers, draggedone;
var cnt = 0;

function init() {
  disks = document.getElementsByClassName("disk");
  towers = document.getElementsByClassName("tower");
  for (var i = 0; i < disks.length; i++) {
    disks[i].draggable = i == 0;
    disks[i].addEventListener("dragstart", dragstart);
  }
  for (var i = 0; i < towers.length; i++) {
    towers[i].addEventListener("dragover", dragover);
    towers[i].addEventListener("drop", drop);
    towers[i].addEventListener("dragenter", dragenter);
  }

  function timer(no, func) {
    var data = [];
    for (let i = no; i >= 1; i--) {
      data.push(i);
    }
    data.push("Time's Up");
    func(no, data);
  }

  function TimerLogic(no, data) {
    for (let i = 0; i < no + 1; i++) {
      var t = setTimeout((array) => {
        array = data;
        var winorloose = winorlost(towers, disks);
        if (winorloose === true) {
          let winorlose = document.querySelector(".winorlose");
          winorlose.innerHTML = "Won the game";
          winorlose.style.color = "green";
          winorlose.style.fontSize = "50px";
          var gamediv1 = document.querySelector(".game");
          gamediv1.style.display = "none";
          let timersuccess = document.getElementById("time");
          timersuccess.innerHTML = `Completed`;
          timersuccess.classList.add("blink_me");

          var btn1 = document.getElementById("buttons");
          // var span = document.createElement("span");

          var nextLevelbtn = document.createElement("button");
          nextLevelbtn.setAttribute("id", "nextLevelbtn");
          nextLevelbtn.innerHTML = "NextLevel";
          nextLevelbtn.style.display = "inline-block";
          nextLevelbtn.style.marginLeft = "10px";
          nextLevelbtn.addEventListener("click", () => {
            location.href = "index2.html";
          });
          btn1.append(nextLevelbtn);
          if (btn1.children.length > 3) {
            btn1.children[2 + cnt].style.display = "none";
            // btn1.childNodes[2 + cnt].removeChild(btn1.childNodes[2 + cnt]);
            cnt++;
          }
        } else {
          if (i != no)
            document.getElementById("time").innerHTML = array[i] + "sec";
          else {
            document.getElementById("time").innerHTML = array[i];
          }

          if (i >= 40) {
            var timer = document.getElementById("time");
            timer.style.color = "red";
            timer.classList = " blink_me";
            timer.style.animation.blink = "1s";
          }

          if (document.getElementById("time").innerHTML === "Time's Up") {
            winorloose = false;
            var gamediv = document.querySelector(".game");
            gamediv.style.display = "none";
            var winorlose = document.querySelector(".winorlose");
            winorlose.innerHTML = "Lost the Game";
            winorlose.style.color = "red";
            winorlose.classList.add("blink_me");
          }
        }
      }, 1000 * i);
    }
  }

  timer(60, TimerLogic);
}

function dragstart(ev) {
  ev.dataTransfer.setData("text", ev.currentTarget.id);
  draggedone = ev.currentTarget.id;
}

function dragenter(ev) {
  var tower = ev.currentTarget;
  var disk = draggedone;
  var disksOnTower = tower.getElementsByClassName("disk");
  if (disksOnTower.length == 0 || disksOnTower[0].id > disk) {
    tower.diskCanBeDroppedHere = true;
    ev.preventDefault();
    return;
  }
  tower.diskCanBeDroppedHere = false;
}

function dragover(ev) {
  if (ev.currentTarget.diskCanBeDroppedHere) ev.preventDefault();
}

function drop(ev) {
  var tower = ev.currentTarget;
  var disk = document.getElementById(ev.dataTransfer.getData("text"));
  ev.dataTransfer.dropEffect = "move";
  tower.insertBefore(disk, tower.firstChild);
  for (var i = 0; i < towers.length; i++) {
    var e = towers[i].getElementsByClassName("disk");
    if (e.length) e[0].draggable = true;
    for (var j = 1; j < e.length; j++) {
      e[j].draggable = false;
    }
  }
  ev.preventDefault();
}
var btn = document.querySelector(".btn");
var resetbtn = document.createElement("button");
resetbtn.setAttribute("id", "resetbtn");
resetbtn.innerHTML = "Reset";
resetbtn.style.color = "white";

resetbtn.addEventListener("click", () => {
  location.href = "index1.html";
});
resetbtn.style.backgroundColor = "red";
resetbtn.style.borderRadius = "5px";
btn.append(resetbtn);
var homebtn = document.createElement("button");
homebtn.setAttribute("class", "homebtn");
homebtn.innerHTML = "Home";
homebtn.style.color = "white";
homebtn.style.marginLeft = "10px";
homebtn.addEventListener("click", () => {
  location.href = "index.html";
});
var hoembutton = document.getElementById("buttons");
hoembutton.append(homebtn);

init();

function winorlost(towers) {
  var e = towers[2].getElementsByClassName("disk");
  if (e.length == 3) return true;
  else return false;
}
