import * as constant from './constant.js';
import * as DSA from './dataStructure.js';
import Graph from './graph.js';
import * as helper from "./helper.js";
import * as bfs from "./bfs.js";
import * as dfs from "./dfs.js";
import * as aStar from "./aStar.js";


export default class Search{
	//this class will simply take "graph"(with source, target and walls) and will call search algorithm as per selected in "mode"
	constructor(graph,mode){
		this.mode = mode;
		
		switch(mode){
			case 'BFS':
				this.data = {
					graph : graph,
					total_searched : 0,
					total_discovered : 1,
					path_length:0
				};
				this.search_algo = new bfs.BFS(this.data);
				break;
			case 'DFS':
				this.data = {
					
					graph : graph,
					total_searched : 0,
					total_discovered : 1,
					path_length:0
				};
				this.search_algo = new dfs.DFS(this.data);
				break;
				case 'A Star':
					this.data = {
						
						graph : graph,
						total_searched : 0,
						total_discovered : 1,
						path_length:0
					};
					this.search_algo = new aStar.AStar(this.data);
					break;	
			default:
		}
	}
	step(){
		return this.search_algo.step();
	}
}

export class Cell{
	constructor(div,row,col){
		this.row = row;
		this.col = col;
		this.div = div;
		this.wall = false;
		this.color = constant.UNVISITED;
		this.cost = 0; 

	}
	update(color){
	 	this.color = color;
		this.div.style.backgroundColor = this.color;
		if(this.color === constant.UNVISITED){
			this.div.innerText = '';
		}
	}
	clear(){
		this.color = constant.UNVISITED;
		this.div.style.backgroundColor = this.color;
		this.div.innerText = '';
		
	}
}
Cell.prototype.valueOf = function () {
	return this.cost;
};