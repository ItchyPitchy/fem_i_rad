const game = {
    horizontalVictory: function (id, marker, size) {
        let result = 1
        for (k = 1; k < 5; k++) {
            if ((parseInt(id)-k+1)%size !== 0) {
                if (document.getElementById(parseInt(id)-k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        for (k = 1; k < 5; k++) {
            if ((parseInt(id)+k)%size !== 0) {
                if (document.getElementById(parseInt(id)+k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        return result >= 5
    },
    verticalVictory: function (id, marker, size) {
        let result = 1
        for (k = 1; k < 5; k++) {
            if (parseInt(id)-size*k >= 0) {
                if (document.getElementById(parseInt(id)-size*k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        for (k = 1; k < 5; k++) {
            if (parseInt(id)+size*k < size*size) {
                if (document.getElementById(parseInt(id)+size*k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        return result >= 5
    },
    risingVictory: function (id, marker, size) {
        let result = 1
        for (k = 1; k < 5; k++) {
            if ((parseInt(id)-k+1)%size !== 0 && parseInt(id)+size*k < size*size) {
                if (document.getElementById(parseInt(id)+size*k-k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        for (k = 1; k < 5; k++) {
            if (parseInt(id)-size*k >= 0 && (parseInt(id)+k)%size !== 0) {
                if (document.getElementById(parseInt(id)-size*k+k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        return result >= 5
    },
    sinkingVictory: function (id, marker, size) {
        let result = 1
        for (k = 1; k < 5; k++) {
            if ((parseInt(id)-k+1)%size !== 0 && parseInt(id)-size*k >= 0) {
                if (document.getElementById(parseInt(id)-size*k-k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        for (k = 1; k < 5; k++) {
            if ((parseInt(id)+k)%size !== 0 && parseInt(id)+size*k < size*size) {
                if (document.getElementById(parseInt(id)+size*k+k).classList.contains(marker)) {
                    result += 1
                } else { 
                    break 
                }
            } else {
                break
            }
        }
        return result >= 5
    },
    draw: function () {
        return document.querySelector('.empty') === null
    },
    newBoard: function () {
        let ans = prompt('Board size between 5-25:')
        if (ans === null) {
                alert('*Cancelled*')
        } else if (ans !== null && (ans.trim() == '' || isNaN(ans))) {
            alert('Not a number!')
            game.newBoard()
        } else if (ans > 25 || ans < 5) {
            alert('Out of bounds!')
            game.newBoard()
        } else {
            if (document.querySelector('#win-container').classList.contains('show')) {
                document.querySelector('#win-container').classList.replace('show', 'hide')
                document.querySelector('#winner').textContent = ''
            }
            content = document.querySelector('#content-container')
            if (content.hasChildNodes('table')) {
                content.removeChild(content.lastChild);
            }
            game.createBoard(ans)
        }
    },
    createBoard: function (boardSize) {
        newTable = document.createElement('table')

        for (i = 0; i < boardSize; i++) {
            newTr = document.createElement('tr')
            newTable.appendChild(newTr)
            
            for (j = 0; j < boardSize; j++) {
                const newTd = document.createElement('td')
                newTr.appendChild(newTd)
                const newBtn = document.createElement('button')
                newBtn.id = i * boardSize + j
                newBtn.classList.add('empty')
                newBtn.classList.add('board-btn')
                newTd.appendChild(newBtn)
        
                newBtn.addEventListener('click', function(event) {
                    if (oTurn) { 
                        turns += 1
                        event.currentTarget.textContent = 'o'
                        event.currentTarget.classList.replace('empty', 'o')
                        event.currentTarget.disabled = true
                        targetId = event.currentTarget.id
                        if (game.horizontalVictory(targetId, 'o', boardSize) || game.verticalVictory(targetId, 'o', boardSize) || game.risingVictory(targetId, 'o', boardSize) || game.sinkingVictory(targetId, 'o', boardSize)) {
                            document.querySelector('#win-container').classList.replace('hide', 'show')
                            document.querySelector('#winner').textContent = 'O WINS!!!'
                        } else if (game.draw()) {
                            document.querySelector('#winner').textContent = "It's a draw!"
                            document.querySelector('#win-container').classList.replace('hide', 'show')
                        } else {
                            document.querySelector('#playerTurn').textContent = "X's turn!"
                            document.querySelector('#turns').textContent = 'Turns: ' + turns
                            oTurn = false
                        }
                    } else { 
                        turns += 1
                        event.currentTarget.textContent = 'x'
                        event.currentTarget.classList.replace('empty', 'x')
                        event.currentTarget.disabled = true
                        targetId = event.currentTarget.id
                        if (game.horizontalVictory(targetId, 'x', boardSize) || game.verticalVictory(targetId, 'x', boardSize) || game.risingVictory(targetId, 'x', boardSize) || game.sinkingVictory(targetId, 'x', boardSize)) {
                            document.querySelector('#winner').textContent = 'X WINS!!!'
                            document.querySelector('#win-container').classList.replace('hide', 'show')
                        } else if (game.draw()) {
                            document.querySelector('#winner').textContent = "It's a draw!"
                            document.querySelector('#win-container').classList.replace('hide', 'show')
                        } else {
                            document.querySelector('#playerTurn').textContent = "O's turn!"
                            document.querySelector('#turns').textContent = 'Turns: ' + turns
                            oTurn = true
                        }
                    }
                })
                document.querySelector('#content-container').appendChild(newTable)
            }
        }
        game.startGame()
    },
    startGame: function () {
        turns = 0
        document.querySelector('#turns').textContent = 'Turns: ' + turns
        const startTurn = Math.round(Math.random())
        if (startTurn === 1) {
            oTurn = true
            document.querySelector('#playerTurn').textContent = "O's turn!"
        } else {
            oTurn = false
            document.querySelector('#playerTurn').textContent = "X's turn!"
        }
    },
}
document.querySelector('#reset').addEventListener('click', function(){
    game.newBoard()
})
game.newBoard()