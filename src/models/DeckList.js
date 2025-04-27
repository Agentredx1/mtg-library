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
        console.log({nodeA, nodeB});
        if (!nodeA || !nodeB) {
          return { added: [], removed: [] };
        }
      
        // Ensure nodeA is newer
        let [newer, older] = nodeA.version > nodeB.version ? [nodeA, nodeB] : [nodeB, nodeA];
        const newerSet = new Set(newer.cards.map(card => `${card.name}:${card.count}`));
        const olderSet = new Set(older.cards.map(card => `${card.name}:${card.count}`));
      
        const added = [...newerSet].filter(x => !olderSet.has(x));
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
