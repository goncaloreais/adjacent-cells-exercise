var fs = require("fs");

//read grid from file
var gridExercise = fs.readFileSync("./exerciseGrid.json", "utf-8");
var grid100x100 = fs.readFileSync("./100x100.json", "utf-8");
var grid = JSON.parse(gridExercise);

//grid dimensions
var HEIGHT = grid.length;
var WIDTH = grid[0].length;

//GROUPS contains every group created
var GROUPS = [];

/**
 * findInArray function checks if one cell is present in one array
 * @param {*} array given array to search
 * @param {*} point given point to search
 */
function findInArray(array, point) {
    var pointToString = JSON.stringify(point);
    var arrayToString = JSON.stringify(array);

    if (arrayToString.indexOf(pointToString) != -1) {
        return true;
    }
    return false;
}

/**
 * findGroup is a recursive function that creates a group of 1s
 * @param {*} group the group that is being built
 * @param {*} i first coordinate
 * @param {*} j second coordinate
 */
function findGroup(group, i, j) {
    //exit condition
    if (findInArray(group, [i, j])) {
        return 0;
    }

    //push to group
    group.push([i, j])

    //check right
    if (j + 1 < WIDTH && grid[i][j + 1] === 1) {
        findGroup(group, i, j + 1);
    }
    //check left
    if (j - 1 > 0 && grid[i][j - 1] === 1) {
        findGroup(group, i, j - 1);
    }
    //check above
    if (i + 1 < HEIGHT && grid[i + 1][j] === 1) {
        findGroup(group, i + 1, j);
    }
    //check down
    if (i - 1 > 0 && grid[i - 1][j] === 1) {
        findGroup(group, i - 1, j);
    }
}

//main loop
//this loop checks every cell and create groups
for (var i = 0; i < HEIGHT - 1; i++) {
    for (var j = 0; j < WIDTH - 1; j++) {

        var proceed = true;

        if (grid[i][j] === 1) {

            //check if point is already in any of the discovered groups
            if (findInArray(GROUPS, [i, j])) {
                proceed = false;
            }

            //if proceed is false, that means that the point is already on one group, so the program must not include it again
            if (proceed) {
                group = [];
                findGroup(group, i, j);
                if(group.length > 1){
                    GROUPS.push(group);
                    console.log('Grupo: ' + JSON.stringify(group));
                }
            }
        }
    }
}