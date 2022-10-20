import * as constant from './constant.js';
import * as DSA from './dataStructure.js';
import Graph from './graph.js';
import * as helper from "./helper.js";

export class AStar{
	
	constructor(data){
		this.data = data;
		this.graph = data.graph;
		this.minHeap =new DSA.MinHeap();
		this.minHeap.insert(this.graph.source);
		this.heuristic = helper.cellDistance;
		this.graph.initializeA_StarCost();
		this.graph.source.g_val = 0;
		this.graph.source.cost = this.heuristic(this.graph.source,this.graph.target);
		this.currNode = this.graph.source;
		this.discoveredList = [];
		this.exploredList = [];

		//console.log(this.graph.source.cost);
		// console.log(this.graph.source);
		// console.log(this.graph.target);
	}
	step(){
		if(!this.graph.target.found && !this.minHeap.isEmpty()){
			this.currNode = this.minHeap.extractMin();
			//console.log("currNode",this.currNode);
			if(!this.exploredList.includes(this.currNode) &&
				this.currNode !== this.graph.source &&
				this.currNode !== this.graph.target){
					this.exploredList.push(this.currNode);
				}
			if(this.currNode === this.graph.target){
				this.graph.target.found = true;
				this.minHeap.makeEmpty();
 			}else{
				const cellsArround = helper.getCellsAround(this.graph,this.currNode);
				//console.log(cellsArround);
				cellsArround.forEach((neighbour)=>{
					if(neighbour.parent !== this.currNode && this.currNode.parent !== neighbour && neighbour.color !== constant.WALL){
						if(!this.discoveredList.includes(neighbour) && neighbour !==this.graph.target){
							this.discoveredList.push(neighbour);
						}
						let tentative_g_val = this.currNode.g_val + 1;
						if(tentative_g_val < neighbour.g_val){
							neighbour.g_val = tentative_g_val;
							neighbour.cost = neighbour.g_val + this.heuristic(neighbour,this.graph.target);
							neighbour.parent = this.currNode;
							if(!this.minHeap.includes(neighbour)){
								this.minHeap.insert(neighbour);
							}
						}
					}
				});	
			}
			this.colorPath();
		}//end if step()
		else{
			this.data.total_discovered = this.discoveredList.length + 2;
			this.data.total_searched = this.exploredList.length + 2;
			this.graph.target.div.innerText =this.data.path_length;
			return true;
		}
		return false;
	}//end of step() of A*
	colorPath(){
		this.data.path_length = 1;
		this.discoveredList.forEach((cell)=>{
			if(cell !== this.graph.source && cell !== this.graph.target){
				cell.update(constant.DISCOVERED);
			}
		});
		let currCell = this.currNode;
		while(currCell !== this.graph.source){
			if(currCell !== this.graph.target){
				currCell.update(constant.PATH);
				this.data.path_length++;
			}
			currCell = currCell.parent;
		}
		this.exploredList.forEach((cell)=>{
			if(cell.color !== constant.PATH){
				cell.update(constant.EXPLORED);
				cell.div.innerText = '';
			}
		});
		currCell = this.currNode;
		let count = this.graph.target.found ? 0 : 1;
		while(currCell !== this.graph.source){
			currCell.div.innerText = this.data.path_length - count;
			count++;
			currCell = currCell.parent;
		}
	}
		
};