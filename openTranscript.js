var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var delay = (ms) => new Promise(res => setTimeout(res, ms));

var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

function loadingElm() {
  var loaD = document.createElement("div");
  loaD.setAttribute("id", "loader-elm");
  document.body.appendChild(loaD);
  loaD.style.top = '26%';
  loaD.style.left = '40%';
  loaD.style.position = "fixed";
  loaD.style.zIndex = "10001";
  loaD.innerHTML = '<svg version="1.1" id="Layer_1" x="0px" y="0px"     width="400px" height="400px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;">    <rect x="0" y="10" width="4" height="0" fill="#333" opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y"values="10; 5; 10" begin="0s" dur="555ms" repeatCount="indefinite" />    </rect>    <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0.15s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0.15s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y" values="10; 5; 10" begin="0.15s" dur="555ms" repeatCount="indefinite" />    </rect>    <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">      <animate attributeName="opacity" values="0.2; 1; .2" begin="0.3s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="height" values="10; 20; 10" begin="0.3s" dur="555ms" repeatCount="indefinite" />      <animate attributeName="y" values="10; 5; 10" begin="0.3s" dur="555ms" repeatCount="indefinite" />    </rect>  </svg>';
}

function killLoader() {
  document.body.removeChild(document.getElementById("loader-elm"));
}

var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};


function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 133ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 133ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 133ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 133ms";
}

function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

async function openTranscript(){
  loadingElm();
  if(Array.from(tn(gi(document,'menu-container'),'button')).filter(el=> el.getAttribute('aria-label') == 'More actions').length){
    Array.from(tn(gi(document,'menu-container'),'button')).filter(el=> el.getAttribute('aria-label') == 'More actions')[0].click();
  }
  await delay(500);
  if(Array.from(cn(document,'style-scope ytd-menu-service-item-renderer')).filter(el=> el.innerText == 'Open transcript').length) {
    Array.from(cn(document,'style-scope ytd-menu-service-item-renderer')).filter(el=> el.innerText == 'Open transcript')[0].click();
  }
  await delay(1500);
  killLoader();
  getTranscripts();
}

function getTranscripts(){
  var text = cn(document,'cue-group style-scope ytd-transcript-body-renderer').length ? Array.from(cn(document,'cue-group style-scope ytd-transcript-body-renderer')).map(el=> cn(el,'cue style-scope ytd-transcript-body-renderer')[0].innerText).reduce((a,b)=> a+ '\n'+b) : 'no transcripts. sorry. \n ¯\\_(ツ)_/¯';

  if (gi(document, 'transcript_viewer_pop')) gi(document, 'transcript_viewer_pop').outerHTML = '';
  var cont = ele('div');
  attr(cont, 'id', 'transcript_viewer_pop');
  attr(cont, 'style', `position: fixed; top: 10px; left: 60px; width: 536px; z-index: ${new Date().getTime()}; font-size: 16px; font-family: "Georgia", Sarif;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'style', `display: grid; grid-template-columns: 500px 34px; grid-gap: 2px%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var slab = ele('div');
  attr(slab, 'style', `grid-area: 1 / 1; color: #fff; padding: 6px; border-radius: 0.4em; text-align: center; transform: translate(0px, 3px)`);
  slab.innerText = 'Transcripts';
  head.appendChild(slab);

  var cls = ele('div');
  attr(cls, 'style', `grid-area: 1 / 2; width: 44px; height: 44px; cursor: pointer;`);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => {
    cont.outerHTML = '';
  };
  var cbod = ele('div');
  attr(cbod, 'style', `border-bottom-left-radius: 0.4em; border-bottom-left-radius: 0.4em; height: 500px;`);
  cont.appendChild(cbod);

  var textbox_1 = document.createElement("textarea");
  textbox_1.setAttribute("id", "textbox_code");
  textbox_1.setAttribute("placeholder", "copy/paste skills list here");
  cbod.appendChild(textbox_1);
  textbox_1.style.width = "97%";
  textbox_1.style.height = "100%";
  textbox_1.style.padding = "6px";
  textbox_1.style.border = "1px solid #293242";
  textbox_1.style.color = "#2b3442";
  textbox_1.style.borderBottomLeftRadius = ".3em";
  textbox_1.style.borderBottomRightRadius = ".3em";
  textbox_1.value = text;
}

openTranscript()
