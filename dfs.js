import * as constant from './constant.js';
import * as DSA from './dataStructure.js';
import Graph from './graph.js';
import * as helper from "./helper.js";

export class DFS{
	constructor(data){
		this.data = data;
		this.graph = data.graph;
		this.currNode = data.graph.source;
		this.currNode.currMove = 0;
		this.queue= new DSA.Queue();
		this.queue.enqueue(this.currNode);
		this.pathCompleted = false;

	}
	step(){
		//console.log("step in DFS");

		if(!this.graph.target.found){
			let nextNode = this.findNextNode();			
			//finding next node.
			if(nextNode === undefined) return true;
			if(nextNode.Moves === undefined)nextNode.currMove = 0;
			if(nextNode === this.graph.target){
				nextNode.parent = this.currNode;
				nextNode.distance= this.currNode.distance + 1;
				nextNode.div.innerText = nextNode.distance;
				this.currNode =nextNode;
				this.graph.target.found = true;
			}else{
				if(nextNode.color === constant.UNVISITED)nextNode.update(constant.DISCOVERED);
				this.data.total_discovered++;
				nextNode.parent = this.currNode;
				nextNode.distance = this.currNode.distance + 1;
				nextNode.div.innerText = nextNode.distance;	
				if(this.currNode !== this.graph.source)this.currNode.update(constant.EXPLORED);
				this.currNode = nextNode;
				this.data.total_searched++;
			}
		}else{
			if(this.graph.target.found === true){
				if(this.currNode.parent !== null){
					this.data.path_length++;
					this.currNode = this.currNode.parent;

				}	
				if(this.currNode !== this.graph.source)this.currNode.update(constant.PATH);
				else{
					this.pathCompleted = true;
					return true;
				}
			}else{
				//return true;
			}
		}
		return false;
	}
	findNextNode(){
		let nextNode = undefined;
		while(!nextNode){
			while(this.currNode.currMove < 4 && nextNode === undefined){
				nextNode = helper.moveByDirection(this.graph,this.currNode);
			}
			if(this.currNode.currMove ===4 && nextNode === undefined){
				if(this.currNode.parent === undefined){
					return undefined;
				}
				this.currNode = this.currNode.parent;
			}
		}
		return nextNode;
	}
};