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

/* pkg node18-win-x64 index.js (try using x86 too)
pkg node18-macos-x64 index.js (mac might not be x64, check model number with the big man)
on mac file is double-clickable and will open terminal, even without file extension. if it fails, maybe add .app to the end
pkg index.js */

const fs = require("fs");
const prompt = require("prompt-sync")();

console.log("WindyMatrix v1.0\nBy Tommeeboi (with help from Boiga)\n");

console.log("Hit Ctrl+C to exit program at any time.\n\nAdd your first player:");

let nameArray = [];
let skillArray = [];

function createPlayer(id) {
    const n = prompt("Name: ");
    const s = prompt("Skill Rating (out of 5): ");

    // number will be string. try Number() maybe?
    if (isNaN(s.charAt(0))) {
        console.log("Error: Skill Rating not a number. Please try again.");
        createPlayer(id);
    } else if (s.length > 1) {
        console.log("Error: Skill Rating is longer than one character. Please try again.");
        createPlayer(id);
    } else if (s > 5) {
        console.log("Error: Skill Rating is too large. Please try again.");
        createPlayer(id);
    } else {
        console.log(`Player 1: ${n} added. Skill Rating: ${s}`);
    }
}

createPlayer();