'use strict';

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var pdfSize = 0.48;
var cvStyle = "flex";

if(w < h) {
  console.log("This is not widescreen dummy!");
  document.getElementsByClassName("first-crock")[0].className = "crocked";
  document.getElementsByClassName("sec-crock")[0].className = "crocked";
  cvStyle = "inline";
  pdfSize = 0.98;
}

PDFJS.getDocument('node_modules/CV/CV.pdf').then(function(pdf) {

  pdf.getPage(1).then(function(page) {

    var desiredWidth = w*pdfSize;
    var viewport = page.getViewport(1);
    var scale = desiredWidth / viewport.width;
    var viewport = page.getViewport(scale);

    var canvas = document.getElementById('first-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    document.getElementsByClassName("cv")[0].style.display=cvStyle;
    page.render(renderContext);
  });

  pdf.getPage(2).then(function(page) {

    var desiredWidth = w*pdfSize;
    var viewport = page.getViewport(1);
    var scale = desiredWidth / viewport.width;
    var viewport = page.getViewport(scale);

    var canvas = document.getElementById('sec-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    document.getElementsByClassName("cv")[0].style.display=cvStyle;
    page.render(renderContext);
  });

});

window.addEventListener("resize", function() {
  console.log("There has been a resize dummy!");
  if(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) != w)
    //Because canvas and pdf.js fails in chrome on resize.
    location.reload();

});
