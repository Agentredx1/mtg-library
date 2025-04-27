// DeckNode.js
import { Card } from './Card.js';

export class DeckNode {
    constructor(cards = []) {
        this.cards = cards; // Deep copy to preserve version integrity
        this.version = null; // Assigned by DeckList
    }

    getCardNames() {
        return this.cards.map(card => card.name);
    }
}
