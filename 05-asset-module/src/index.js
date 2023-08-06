// 加载js代码
import helloworld from "./helloworld";
helloworld();

// 加载asset/resource
import imgSrc1 from "./assets/test.jpg";
const img1 = document.createElement("img");
img1.src = imgSrc1;
document.body.appendChild(img1);

// 加载asset/inline
import svgSrc from "./assets/checked.svg";
const img2 = document.createElement("img");
img2.style.cssText = "width: 100px; height: 100px";
img2.src = svgSrc;
document.body.appendChild(img2);

// 加载asset/source
import exampleTxt from "./assets/example.txt";
const block = document.createElement("div");
block.style.cssText = "width: 200px; height: 200px; background: aliceblue";
block.innerHTML = exampleTxt;
document.body.appendChild(block);

// 加载asset
import MiPng from "./assets/mi.png";
const img3 = document.createElement("img");
img3.style.cssText = "width: 200px; height: 200px;";
img3.src = MiPng;
document.body.appendChild(img3);