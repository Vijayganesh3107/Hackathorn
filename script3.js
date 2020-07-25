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
          winorlose.innerHTML = "Sucessfully Completed All the Levels";
          winorlose.style.color = "green";
          winorlose.style.fontSize = "30px";
          var gamediv1 = document.querySelector(".game");
          gamediv1.style.display = "none";
          let timersuccess = document.getElementById("time");
          timersuccess.innerHTML = `Completed`;
          timersuccess.style.color = "green";

          var btn1 = document.getElementById("buttons");

          var nextLevelbtn = document.createElement("a");
          nextLevelbtn.setAttribute("id", "nextLevelbtn");

          nextLevelbtn.href = "index3.html";
          btn1.appendChild(nextLevelbtn);

          //   clearTimeout(t);
        } else {
          if (i != no)
            document.getElementById("time").innerHTML = array[i] + "sec";
          else {
            document.getElementById("time").innerHTML = array[i];
          }

          if (i >= 180) {
            var timer = document.getElementById("time");
            timer.style.color = "red";
            timer.classList = " blink_me";
            timer.style.animation.blink = "1s";
          }

          if (document.getElementById("time").innerHTML === "Time's Up") {
            //   var btn = document.querySelector(".btn");
            //   var solve_btn = document.createElement("button");
            //   solve_btn.innerHTML = "Solve";
            //   btn.appendChild(solve_btn);
            var gamediv = document.querySelector(".game");
            gamediv.style.display = "none";
            var winorlose = document.querySelector(".winorlose");
            winorlose.innerHTML = "Lost the Game";
            winorlose.style.color = "red";
            winorlose.classList.add("blink_me");
          }
        }
      }, 1000 * i);
      //   if (winorlost(towers, disks) === true) clearTimeout(t);
    }
  }

  timer(200, TimerLogic);
}

function dragstart(ev) {
  ev.dataTransfer.setData("text", ev.currentTarget.id);
  draggedone = ev.currentTarget.id;
}

function dragenter(ev) {
  var tower = ev.currentTarget;
  var disk = draggedone;
  // get disks that are already on tower
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
var resetbtn = document.createElement("a");
resetbtn.setAttribute("id", "resetbtn");
resetbtn.innerHTML = "Reset";
btn.style.width = "10px";
resetbtn.href = "index3.html";
resetbtn.style.backgroundColor = "red";
resetbtn.style.textDecoration = "none";
resetbtn.style.borderRadius = "5px";
btn.appendChild(resetbtn);
init();

function winorlost(towers) {
  var e = towers[2].getElementsByClassName("disk");
  if (e.length == 5) return true;
  else return false;
}
