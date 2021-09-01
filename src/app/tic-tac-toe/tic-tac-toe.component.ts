import { Component, OnInit } from '@angular/core';

export type TicTacToeState = ' ' | '○' | '×'

const DEFAULT_FIELD: TicTacToeState[][] = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
]

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.sass']
})
export class TicTacToeComponent implements OnInit {
  // deepcopy
  fieldData: TicTacToeState[][] = JSON.parse(JSON.stringify(DEFAULT_FIELD))

  playerUserMark: TicTacToeState = '○'

  constructor() { }

  ngOnInit(): void {
    this.resetField()
  }

  private resetField(): void {
    this.fieldData = JSON.parse(JSON.stringify(DEFAULT_FIELD))
    this.playerUserMark = '○'

    console.log(this.fieldData)
  }

  private checkDecidedWinner(): TicTacToeState {
    let winner: TicTacToeState = ' '

    // 横
    for (let column of this.fieldData) {
      let diffCount = column.filter(row => row !== this.playerUserMark).length
      if (diffCount === 0) {
        winner = this.playerUserMark
        break
      }
    }

    // 縦
    if (winner === ' ') {
      for (let [index, _] of this.fieldData.entries()) {
        if (
          this.fieldData[0][index] !== ' ' &&
          this.fieldData[0][index] === this.fieldData[1][index] &&
          this.fieldData[1][index] === this.fieldData[2][index]
        ) {
          winner = this.playerUserMark
          break
        }
      }
    }

    // ななめ
    if (winner === ' ') {
      const crossFields = [
        [this.fieldData[0][0], this.fieldData[1][1], this.fieldData[2][2]],
        [this.fieldData[0][2], this.fieldData[1][1], this.fieldData[2][0]]
      ]

      for (let column of crossFields) {
        const diffCount = column.filter(row => row !== this.playerUserMark).length
        if (diffCount === 0) {
          winner = this.playerUserMark
          break
        }
      }
    }

    return winner
  }

  onClickField(targetColumn: number, targetRow: number): void {
    if (
      this.playerUserMark === ' ' ||
      this.fieldData[targetColumn][targetRow] !== ' '
    ) return

    this.fieldData[targetColumn][targetRow] = this.playerUserMark
    const winner = this.checkDecidedWinner()

    if (winner !== ' ') {
      window.setTimeout(() => window.alert(`${winner}のかち！`), 100)
      this.playerUserMark = ' '
      return
    }

    this.playerUserMark = this.playerUserMark === '○' ? '×' : '○'
  }

  onClickReset (): void {
    this.resetField()
  }
}
