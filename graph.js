import * as constant from './constant.js';

export default class Graph{
	constructor(){
		this.board = [];
		this.source = null;
		this.target = null;
	}

	update(cell,color){
		switch(color){
			case constant.SOURCE:
				if(this.source){
					this.source.update(constant.UNVISITED);
				}
				this.source = cell;
				this.source.update(constant.SOURCE);
				
				break;
			case constant.TARGET:
				if(this.target){
					this.target.update(constant.UNVISITED);
				}
				this.target = cell;
				this.target.update(constant.TARGET);
				break;
			default:
				if(cell.color == constant.WALL){
					cell.update(constant.UNVISITED)	
				}else{
					cell.update(color);
				}		
		}
	}

	clearBoard(){	
		this.source = null;
		this.target = null;
		this.board.forEach(function(row){
			row.forEach(function(col){
				col.clear();
			});
		});
	}

	clearMinorCells(){
		const source = this.source;
		const target = this.target;
		this.board.forEach(function(row){
			row.forEach(function(cell){
				if(cell != source && cell != target && cell.color != constant.WALL){
					cell.clear();
				}
			});
		});
		source.div.innerText = '';
		target.div.innerText = '';
	}
	initializeA_StarCost(Value = Infinity){
		this.board.forEach((row)=>{
			row.forEach((col)=>{
				col.g_val = Value;
				col.cost = Value;
				col.parent = null;
			});
		});
	}
}