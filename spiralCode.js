#!/usr/bin/env node

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var lineIndex = 0
let matrix = []
var matrixSize = 0
var center = [0, 0] // [array, item]
var currentPosition = [0, 0] // [array, item]

var currentMoveIndex = 0
const moves = ["up", "right", "down", "left"]
var nextMove = "up"

var nFlag = 0 // switch for incrementing numberOfMoves every other time
var n = 1 // number of moves to make to get to the next number (always starts with 1)

var outputString = ""

function moveToNextNumber() {

    // make moves depending on direction
    switch (nextMove) {
        case "up":
            goUp()
            break
        case "right":
            goRight()
            break
        case "down":
            goDown()
            break
        case "left":
            goLeft()
            break
    }

    // decide the direction of the next move
    currentMoveIndex++
    nextMove = moves[currentMoveIndex % moves.length]

    // figure out how may moves to make in the next direction
    if (nFlag == 0) {
        nFlag = 1
    } else {
        n++
        nFlag = 0
    }
}

function goUp() { // previous array
    // console.log("goUp")
    for (let i = 0; i < n; i++) {
        if (currentPosition[0] > 0) {
            currentPosition[0]-- // [array, item]
            printCurrentNumberInMatrix()
        }
    }
}

function goRight() { // next item
    // console.log("goRight")
    for (let i = 0; i < n; i++) {
        if (currentPosition[1] < matrixSize) {
            currentPosition[1]++ // [array, item]
            printCurrentNumberInMatrix()
        }
    }
}

function goDown() { // next array
    // console.log("goDown")
    for (let i = 0; i < n; i++) {
        if (currentPosition[0] < matrixSize) {
            currentPosition[0]++ // [array, item]
            printCurrentNumberInMatrix()
        }
    }
}

function goLeft() { // previous item
    // console.log("goLeft")
    for (let i = 0; i < n; i++) {
        if (currentPosition[1] > 0) {
            currentPosition[1]-- // [array, item]
            printCurrentNumberInMatrix()
        }
    }
}

function printCurrentNumberInMatrix() {
    const currentArray = currentPosition[0]
    const currentItem = currentPosition[1]
    // console.log(`currentArray: ${currentArray}`)
    // console.log(`currentItem: ${currentItem}`)
    console.log(matrix[currentArray][currentItem])
}

function simpleRound(number) {
    return (number + 0.5).toString().split(".")[0] * 1
}

function addArrayToMatrix(line) {
    let newArray = line.split(' ').map(item => item * 1)
    // console.log(`newArray: ${newArray}`)
    matrix.push(newArray)
    // console.log(`matrix: ${matrix}`)
}

rl.on('line', function (line) {
    // console.log('current line: ', line)
    // console.log('current lineIndex: ', lineIndex)
    if (lineIndex == 0) { // 1st line specifies size of the matrix

        matrixSize = line * 1
        let centerValue = simpleRound(matrixSize / 2) - 1
        // console.log(`centerValue: ${centerValue}`)
        center[0] = centerValue
        center[1] = centerValue

        currentPosition = center // set starting position

        // console.log(`center: ${center}`)

    } else { // each subsequent line is an array in the matrix

        if (lineIndex == matrixSize) { // user has finished typing in the last line
            addArrayToMatrix(line)

            rl.close()
            // print first item
            // console.log("first number:")
            console.log(matrix[center[0]][center[1]])

            // print the rest
            while (true) { // cover every number in the matrix
                // console.log(`currentPosition: ${currentPosition}`)
                if (currentPosition[0] == 0 && currentPosition[1] == 0) {
                    return
                }
                moveToNextNumber()
            }

            return
        } else { // populate the matrix
            addArrayToMatrix(line)
        }
    }
    lineIndex += 1
})