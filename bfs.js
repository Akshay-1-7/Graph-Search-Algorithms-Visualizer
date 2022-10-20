import * as constant from './constant.js';
import * as DSA from './dataStructure.js';
import Graph from './graph.js';
import * as helper from "./helper.js";


export class BFS{
	constructor(data){
		this.data = data;
		this.graph = data.graph;
		this.queue = new DSA.Queue();
		this.currNode = this.graph.source;
		this.queue.enqueue(this.currNode);
		
	}
	step(){
		//console.log("step in BFS");
		if(!this.queue.isEmpty()){
			const distance_to_stop =this.currNode.distance + 1;
			while(!this.queue.isEmpty()){
				this.currNode = this.queue.dequeue();
				if(this.currNode.distance === distance_to_stop){
				 	this.queue.enqueueHead(this.currNode);
				 	break;
				}
				if(this.currNode === this.graph.target){
					this.queue.clear();
					this.graph.target.found = true;
					
				}else{
					const legal_cells = helper.getLegalCellsArround(this.graph,this.currNode);	
					legal_cells.forEach((newCell) => {
						if(newCell.color === constant.UNVISITED){
							newCell.update(constant.DISCOVERED);
						}
						this.queue.enqueue(newCell);
						this.data.total_discovered++;
						newCell.parent = this.currNode;
						newCell.distance = this.currNode.distance +1;
						newCell.div.innerText = newCell.distance;
					});
					if(this.currNode !== this.graph.source){
						this.currNode.update(constant.EXPLORED);
					}
				}
				this.data.total_searched++;
			} 	
		}else{
			//backtrack
			if(this.graph.target.found === true){
				
				if(this.currNode.parent != null){
					this.data.path_length++;
					this.currNode = this.currNode.parent;
					
				}
				if(this.currNode !== this.graph.source){
					this.currNode.update(constant.PATH);
						
				}else{
					this.pathCompleted = true;
					return true;
					
				}
			}else{
				return true;
			}
		}
		return false;
	}
};