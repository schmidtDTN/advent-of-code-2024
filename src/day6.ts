import { extractUnspacedRowListsAsChars } from "./input_processing";

enum DIRECTION {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

type Position = {
    rowNumber: number,
    colNumber: number,
    offGrid: boolean,
}

export function daySixPartOne(filename: string) {
    const rows = extractUnspacedRowListsAsChars(filename);
    // const traversal = TwoDimensionalArrayTraversal()
    // console.log(rows);
    const startingRow = rows.findIndex((x) => x.includes('^'));
    const startingCol = rows[startingRow].findIndex((x) => x === '^');
    let currentPosition: Position = { rowNumber: startingRow, colNumber: startingCol, offGrid: false }
    const startingDirection = DIRECTION.NORTH;
    const traversalObject = new TwoDimensionalArrayTraversal(rows, currentPosition, startingDirection);
    const visitedLocationSet = new Set();
    while (!currentPosition.offGrid) {
        // The JSON stringify is just me being lazy because Set doesn't work super well with objects
        visitedLocationSet.add(JSON.stringify(currentPosition));
        traversalObject.stepInCurrentDirection();
        const nextPositionChar = traversalObject.getNextPositionChar();
        if (nextPositionChar === '#') {
            traversalObject.turnRight();
        }
        currentPosition = traversalObject.getCurrentPosition();
    }

    return visitedLocationSet.size;
}

export function daySixPartTwo(filename: string) {

}


class TwoDimensionalArrayTraversal {
    array: string[][]
    currentPosition: Position;
    currentDirection: DIRECTION;
    constructor(
        array: string[][],
        startingPosition: Position,
        startingDirection: DIRECTION
    ) {
        this.array = array;
        this.currentPosition = startingPosition
        this.currentDirection = startingDirection
    }

    goNorth() {
        if (this.getNorthChar() === undefined) {
            this.currentPosition.offGrid = true;
        }
        this.currentPosition.rowNumber = this.currentPosition.rowNumber - 1
    }

    goSouth() {
        if (this.getSouthChar() === undefined) {
            this.currentPosition.offGrid = true;
        }
        this.currentPosition.rowNumber = this.currentPosition.rowNumber + 1
    }

    goEast() {
        if (this.getEastChar() === undefined) {
            this.currentPosition.offGrid = true;
        }
        this.currentPosition.colNumber = this.currentPosition.colNumber + 1
    }

    goWest() {
        if (this.getWestChar() === undefined) {
            this.currentPosition.offGrid = true;
        }
        this.currentPosition.colNumber = this.currentPosition.colNumber - 1
    }

    stepInCurrentDirection() {
        switch (this.currentDirection) {
            case DIRECTION.NORTH:
                this.goNorth();
                break;
            case DIRECTION.SOUTH:
                this.goSouth();
                break;
            case DIRECTION.EAST:
                this.goEast();
                break;
            case DIRECTION.WEST:
                this.goWest();
                break;
        }
    }

    turnRight() {
        switch (this.currentDirection) {
            case DIRECTION.NORTH:
                this.currentDirection = DIRECTION.EAST
                break;
            case DIRECTION.SOUTH:
                this.currentDirection = DIRECTION.WEST;
                break;
            case DIRECTION.EAST:
                this.currentDirection = DIRECTION.SOUTH;
                break;
            case DIRECTION.WEST:
                this.currentDirection = DIRECTION.NORTH;
                break;
        }
    }

    turnLeft() {
        switch (this.currentDirection) {
            case DIRECTION.NORTH:
                this.currentDirection = DIRECTION.WEST;
                break;
            case DIRECTION.SOUTH:
                this.currentDirection = DIRECTION.EAST;
                break;
            case DIRECTION.EAST:
                this.currentDirection = DIRECTION.NORTH;
                break;
            case DIRECTION.WEST:
                this.currentDirection = DIRECTION.SOUTH;
                break;
        }
    }

    getNextPositionChar() {
        switch (this.currentDirection) {
            case DIRECTION.NORTH:
                return this.getNorthChar()
            case DIRECTION.SOUTH:
                return this.getSouthChar();
            case DIRECTION.EAST:
                return this.getEastChar();
            case DIRECTION.WEST:
                return this.getWestChar();
        }
    }

    getCurrentPosition() {
        return this.currentPosition;
    }

    getNorthChar() {
        try {
            return this.array[this.currentPosition.rowNumber - 1][this.currentPosition.colNumber]
        } catch {
            return undefined;
        }
    }

    getSouthChar() {
        try {
            return this.array[this.currentPosition.rowNumber + 1][this.currentPosition.colNumber]
        } catch {
            return undefined;
        }
    }

    getEastChar() {
        try {
            return this.array[this.currentPosition.rowNumber][this.currentPosition.colNumber + 1]
        } catch {
            return undefined;
        }
    }

    getWestChar() {
        try {
            return this.array[this.currentPosition.rowNumber][this.currentPosition.colNumber - 1]
        } catch {
            return undefined;
        }
    }


}