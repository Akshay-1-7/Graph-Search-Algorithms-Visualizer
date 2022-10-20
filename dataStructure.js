export class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
export class Queue{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    enqueue(val){
        let node = new Node(val);
        if(this.head == null){
            this.head = node;
            this.tail = node;
        }else{
            this.tail.next = node;
            this.tail = node;
        } 
    }
    enqueueHead(element) {
        let node = new Node(element);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }
    dequeue(){
        if(this.head !== null){
            let currNode = this.head;
            this.head = this.head.next;
            return currNode.val;
        }else{
            return null;    
        }
    }
    isEmpty(){
        return this.head == null;
    }
    clear(){
        this.head = null;
        this.tail = null;
    }
}

export class MinHeap{
    //Making MinHeap Data Structure 
    
    constructor(){
        this.data = [];
    }
    checkIndex(ind){
        //checking if index is present in array or not.
        if(ind >= this.data.length || ind < 0){
            return false;
        }else{
            return true;
        }
    }
    getParentInd(ind){
        //getting parent index of element at ind.
        return this.checkIndex() ? Math.floor((ind-1)/2) : null ;
    }
    getLeftChildInd(ind){
        //getting index of left child i.e. (2*(index+1))   
        return this.checkIndex() ? 2 * ind + 1: null;
    }
    getRighrChildInd(ind){
        //getting index of right child i.e. (2*((index+1)+1))   
        return this.checkIndex() ? 2 * ind + 2: null;
    }
    swap(ind1,ind2){
        //Swappin elements of respective indexes.
        if(this.checkIndex(ind1) && this.checkIndex(ind2)){
            let t = this.data[ind1];
            this.data[ind1] = this.data[ind2];
            this.data[ind2] = t;
        }
    }
    getMin(){
        //Getting minimum in heap.
        //In Min Heap, smallest element is always at 0 th position of array so this will return this.data[0]
        //console.log(this.data[0].cost)
        return this.data.length > 0 ? this.data[0] : null;
    }
    extractMin(){
        //extracting min from Heap.
        let min = this.getMin();
        if(!min) return null;
        else if(this.data.length == 1) return this.data.pop();
        else{
            this.data[0] = this.data[this.data.length-1];
            this.data.pop();
            this.minHeapify(0);
            return min;
        } 
    }
    minHeapify(ind){
        //This block will heapify data array.
        if(!this.isLeaf(ind)){
            const leftChild = this.getLeftChildInd(ind);
            const rightChild = this.getRighrChildInd(ind);
            if(rightChild){
                let minChild = this.data[leftChild] <= this.data[rightChild] ? leftChild : rightChild;
                if(this.data[ind] > this.data[minChild]){
                    this.swap(ind,minChild);
                    this.minHeapify(minChild);
                }    
            }
        }        
    }
    isLeaf(ind){
        return (ind >= this.data.length / 2 && ind <= this.data.length); 
    }

    insert(element){
        //console.log("inserted cell: ",element)
        this.data.push(element);
        let currIndex = this.data.length - 1;
        //console.log("parent",this.data[this.getParentInd(currIndex)]);
       
        while(this.data[currIndex] <= this.data[this.getParentInd(currIndex)]){
            //console.log(currIndex);
            this.swap(currIndex,this.getParentInd(currIndex));
            currIndex = this.getParentInd(currIndex);
        }
    
    }
    makeEmpty(){
        this.data = [];
    }
    isEmpty(){
        return this.data.length === 0;
    }
    isMinHeap(){
        if(this.isLeaf(0))return true;
        for(let i = 1; i<= this.data.length; i++){
            if(this.data[i] < this.data[this.getParentInd(i)]) return false;
        }
        return true;
    }
    includes(element){
        this.data.forEach((ele)=>{
            if(ele === element) return true;
        });
        return false; 
    }
    print(){
        for (let i = 1; i < this.data.length / 2 ; i++) {
            console.log("parent: "+ this.data[i] 
                    +"Left Child: " + this.data[2*i]
                    +"Right Child: " + this.data[2*i+1]);
            console.log();        
            
        }
    }
    
}


function isSorted(arr){
    for (let i = 0; i < arr.length-1; i++) {
        if(arr[i]<arr[i+1]){
            return false;
        }
    }
    return true;
}

