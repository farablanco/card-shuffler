/**
 * Created by Fara Aileen on 1/4/2016.
 */
"use strict";

function deckObj() {
    this.cards = [];
    this.xCards = [];

    this.init = initDeck;
    this.hit = hitDeck;
    this.reveal = revealDeck;
    this.shuffle = shuffleDeck;
}


// Initializes deck object
function initDeck() {
    var suits = ["&clubs;", "&hearts;", "&spades;", "&diams;"];
    var ranks = ["&nbsp;A", "&nbsp;2", "&nbsp;3", "&nbsp;4", "&nbsp;5", "&nbsp;6", "&nbsp;7", "&nbsp;8", "&nbsp;9",
        "10", "&nbsp;J", "&nbsp;Q", "&nbsp;K"];
    var i, j;
    var k = 0;

    console.info("Initializing");
    for (i = 0; i < suits.length; i++){
        for (j = 0; j < ranks.length; j++) {
            this.cards[k] = {suit: suits[i], rank: ranks[j]};
            k++;
        }
    }
}

// Pops top card
function hitDeck(){
    console.info("Removing top card");

    this.xCards.unshift(this.cards.pop()); // latest hit is shown at the top of the popped card stack

    // reveal() reverses card order shown in <div id="house">
    // slice is used to avoid impacting deck.cards
    // have to research if there's a better way of doing this, ie if passing object value is possible
    this.reveal(this.cards.slice(), "house");
    this.reveal(this.xCards, "hits");
}

// Displays deck from top
// !!! Is there a better way of concatenating and displaying string? !!!
// !!! research how to pass object values !!!
function revealDeck(dDeck, dWindow) {
    var i;
    var dispWindow;
    var deckString = "";

    console.info("Laying cards down");

    if (dWindow == "house"){
        dDeck.reverse();
    }
    for (i = 0; i < dDeck.length; i++){
        deckString = deckString.concat(dDeck[i].rank, dDeck[i].suit, " ");
        if (!((i+1) % 13)){
            deckString = deckString.concat("<br><br><br>");
        }
    }

    dispWindow = document.getElementById(dWindow);
    dispWindow.innerHTML = deckString;
}

// Shuffles deck
function shuffleDeck(){
    var tempCard = {};
    var i, j;

    console.info("Shuffling");
    for(i = 0; i < this.cards.length; i++){   // go through deck of cards
        j = Math.floor(Math.random() * this.cards.length); // pick a random card
        tempCard = this.cards[j];                 // take note of random card
        this.cards[j] = this.cards[i];            // place randomly picked card in current card's position
        this.cards[i] = tempCard;                 // place current card in randomly picked card's position
    }
    console.info(this);
    // reveal() reverses card order shown in <div id="house">
    // slice is used to avoid impacting deck.cards
    // have to research if there's a better way of doing this, ie if passing object value is possible
    this.reveal(this.cards.slice(), "house");
}

