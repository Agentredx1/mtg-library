// Card.js
export class Card {
    constructor(name, mana = 0, count = 1) {
        this.name = name;
        this.count = count;
        this.mana = mana; // Could be expanded later with data from API
    }

    addCount(amount = 1) {
        this.count += amount;
    }

    clone() {
        return new Card(this.name, this.mana, this.count);
    }
}
