// DeckList.js
import { DeckNode } from './DeckNode.js';
import { Card } from './Card.js';

export class DeckList {
    constructor(name) {
        this.name = name;
        this.DeckNodes = [];
        this.tail = null;
    }

    addDeckNode(cards) {
        const newDeck = new DeckNode(cards);
        newDeck.version = this.DeckNodes.length + 1;
        this.DeckNodes.push(newDeck);
        if(this.tail){
            this.previousTail = this.tail;
        }
        this.tail = newDeck;
        return newDeck;
    }

    getNode(version) {
        return this.DeckNodes.find(d => d.version === version);
    }

    compareNodes(nodeA, nodeB) {
        if (!nodeA || !nodeB || !nodeA.cards || !nodeB.cards) {
          return { added: [], removed: [] };
        }
        // pick newer vs older...
        const [newer, older] = nodeA.version > nodeB.version
          ? [nodeA, nodeB]
          : [nodeB, nodeA];
      
        // turn the Set (or Array) into an Array
        const newerArr = Array.isArray(newer.cards)
          ? newer.cards
          : [...newer.cards];
        const olderArr = Array.isArray(older.cards)
          ? older.cards
          : [...older.cards];
      
        const newerSet = new Set(newerArr.map(c => `${c.name}:${c.count}`));
        const olderSet = new Set(olderArr.map(c => `${c.name}:${c.count}`));
      
        const added   = [...newerSet].filter(x => !olderSet.has(x));
        const removed = [...olderSet].filter(x => !newerSet.has(x));
        /*
        returning array of Cards, for later
        
        const addedCards = added.map(s => {
            const [name, count] = s.split(':');
            return { name, count: Number(count) };
        });
        */
          
        return { added, removed };
      }
}
