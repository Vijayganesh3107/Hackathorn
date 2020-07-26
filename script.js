var container = document.createElement("div");
container.setAttribute("class", "container");
var h1 = document.createElement("h1");
h1.innerHTML = "TOWER OF HANOI";
container.appendChild(h1);

var imgcontainer = document.createElement("div");
imgcontainer.setAttribute("class", "img-container");
var img = document.createElement("img");
img.src = "./Images/Tower_of_Hanoi.gif";
imgcontainer.appendChild(img);
container.appendChild(imgcontainer);

var h2 = document.createElement("h2");
h2.innerHTML = "Rules";
container.appendChild(h2);

var ul = document.createElement("ul");
var li1 = document.createElement("li");
li1.innerHTML = "Use drag'n drop to move the disks from pile 1 to pile 3";
ul.appendChild(li1);
var li2 = document.createElement("li");
li2.innerHTML = "You drag the disks one by one";
ul.appendChild(li2);
var li3 = document.createElement("li");
li3.innerHTML =
  "You are not allowed to put a bigger disk on top of a smaller one.";
ul.appendChild(li3);
var b = document.createElement("b");
b.innerHTML = "60 Seconds";
b.style.color = "black";
var li4 = document.createElement("li");
li4.innerHTML = "In order to win the Level1 you need to solve the problem in ";
li4.appendChild(b);
ul.appendChild(li4);
var b1 = document.createElement("b");
b1.innerHTML = "90 Seconds";
b1.style.color = "black";
var li5 = document.createElement("li");
li5.innerHTML = "In order to win the Level2 you need to solve the problem in ";
li5.appendChild(b1);

ul.appendChild(li5);

var b2 = document.createElement("b");
b2.innerHTML = "120 Seconds";
b2.style.color = "black";
var li6 = document.createElement("li");
li6.innerHTML = "In order to win the Level2 you need to solve the problem in ";
li6.appendChild(b2);
ul.appendChild(li6);

container.appendChild(ul);
document.body.appendChild(container);

var btn_level1 = document.createElement("button");
btn_level1.setAttribute("id", "level1");
btn_level1.innerHTML = "Play Level 1";
btn_level1.addEventListener("click", () => {
  location.href = "index1.html";
});
document.body.appendChild(btn_level1);
var btn_level2 = document.createElement("button");
btn_level2.setAttribute("id", "level2");
btn_level2.addEventListener("click", () => {
  location.href = "index2.html";
});
btn_level2.innerHTML = "Play Level 2";
document.body.appendChild(btn_level2);
var btn_level3 = document.createElement("button");
btn_level3.setAttribute("id", "level3");
btn_level3.innerHTML = "Play Level 3";
btn_level3.addEventListener("click", () => {
  location.href = "index3.html";
});
document.body.appendChild(btn_level3);
