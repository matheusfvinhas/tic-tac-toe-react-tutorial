import React, { useState } from 'react';
import Board from '../../components/board/board';
import './game.css';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = i => {
        const slicedHistory = history.slice(0, stepNumber + 1);
        const current = slicedHistory[slicedHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(slicedHistory.concat([{ squares: squares }]));
        setStepNumber(slicedHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = step => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const resetGame = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setStepNumber(0);
        setXIsNext(true);
    };

    const calculateWinner = squares => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return { winner: squares[a], winnerList: lines[i] };
            }
        }
        return { winner: null, winnerList: [] };
    };

    const current = history[stepNumber];
    const calculatedWinner = calculateWinner(current.squares);

    const moves = history.map((_, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    if (calculatedWinner.winner) {
        status = 'Winner: ' + calculatedWinner.winner;
    } else if (current.squares.every(square => !!square)) {
        status = 'Draw';
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                    winnerList={calculatedWinner.winnerList}
                />
                <button
                    onClick={() => resetGame()}
                    style={{ marginTop: 20 + 'px' }}>
                    Reset
                </button>
            </div>
            <div className='game-info'>
                <div
                    style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}>
                    {status}
                </div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

export default Game;
