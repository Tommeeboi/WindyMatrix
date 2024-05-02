// finish relisten of galaxy 2 ost bich

/* HOW THIS WORKS:
plan:
take all players as separate arrays, 0 as name and 1 as skill (out of 5)
based on character 0 of player[1] (skill rating), rank them from best to worst and place in a sort of "master array" (using those push and pull gubbins i think) - actually just .push

if odd number of players, temporarily take worst dude out (if multiple worst dudes w/ same rank, pick one at random)

take top 2, random choose one to be on team 1 and other on team 2. repeat until no-one left in "master array"

if odd number of players, add worst dude to team with the lowest total skill rating. if both have same, add to the team with the higher average skill rating. if still both have same, random choose

make sure to have a "regenerate" button which sorts them again (with different rng)

this is NOT permanent and may have changes later, possibly using average skill ratings
*/

/* pkg -t node18-win index.js (DO NOT try using x86 too. machine is x64 and i think this does x64 but i might be wrong idk it works anyway)
pkg -t node18-macos index.js (mac might not be x64, check model number with the big man)
on mac file is double-clickable and will open terminal, even without file extension. if it fails, maybe add .app to the end
pkg index.js */

// prompt-sync likes to be buggy with long messages and \n, so they are separate from some console.logs

const fs = require("fs");
const prompt = require("prompt-sync")();

console.log("WindyMatrix v1.0\nBy Tommeeboi (with help from Boiga)\n");

console.log('Input "end" to exit program at any time.\n\nAdd your first player:');

// first value is purposefully left empty for simplicity (e.g. player 1 is slot 1 instead of 0)
let nameArray = [];
let skillArray = [];

let nextPlayer = 1;

function createPlayer(id) {
    console.log();
    const n = prompt("Name: ");
    const s = prompt("Skill Rating (out of 5): ");

    // number will be string. try Number() maybe?
    if (n === "end" || s === "end") {
        console.log("\nTerminating process...");
        process.exit(0);
    } else if (n === "" || !n) {
        console.log("\nError: Name is nonexistent. Please try again.");
        createPlayer(id);
    } else if (isNaN(s.charAt(0)) || s === "") {
        console.log("\nError: Skill Rating not a number. Please try again.");
        createPlayer(id);
    } else if (s.length > 1) {
        console.log("\nError: Skill Rating is longer than one character. Please try again.");
        createPlayer(id);
    } else if (s > 5) {
        console.log("\nError: Skill Rating is too large. Please try again.");
        createPlayer(id);
    } else {
        console.log(`\nPlayer ${id}: ${n} added. Skill Rating: ${s}`);
        nameArray[id] = n;
        skillArray[id] = s;
        nextPlayer++;
        choice1();
    }
}

function choice1() {
    console.log('Input "a" to add another player, "v" to view current players, and "g" to generate teams.');
    let choice = prompt();

    if (choice === "a") {
        createPlayer(nextPlayer);
    } else if (choice === "v") {
        console.log("\nCurrent Players:");
        for (let i = 1; i < nextPlayer; i++) {
            console.log(`- ${nameArray[i]} (${skillArray[i]})`);
        }
        console.log();
        choice1();
    } else if (choice === "g") {
        // do this later
        console.log("\nAre you sure? You won't be able to add players once you proceed. (y/n)");
        let sure = prompt();
        console.log("");
        checkCount();

        if (sure !== "y") {
            choice1();
        }
    } else if (choice === "end") {
        console.log("\nTerminating process...");
        process.exit(0);
    } else {
        console.log("\nError: Invalid input. Please try again.");
        choice1();
    }
}

createPlayer(1);

// generate team code (isn't run until you escape createPlayer() or choice1(), which can only be done by inputting g)
function checkCount() {
    if (nextPlayer < 3) {
        console.log("Error: Insufficient player count. Please try again.");
        choice1();
    }
}


console.log("\nGenerating teams...");
/* console.log(nameArray);
console.log(skillArray); */

let masterArray = [];
for (let j = 1; j < nextPlayer; j++) {
    if (skillArray[j] === "5") {
        masterArray.push(nameArray[j]);
    }
}

for (let k = 1; k < nextPlayer; k++) {
    if (skillArray[k] === "4") {
        masterArray.push(nameArray[k]);
    }
}

for (let l = 1; l < nextPlayer; l++) {
    if (skillArray[l] === "3") {
        masterArray.push(nameArray[l]);
    }
}

for (let m = 1; m < nextPlayer; m++) {
    if (skillArray[m] === "2") {
        masterArray.push(nameArray[m]);
    }
}

// n was reserved
for (let o = 1; o < nextPlayer; o++) {
    if (skillArray[o] === "1") {
        masterArray.push(nameArray[o]);
    }
}

console.log(masterArray);