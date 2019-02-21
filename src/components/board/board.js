import React from 'react';
import Square from '../square/square';
import './board.css';

const Board = props => {
    const renderSquare = i => {
        return (
            <Square
                key={i}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                isWinner={props.winnerList.includes(i)}
            />
        );
    };

    const renderRow = row => {
        return row.map(item => {
            return renderSquare(item);
        });
    };

    const renderBoard = () => {
        const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        return board.map((row, index) => {
            return (
                <div key={index} className='board-row'>
                    {renderRow(row)}
                </div>
            );
        });
    };

    return <div>{renderBoard()}</div>;
};

export default Board;
