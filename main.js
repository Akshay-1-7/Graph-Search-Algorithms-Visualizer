import * as constant from './constant.js';
import Graph from './graph.js';
import Search,{Cell} from './search.js';
import * as helper from "./helper.js";

start();

function start(rowSize = 25,colSize = 25){
let graph,mouse_is_down,search,requestID;
let game_active = false;
let game_animation = false;
// let rowSize = 25;
// let colSize = 25;

let fps = 50;
let intervel = 1000/fps;
let last = 0;


setup();
initialize();

function setup(){
	let game_active = false;
	let game_animation = false;
	var board = document.getElementById("board");
	graph = new Graph();
	for(let i = 1; i<= rowSize ;i++){
		let row = document.createElement("div");
		row.id = ("row_" + i);
		row.className = "rows";
		let rowGraph = [];
		for(let j = 1; j<= colSize ;j++){
			let col = document.createElement("div");
			col.id = ("col_" + (((i-1)*colSize)+j));
			col.className = "cols";
			col.setAttribute('data-row', (i-1).toString());
			col.setAttribute('data-col', (j-1).toString());
			
			mclick(col);

			row.appendChild(col);
			rowGraph.push(new Cell(col,i,j));
		}
		board.appendChild(row);
		graph.board.push(rowGraph);		
	}
}
function initialize(){
	document.getElementById("apply-button").onclick = function(){
		setUpBoard();
	}
	document.getElementById("make-maze").onclick = function(){
		makeMaze();
	}
	document.getElementById("mid_panel").onmousedown = function(){
		mouse_is_down = true;
		return false;
	}
	document.getElementById("mid_panel").onmouseup = function(){
		mouse_is_down = false;
		return false;
	}
	document.getElementById("clear-button").onclick = function(){
		console.log("clear");
		graph.clearBoard();
	
		game_active = false;
		game_animation = false;
		
		document.getElementById("step-button").style.display ='none';
		document.getElementById("animation-button").style.display ='none';
		document.getElementById("animation-button").innerText ='Animation';
		document.getElementById("start-button").style.display ='inline-block';
	};
	document.getElementById("start-button").onclick = function(){
		if(graph.source == null || graph.target == null) alert("Please set Source and Target");
	
		graph.clearMinorCells();
		graph.target.found = false;
		var selectAlgo = document.querySelector("input[name = 'radio_algo']:checked").value;
		search = new Search(graph,selectAlgo);
	
		document.getElementById("start-button").style.display = 'none';
		document.getElementById("step-button").style.display ='inline-block';
		document.getElementById("animation-button").style.display ='inline-block';
		graph.source.distance = 0;
		graph.source.div.innerText = graph.source.distance;
		requestID = requestAnimationFrame(draw);
	
	};
	document.getElementById("step-button").onclick = function(){
		game_active = true;
	};
	document.getElementById("animation-button").onclick = function(event){
		if(game_animation){
			event.target.innerText = 'Resume';
			document.getElementById("step-button").style.display ='inline-block';
			game_animation = false;
		}else{
			event.target.innerText = 'Pause';
			document.getElementById("step-button").style.display ='none';
			game_animation = true;
			game_active = true;	
		}
	};
	
	
}
function makeMaze(){
	let NoOfWall = prompt('Enter randomness(0-100)', '20');
	NoOfWall = parseInt(NoOfWall);
	if(!NoOfWall) {
		alert('Invalid Input, please input a number between 0 and 100');
		return;
	}
	graph.board.forEach((row) => {
		row.forEach((col) => {
			  if (col !== graph.source && col !== graph.target) {
				col.clear();
				if (Math.random() < NoOfWall / 100.0) {
					  col.update(constant.WALL);
				}
			  }
		});
	});
}


function mclick(col){
	col.onclick = function(event){
		selectNode(event);
	};
	col.onmouseover = function(event){
		if(mouse_is_down)selectNode(event);
	};
}
function setUpBoard(){
	let tRow =document.getElementById("row_size").value;
		let tCol =document.getElementById("col_size").value;
		if(tRow == '' ||tCol == ''){
			alert("Enter Valid row and column size");
			return;
		}
		else if(tRow > 40 ||tCol >40){
			alert("row and column should be less than 41");
			return;	
		}else{
			let rSize = tRow;
			let cSize = tCol;
			
			
			graph.board.forEach((row)=>{
				row.forEach((cell)=>{
					//cell.div.innerHTML = "h";
					cell.div.remove();
				});
			});
			
			start(rSize,cSize)
			document.getElementById("row_size").value = '';
			document.getElementById("col_size").value = '';

		}	
}


function selectNode(event){
	//var node = document.getElementById(element);
	var select_mode = document.querySelector('input[name="radio_type"]:checked').value;
	const target = event.target;
	const row = target.getAttribute('data-row');
	const col = target.getAttribute('data-col');
	const cell = graph.board[row][col];	
	let colorToSet;
	switch(select_mode){
		case "wall":
			colorToSet = constant.WALL;
			break;
		case "source":
			colorToSet = constant.SOURCE;
			break;
		case "target":
			colorToSet = constant.TARGET;
			break;
		default:
	}
	graph.update(cell,colorToSet);
}
function draw(timeStamp){
	//console.log("hi");
	if(game_active){
		if(game_animation && fps > 90){
			move();
		}else{
			if(timeStamp > last){
				move()
				last = timeStamp - intervel;
			}
		}
	}
	requestID = requestAnimationFrame(draw);

	function move(){
		let ret =  search.step();
		
		if(ret){
			game_active = false;
			game_animation = false;
			
			document.getElementById("step-button").style.display ='none';
			document.getElementById("animation-button").style.display ='none';
			document.getElementById("animation-button").innerText ='Animation';
			document.getElementById("start-button").style.display ='inline-block';
			cancelAnimationFrame(requestID);
			if(!graph.target.found){
				alert("Target Cannot Be Reached");
			}
			helper.pathLog(search);
		}
		if(!game_animation){
			game_active = false;
		}
	}
}
}







