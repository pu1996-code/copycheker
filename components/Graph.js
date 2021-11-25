import React, { Component } from "react";
import pdf from './docs.pdf';
import "../App.css";
// import pdfjsLib from "pdfjs-dist/build/pdf";
// import  pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry.js";
class Graph extends React.Component {
  constructor() {
    super();
    this.state = {
      currPage: 1,
      numPages:0,
      thePDF:null
    };
  }
componentDidMount(){
  this.pdfjsLib.getDocument(pdf).promise.then((doc) => {
			console.log('page' + doc._pdfInfo.numPages);
  });
  // const script = document.createElement("script");

  // script.src = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.7.570/build/pdf.min.js";
  // script.async = true;
// console.log(pdfjsWorker);
  // document.body.appendChild(script);
  // pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  // var url = './docs.pdf';

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  // var pdfjsLib = window['pdfjs-dist/build/pdf'];

  // The workerSrc property shall be specified.
  // pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.entry';

  

  //This is where you start
  // pdfjsLib.getDocument(url).then( (pdf)=> {

  //   //Set PDFJS global object (so we can easily access in our page functions
  //   this.setState({thePDF:pdf});
    
  //   //How many pages it has
  //   this.setState({numPages:pdf.numPages});

  //   //Start with first page
  //   pdf.getPage(1).then(this.handlePages);
  // }); 
}

handlePages=(page)=> {
  //This gives us the page's dimensions at full scale
  var viewport = page.getViewport({ scale: 1 });

  //We'll create a canvas for each page to draw it on
  var canvas = React.createElement("canvas");
  canvas.style.display = "block";
  canvas.style.border= "1px solid black";
      
  var context = canvas.getContext('2d');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  //Draw it on the canvas
  page.render({ canvasContext: context, viewport: viewport });

  //Add it to the web page
  var div =this.useRef('pdf-viewer');
  div.appendChild(canvas);

  // var line = document.createElement("hr");
  // document.body.appendChild(line);

  //Move to next page
  this.setState({currPage:this.state.currPage+1});
  if (this.state.thePDF !== null && this.state.currPage <= this.state.numPages) {
    this.state.thePDF.getPage(this.state.currPage).then(this.handlePages);
  }
}

  draw = (ev) => {
    // get reference to canvas and save canvas offsets
    const canvas = this.refs.canvas;    
    var offsetX = canvas.offsetLeft;
    var offsetY = canvas.offsetTop;

    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    function PrimitiveBrush(context) {
      if (!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("No 2D rendering context given!");
      }
      this.ctx = context;
      this.strokes = [];
      this.strokeIndex = 0;
      // this.workingStrokes;
      this.lastLength = 0;
      this.isTouching = false;
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = "3";
      this.ctx.lineCap = this.ctx.lineJoin = "round";
    }
    PrimitiveBrush.prototype.start = function (event) {
      var x = event.clientX - offsetX;
      var y = event.clientY - offsetY;
      this.workingStrokes = [
        {
          x: x,
          y: y,
        },
      ];
      this.strokes.push(this.workingStrokes);
      this.lastLength = 1;
      this.isTouching = true;
      requestAnimationFrame(this._draw.bind(this));
    };

   
    PrimitiveBrush.prototype.move = function (event) {
      if (!this.isTouching) {
        return;
      }
      var x = event.clientX - offsetX;
      var y = event.clientY - offsetY;
      this.workingStrokes.push({
        x: x,
        y: y,
      });
      requestAnimationFrame(this._draw.bind(this));
    };
    PrimitiveBrush.prototype.end = function (event, foo) {
      this.move(event);
      this.isTouching = false;
    };

    PrimitiveBrush.prototype._draw = function () {
      // save the current length quickly (it's dynamic)
      var length = this.workingStrokes.length;

      // return if there's no work to do
      if (length <= this.lastLength) {
        return;
      }

      var startIndex = this.lastLength - 1;

      this.lastLength = length;

      var pt0 = this.workingStrokes[startIndex];

      this.ctx.beginPath();

      this.ctx.moveTo(pt0.x, pt0.y);

      for (var j = startIndex; j < this.lastLength; j++) {
        var pt = this.workingStrokes[j];

        this.ctx.lineTo(pt.x, pt.y);
      }

      this.ctx.stroke();
    };

    // Set up brush to listen to events
    var brush = new PrimitiveBrush(canvas.getContext("2d"));

    canvas.addEventListener("mousedown", brush.start.bind(brush));
    canvas.addEventListener("mousemove", brush.move.bind(brush));
    canvas.addEventListener("mouseup", brush.end.bind(brush));
  };
  render() {
    return (
      <div className="mt-4">
        <h1>Draw something</h1>
        {/* <canvas className="m-3" ref="canvas" width={640} height={450} /> */}
        <div ref='pdf-viewer'></div>
        {/* <img src={img}  ref='image' className=' hidden'/> */}
        {/* <button onClick={this.draw} className="btn btn-danger"> */}
          {/* Draw
        </button> */}
      </div>
    );
  }
}
export default Graph;
