class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let node of this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex)
      }
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set();
    const array = [];

    function traverse(vertex){

      //if none return null
      if(!vertex){
        return null;
      }
      //add current to visited
      visited.add(vertex)
      //add value to array
      array.push(vertex.value)
      // for each neighbor, if not in visited yet, call traverse on that as starting vertex
      vertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          return traverse(neighbor)
        }
      })
    }
    traverse(start);
    return array;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queue = [start];
    const array = [];
    const visited = new Set();
    let currentVertex;

    //visit start
    visited.add(start)

    //while queue, 
    while(queue.length){
      currentVertex = queue.shift();
      //record value
      array.push(currentVertex.value);

      // if neighbors, add neighbors to queue
      currentVertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          visited.add(neighbor);
          queue.push(neighbor);
        }
      })
    } 
    return array;
  }
 
}

module.exports = {Graph, Node}