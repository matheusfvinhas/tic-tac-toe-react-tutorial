import React from 'react'
import './board.css'
import Square from '../square/square'

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinner={this.props.winnerList.includes(i)}
      />
    )
  }

  renderRow(row) {
    return row.map(item => {
      return this.renderSquare(item)
    })
  }

  renderBoard() {
    const board = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    return board.map(row => {
      return <div className="board-row">{this.renderRow(row)}</div>
    })
  }

  render() {
    return <div>{this.renderBoard()}</div>
  }
}
