import "./a.css";
import html from "./test.html";
import image from "./a.jpg";

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const div = document.createElement("div");
div.innerHTML = html;
document.body.append(div);

const img = document.createElement("img");
img.className = "img";
img.src = image;
document.body.append(img);