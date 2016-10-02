import Pong from './Pong/Pong';

var canvas = <HTMLCanvasElement>document.getElementById("main");
var ctx = canvas.getContext("2d");

var pong = new Pong(window, canvas, ctx);
 