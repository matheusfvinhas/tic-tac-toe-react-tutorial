import React from 'react';
import './square.css';
import classNames from 'classnames';

const Square = props => {
    const classes = classNames('square', { 'square-win': props.isWinner });

    return (
        <button className={classes} onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Square;
