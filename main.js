let player1='X';
let player2='O';
let user,computer;
let turn=0;
let currentPlayer;
const cells = $(".square");
let vs;
$(document).ready(function(){
    $(".play-btn").click(function(){
        $(".play-btn").hide();
        $(".choice").show();
        $(".reset-section").show();
    });      

    $(".playerbtn").click(function(){
        let a=$(this).attr('id');
        if(a==='1p')
            vs="computer";
        else
            vs="player";    
        $(".choice").hide();
        $(".XOchoice").show();
    });      


    $(".XObutton").click(function(){
        let a=$(this).attr('id');
        if(a==='X')
        {
            player1='X';
            player2='O';
        }
        else
        {
            player1='O';
            player2='X';
        }
        console.log(player1);
        $(".XOchoice").hide();
        $(".gameboard").show();
        startGame();
    });
    function startGame(){
        if(vs==="computer")
        {
            user=player1;
            computer=player2;
            arr = [0,1,2,3,4,5,6,7,8];
            for (let i = 0; i < cells.length; i++){
            $(cells[i]).click(function(){
            let z=$(this).attr('id');
            if($(this).text()==="")
                {
                    arr[z]=user;
                    $(this).append(user);
                    currentPlayer="You";
                
                }
            else
                {
                    alert("Wrong Move");
                    turn--;
                }
            
            resultCheck(cells);
            if(!checkDraw()){console.log('Aryaman');
            let x=minimax(arr, computer);
            console.log(x);
            arr[x]=computer;
            console.log(arr);
            $('#'+x).append(computer);
            currentPlayer="Computer";
            resultCheck(cells);}
            });
        }
        }
        else
        {turn=0;
        for (let i = 0; i < cells.length; i++){
            $(cells[i]).click(function(){
            if(turn%2===0)
            {
                if($(this).text()==="")
                {
                    $(this).append(player1);
                    currentPlayer="Player 1";
                }
                else
                {
                    alert("Wrong Move");
                    turn--;
                }
            }
    		else 
            {
                if($(this).text()==="")
                {
                    $(this).append(player2);
                    currentPlayer="Player 2";
                }
                else
                {
                    alert("Wrong Move");
                    turn--;
                }
            }
            resultCheck(cells);
    		turn++;
            });
        }}
    }
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function resultCheck(cells) {
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = $(cells[winCondition[0]]).text();
            let b = $(cells[winCondition[1]]).text();
            let c = $(cells[winCondition[2]]).text();
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                $(".result").append(`${currentPlayer} Wins!`);
                $("#overlay").css("display","flex");
                return;
            }
        }
        let k=0;
        for (let i = 0; i < 9; i++) {
            if ($(cells[i]).html()!="") {
                k++;
            }
            if (k==9) {
                $(".result").append(`Match Draw`);
                $("#overlay").css("display","flex");
                return;
            }
        }
    }
    function checkWinner(board,player){
        if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)) {
        return true;
        } 
        return false;
       }       
       function emptybox() 
       {  let emptyspots=[],k=0;
           for(let i=0;i<9;i++)
                   if (typeof arr[i]=='number') 
                       emptyspots[k++]=i; 
           return emptyspots; 
       }
       function checkDraw() {
        if (emptybox().length == 0) {
            return true;
        }
        return false;
    }
    function minimax(newBoard, player) {
        let emptyspots = emptybox();
    
        if (checkWinner(newBoard, user)) {
            return -10;
        } else if (checkWinner(newBoard, computer)) {
            return 10;
        } else if (emptyspots.length === 0) {
            return 0;
        }
    
        let score = [];
        let index=[];
        for (let i = 0; i < emptyspots.length; i++) {
            let val,j
            j = newBoard[emptyspots[i]];
            newBoard[emptyspots[i]] = player;
            
            if (player == computer) {
                val=-10000;
                let result = minimax(newBoard, user);
                val=Math.max(result,val);
            } else {
                val=10000;
                let result = minimax(newBoard, computer);
                val=Math.min(val,result);
            }
    
            newBoard[emptyspots[i]] = j;
            score.push(val);
            index.push(j);
        }
    
        let bestMove;
        if (player === computer) {
            let bestScore = -10000;
            for (let i = 0; i < score.length; i++) {
                if (score[i] > bestScore) {
                    bestScore = score[i];
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < score.length; i++) {
                if (score[i] < bestScore) {
                    bestScore = score[i];
                    bestMove = i;
                }
            }
        }
        return index[bestMove];
    }
});
function off(element) {
    document.getElementById(element).style.display = "none";
}