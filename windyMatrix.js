// prompt-sync likes to be buggy with long messages and \n, so they are separate from some console.logs

// fs may be here in the future if i add creating text files with the teams
// const fs = require("fs");
const prompt = require("prompt-sync")();

console.log("WindyMatrix v1.0\nBy Tommeeboi (with help from Boiga)\n");

console.log('Input "end" to exit the program at any time.\n\nAdd your first player:');

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

function checkCount() {
    if (nextPlayer < 3) {
        console.log("Error: Insufficient player count. Please try again.");
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
// all within a function for regenerating
function generate() {
    console.log("\nGenerating teams...\n");

    let masterArray = [];
    let sortedSkill = [];

    // orders players from best to worst by skill rating
    for (let j = 1; j < nextPlayer; j++) {
        if (skillArray[j] === "5") {
            masterArray.push(nameArray[j]);
            sortedSkill.push(skillArray[j]);
        }
    }

    for (let k = 1; k < nextPlayer; k++) {
        if (skillArray[k] === "4") {
            masterArray.push(nameArray[k]);
            sortedSkill.push(skillArray[k]);
        }
    }

    for (let l = 1; l < nextPlayer; l++) {
        if (skillArray[l] === "3") {
            masterArray.push(nameArray[l]);
            sortedSkill.push(skillArray[l]);
        }
    }

    for (let m = 1; m < nextPlayer; m++) {
        if (skillArray[m] === "2") {
            masterArray.push(nameArray[m]);
            sortedSkill.push(skillArray[m]);
        }
    }

    // n was reserved
    for (let o = 1; o < nextPlayer; o++) {
        if (skillArray[o] === "1") {
            masterArray.push(nameArray[o]);
            sortedSkill.push(skillArray[o]);
        }
    }

    // fun fact: i have never used modulo until this
    // 1 = odd, 0 = even
    const isOdd = masterArray.length % 2;
    let amountOfBad = 0;
    let rng = 0;
    let leftOut = undefined;
    let leftOutSkill = 0;

    if (isOdd === 1) {
        for (let p = 1; p < nextPlayer; p++) {
            if (skillArray[p] === "1") {
                amountOfBad++;
            }
        }

        if (amountOfBad === 0) {
            for (let q = 1; q < nextPlayer; q++) {
                if (skillArray[q] === "2") {
                    amountOfBad++;
                }
            }
        }

        if (amountOfBad === 0) {
            for (let r = 1; r < nextPlayer; r++) {
                if (skillArray[r] === "3") {
                    amountOfBad++;
                }
            }
        }

        // s was reserved
        if (amountOfBad === 0) {
            for (let t = 1; t < nextPlayer; t++) {
                if (skillArray[t] === "4") {
                    amountOfBad++;
                }
            }
        }

        if (amountOfBad === 0) {
            amountOfBad = masterArray.length;
        }

        rng = Math.floor(Math.random() * amountOfBad) + 1;
        leftOut = masterArray[masterArray.length - rng];
        leftOutSkill = sortedSkill[sortedSkill.length - rng];
        // why is deleting elements from arrays so unhelpful
        masterArray.splice(masterArray.length - rng, 1);
        sortedSkill.splice(sortedSkill.length - rng, 1);
    }

    // probably didn't need currents but they made stuff easier to code so idc
    let team1 = [];
    let team2 = [];
    let team1S = [];
    let team2S = [];
    let currentTeam = 0;
    let currentMaster = 0;
    let currentMasterLength = masterArray.length / 2;
    let totalSkill1 = 0;
    let totalSkill2 = 0;

    for (let u = 0; u < currentMasterLength; u++) {
        rng = Math.floor(Math.random() * 2);

        if (rng === 0) {
            team1[currentTeam] = masterArray[currentMaster];
            team1S[currentTeam] = sortedSkill[currentMaster];
            totalSkill1 += Number(sortedSkill[currentMaster]);
            team2[currentTeam] = masterArray[currentMaster + 1];
            team2S[currentTeam] = sortedSkill[currentMaster + 1];
            totalSkill2 += Number(sortedSkill[currentMaster + 1]);
        } else {
            team1[currentTeam] = masterArray[currentMaster + 1];
            team1S[currentTeam] = sortedSkill[currentMaster + 1];
            totalSkill1 += Number(sortedSkill[currentMaster + 1]);
            team2[currentTeam] = masterArray[currentMaster];
            team2S[currentTeam] = sortedSkill[currentMaster];
            totalSkill2 += Number(sortedSkill[currentMaster]);
        }

        currentTeam++;
        currentMaster += 2;
    }

    // average skill rating stuff
    // the reason they start out as a string is so that i can easily detect how many digits there are and decide whether to round them or not. i could round them every time but i want my precious ~ sign to only show up when needed
    let avgSkill1 = `${totalSkill1 / team1.length}`;
    let avgSkill2 = `${totalSkill2 / team2.length}`;
    let avgRounded1 = false;
    let avgRounded2 = false;

    if (avgSkill1.length > 4) {
        avgSkill1 = Number(avgSkill1);
        avgSkill1 = Number(avgSkill1.toFixed(2));
        avgRounded1 = true;
    }

    if (avgSkill2.length > 4) {
        avgSkill2 = Number(avgSkill2);
        avgSkill2 = Number(avgSkill2.toFixed(2));
        avgRounded2 = true;
    }

    // tries to add the temporarily taken out worst player to a good team. not a perfect system but it's fine
    if (isOdd === 1) {
        if (totalSkill1 < totalSkill2) {
            team1.push(leftOut);
            team1S.push(leftOutSkill);
            totalSkill1 += Number(leftOutSkill);
        } else if (totalSkill1 > totalSkill2) {
            team2.push(leftOut);
            team2S.push(leftOutSkill);
            totalSkill2 += Number(leftOutSkill);
        } else {
            if (avgSkill1 < avgSkill2) {
                team1.push(leftOut);
                team1S.push(leftOutSkill);
                totalSkill1 += Number(leftOutSkill);
            } else if (avgSkill1 > avgSkill2) {
                team2.push(leftOut);
                team2S.push(leftOutSkill);
                totalSkill2 += Number(leftOutSkill);
            } else {
                rng = Math.floor(Math.random() * 2);
                if (rng === 0) {
                    team1.push(leftOut);
                    team1S.push(leftOutSkill);
                    totalSkill1 += Number(leftOutSkill);
                } else {
                    team2.push(leftOut);
                    team2S.push(leftOutSkill);
                    totalSkill2 += Number(leftOutSkill);
                }
            }
        }
    }

    // maybe add display average skill rating depending on how easy it is
    console.log("Team 1:");
    for (let v = 0; v < team1.length; v++) {
        console.log(`- ${team1[v]} (${team1S[v]})`);
    }
    console.log(`Total Skill Rating: ${totalSkill1}`);
    if (avgRounded1) {
        console.log(`Average Skill Rating: ~${avgSkill1}\n`);
    } else {
        console.log(`Average Skill Rating: ${avgSkill1}\n`);
    }

    console.log("Team 2:");
    for (let w = 0; w < team2.length; w++) {
        console.log(`- ${team2[w]} (${team2S[w]})`);
    }
    console.log(`Total Skill Rating: ${totalSkill2}`);
    if (avgRounded2) {
        console.log(`Average Skill Rating: ~${avgSkill2}\n`);
    } else {
        console.log(`Average Skill Rating: ${avgSkill2}\n`);
    }

    choice2();
}

generate();

function choice2() {
    console.log('Input "r" to regenerate, or "end" to exit. (Make a note of the teams first!)');
    let ultimateDecision = prompt();

    if (ultimateDecision === "r") {
        generate();
    } else if (ultimateDecision === "end") {
        console.log("\nTerminating process...");
    } else {
        console.log("\nError: Invalid input. Please try again.");
        choice2();
    }
}