import * as constant from "./constant.js";
import { Cell } from "./search.js";

export function pathLog(search){
    function grayPreLog(){
        let para = document.getElementsByClassName("t1");
        
        for(let i = para.length-1 ; i > -1 && i > para.length - 10 ; i--){
            para[i].style.color = "gray";
        }
    }
    grayPreLog();
    const dataDisplay = document.getElementById("data-content");
    dataDisplay.appendChild(createElement('p','t1',search.mode));
    dataDisplay.appendChild(createElement('p','t1',"Total Searched: "+ search.data.total_searched));
    dataDisplay.appendChild(createElement('p','t1',"Toral Discovered: "+ search.data.total_discovered));
    dataDisplay.appendChild(createElement('p','t1',"Path Length: "+ search.data.path_length));
    scrollToBottom("data-content");
}
export function scrollToBottom(element_id) {
    let objDiv = document.getElementById(element_id);
    objDiv.scrollTop = objDiv.scrollHeight;
}

export function createElement(tag,cName, msg = null) {
    let p = document.createElement(tag);
    p.className = (cName);
    if (msg) {
        let textnode = document.createTextNode(msg);
        p.appendChild(textnode);
    }
    return p;
}



export function getLegalCellsArround(graph,curCell){
    //Block for getting neighbour cells for BFS.    
    let legal_cells = [];
    let t = [1,-1];
    const board = graph.board;
    const currRow = curCell.row -1;
    const currCol = curCell.col-1;
    const legal_color = [constant.UNVISITED, constant.TARGET];
    t.forEach((offset) => {
        //for same column with row + 1 and row - 1(up and down to the current cell);
        const newRow = currRow + offset;
        if(newRow >= 0 && newRow < board.length){
            const newCell = board[newRow][currCol];
            if(legal_color.includes(newCell.color)){
                legal_cells.push(newCell);
            } 
        } 
    });
    t.forEach((offset) => {
        //for same row with column + 1 and column - 1(right and left to the current cell);
        const newCol = currCol +offset;
        if(newCol >= 0 && newCol < board[0].length){
            const newCell = board[currRow][newCol];
            if(legal_color.includes(newCell.color)){
                legal_cells.push(newCell);
            }
        }
    });

    return legal_cells;
}
export function moveByDirection(graph,currNode){
    //Block for getting neighbour cells for DFS.
    const board = graph.board;
    const currRow = currNode.row-1;
    const currCol = currNode.col-1; 
    const legal_color = [constant.UNVISITED, constant.TARGET];
    switch(currNode.currMove){
        case 0:
            currNode.currMove++;
            if(currRow + 1 <board.length){
                var newCell = board[currRow + 1][currCol];
                if(legal_color.includes(newCell.color)){
                    return newCell;
                }        
            }
            return undefined;
        case 1:
            currNode.currMove++;
            if(currCol + 1 <board[0].length){
                var newCell = board[currRow][currCol + 1];
                if(legal_color.includes(newCell.color)){
                    
                    return newCell;
                }        
            }
            return undefined;
        case 2:
            currNode.currMove++;
            if(currRow - 1 > -1){
                var newCell = board[currRow - 1][currCol];
                if(legal_color.includes(newCell.color)){
                    return newCell;
                }        
            }
            return undefined;
        case 3:
            currNode.currMove++;
            if(currCol - 1 >-1){
                var newCell = board[currRow][currCol-1];
                if(legal_color.includes(newCell.color)){
                    return newCell;
                }        
            }
            return  undefined;
        default:
            node.update(color);
    }
}

export function cellDistance(cell1,cell2){
    return Math.abs(cell2.row -cell1.row)+Math.abs(cell2.col-cell1.col);
}

export function getCellsAround(graph, current_cell) {
    const tmp = [-1, 1];
    const board = graph.board;
    const curr_row = current_cell.row-1;
    const curr_col = current_cell.col-1;
    let cells = [];
    tmp.forEach((offset) => {
        const new_row = curr_row + offset;
        if (new_row >= 0 && new_row < board.length) {
            cells.push(board[new_row][curr_col]);
        }
    });
    tmp.forEach((offset) => {
        const new_col = curr_col + offset;
        if (new_col >= 0 && new_col < board[0].length) {
            cells.push(board[curr_row][new_col]);
        }
    });
    return cells;
}