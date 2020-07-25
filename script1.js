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
          winorlose.style.fontSize = "30px";
          var gamediv1 = document.querySelector(".game");
          gamediv1.style.display = "none";
          let timersuccess = document.getElementById("time");
          timersuccess.innerHTML = `Completed`;

          var btn1 = document.getElementById("buttons");

          var nextLevelbtn = document.createElement("a");
          nextLevelbtn.setAttribute("id", "nextLevelbtn");
          nextLevelbtn.innerHTML = "NextLevel";
          nextLevelbtn.href = "index2.html";
          btn1.appendChild(nextLevelbtn);
          if (btn1.children.length > 2) {
            btn1.children[2 + cnt].style.display = "none";
            cnt++;
          }
          //   clearTimeout(t);
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

  timer(60, TimerLogic);
}

function dragstart(ev) {
  // write Diks-ID into dataTransfer Object
  ev.dataTransfer.setData("text", ev.currentTarget.id);
  // since dataTransfer is protected in dragenter we have to have a variable
  draggedone = ev.currentTarget.id;
}

function dragenter(ev) {
  // get tower that has been entered by drag and get disk-ID
  var tower = ev.currentTarget;
  var disk = draggedone;
  // get disks that are already on tower
  var disksOnTower = tower.getElementsByClassName("disk");
  if (disksOnTower.length == 0 || disksOnTower[0].id > disk) {
    // here if no disks yet on tower or the top disk is bigger than the dragged disk
    tower.diskCanBeDroppedHere = true; // we have to remember it for dragover
    ev.preventDefault(); // yes please!
    return;
  }
  tower.diskCanBeDroppedHere = false; // sorry no drop allowed here
}

function dragover(ev) {
  if (ev.currentTarget.diskCanBeDroppedHere) ev.preventDefault(); // if we may drop here ...
}

function drop(ev) {
  // find disk and tower involved
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
resetbtn.href = "index1.html";
resetbtn.style.backgroundColor = "red";
resetbtn.style.textDecoration = "none";
resetbtn.style.borderRadius = "5px";
btn.appendChild(resetbtn);
// var towr1 = document.getElementsByClassName("tower");
// console.log(towr1);

// if (winorlost(towr1) === true) {
//   var btn1 = document.querySelector(".btn");
//   var nextLevelbtn = document.createElement("a");
//   nextLevelbtn.setAttribute("class", "nextLevelbtn");
//   nextLevelbtn.innerHTML = "NextLevel";
//   nextLevelbtn.href = "index1.html";
//   btn1.appendChild(nextLevelbtn);
//   nextLevelbtn.style.display = "none";
// }

init();

function winorlost(towers) {
  var e = towers[2].getElementsByClassName("disk");
  if (e.length == 3) return true;
  else return false;
}
