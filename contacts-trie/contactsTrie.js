'use strict';

const fs = require('fs');
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.trim().split('\n').map(str => str.trim());
  main();
});

function readLine() {
  return inputString[currentLine++];
}

function main() {
  const queriesRows = parseInt(readLine(), 10);
  let queries = Array(queriesRows);

  for (let queriesRowItr = 0; queriesRowItr < queriesRows; queriesRowItr++) {
    queries[queriesRowItr] = readLine().split(' ');
  }

  let result = contacts(queries);
  console.log(result.join("\n") + "\n");
}

/*
 * Complete the contacts function below.
 */

 class Node {
   constructor(value = 1) {
     this.value = value;
     this.children = {};
   }
 }

function contacts(queries) {
  const trie = new Node(0);
  const results = [];

  for (const query of queries) {
    const [operation, arg] = query;
    if (operation == 'add') {
      add(trie, arg);
      console.log(JSON.stringify(trie.children['h'].children['a'].children['k']));

    }
    if (operation == 'find') {
      results.push(find(trie, arg));
    }
  }

  return results;
}

function add(trie, name) {
  let children = trie.children;
  let curnode;

  for (const letter of name) {
    if (children[letter]) {
      curnode = children[letter];
      curnode.value += 1;
    }
    else {
      children[letter] = curnode = new Node();
    }
    children = curnode.children;
  }
}


function find(trie, searchStr) {
  let children = trie.children;
  let curnode;

  for (const letter of searchStr) {
    if (children[letter]) {
      curnode = children[letter];
      children = curnode.children;
    } else {
      return 0;
    }
  }
  return curnode.value;
}
