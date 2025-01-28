import React, {useEffect, useState} from 'react';
import './Minesweeper.css';



class Cell {
    isRevealed: boolean;
    isMine: boolean;
    bombsAround: number;

    constructor(isRevealed?: boolean, isMine?: boolean) {
        this.isRevealed = isRevealed ? isRevealed : false;
        this.isMine = isMine ? isMine : false;
        this.bombsAround = 0;
    }


}

class Board {
    boardstate: Cell[][];
    width: number
    height: number;
    totalNumberOfMines: number;
    private placedMines: number;
    gameover: boolean
    win: boolean

    constructor(width: number, height: number, noOfMines: number) {
        this.boardstate = []
        this.width = width;
        this.height = height;
        this.totalNumberOfMines = noOfMines;
        this.placedMines = 0;
        this.gameover = false
        this.win = false
        for (let i = 0; i < width; i++) {
            const boardRow: Cell[] = [];
            for (let j = 0; j < height; j++) {
                const hasMine = this.placedMines < this.totalNumberOfMines && this.placeMine()
                if (hasMine) {
                    this.placedMines++
                }
                boardRow.push(new Cell(false, hasMine))

            }
            this.boardstate.push(boardRow)
        }
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.boardstate[i][j].bombsAround = this.adjacentBombsCounter(i, j)

            }

        }

    }

    private placeMine(): boolean {
        const prob: number = this.totalNumberOfMines / (this.width * this.height)
        //cell_num is the number of cells visited
        return Math.random() < prob
    }


    private isMine(row: number, col: number) {
        return this.boardstate[row][col].isMine
    }

    public updateBoardState(row: number, col: number) {
        if (this.boardstate[row][col].isMine) {
            this.boardstate[row][col].isRevealed = true
            this.gameover = true
            return this
        } else if (this.boardstate[row][col].isRevealed) {
            return this
        } else {
            //this.boardstate[row][col].isRevealed = true
            this.revealAround(row, col)
            this.DidWeWin()
        }


    }

    private revealAround(row: number, col: number) {
        //if current cell has 0 bombs around. reveal them

        //exit:
        if (row < 0 || row >= this.height || col < 0 || col >= this.width) return

        if (!this.boardstate[row][col].isRevealed && this.boardstate[row][col].bombsAround > 0) {
            this.boardstate[row][col].isRevealed = true
            return;
        }
        if (!this.isMine(row, col) && !this.boardstate[row][col].isRevealed) {
            this.boardstate[row][col].isRevealed = true
            this.revealAround(row + 1, col)
            this.revealAround(row - 1, col)
            this.revealAround(row, col + 1)
            this.revealAround(row, col - 1)

            //reveal around
        } else {
            return;
        }

    }

    private adjacentBombsCounter(row: number, col: number) {
        let counter = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i !== 0 || j !== 0) && (row + i >= 0) && (col + j >= 0) && (row + i < this.height) && (col + j < this.width)) {

                    if (this.isMine(row + i, col + j)) {
                        counter++
                    }
                }
            }
        }
        return counter
    }


    private DidWeWin() {
        const totalCells = this.width * this.height;
        const revealedCells = this.boardstate.flat().filter(cell => cell.isRevealed).length;
        const nonMineCells = totalCells - this.placedMines;

        if (revealedCells === nonMineCells) {
            this.win = true;
            this.gameover = true
            alert('Congratulations! You won the game!');
        }

    }
}

const width = 8
const height =8
const noOfMines=10
const Minesweeper = () => {

    const [boardState, setBoardState] = useState(new Board(width, height, noOfMines))
    const [update, setUpdate] = useState(false)
    const handleGridClick = (row: number, col: number, disabled: boolean) => {
        if (disabled) return

        if (boardState.gameover || boardState.win) {
            return
        }
        boardState.updateBoardState(row, col)
        setUpdate(true)
    }
    useEffect(() => {
        setUpdate(false)
        setBoardState(boardState)

    }, [update,boardState]);

    const createNewGame = () => {
        setBoardState(new Board(8, 8, 10))
    }

    return (
        <div className={'game-container'}>

            <div className={"window-content"}></div>
            <div className={"window-content display-container"}>
                <div className={"display"}>888</div>
                <div className={"window-content smiley"} onClick={createNewGame}>😊</div>
                <div className={"display"}>888</div>

            </div>
            <div
                className="board-container"
                style={{
                    gridTemplateColumns: `repeat(${boardState.width}, 2rem)`,
                    gridTemplateRows: `repeat(${boardState.height}, 2rem)`,
                }}
            >
                {boardState.boardstate.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleGridClick(rowIndex, colIndex, cell.isRevealed)}
                            className={`cell ${cell.isRevealed ? (boardState.gameover && cell.isMine ? 'bomb' : 'revealed') : ''}`}
                        >
                            {cell.isRevealed ? (boardState.gameover && cell.isMine ? "💣" : (cell.bombsAround===0?"":cell.bombsAround)) : ""}
                            {/*{boardState.gameover && cell.isMine ? "💣":""}*/}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Minesweeper;