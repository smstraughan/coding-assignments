let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

let player1 = "X";
let player2 = "O";

let turn = 0;
let winner = false;

$('#alertStart').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();


//Keep track of current player
let currentPlayer = '';

const winningOutcomes = [
    [box0, box1, box2], 
    [box3, box4, box5],
    [box6, box7, box8],
    [box0, box3, box6],
    [box1, box4, box7],
    [box2, box5, box8],
    [box0, box4, box8],
    [box2, box4, box6]
];

function endGame() {
    console.log("Game Ended.");
    $('.box').css("pointer-events", "none");
    $('#p1').removeClass("bg-light border border-info");
    $('#p2').removeClass("bg-light border border-info")
};

function checkWinner(currentPlayer, a, b, c) {


    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer){
        winner = true;
        console.log(`Found winner, it's ${currentPlayer}`);

        a.removeClass("text-info bg-dark");
        a.addClass("text-dark bg-info");
        b.removeClass("text-info bg-dark");
        b.addClass("text-dark bg-info");
        c.removeClass("text-info bg-dark");
        c.addClass("text-dark bg-info");

        $('#alertWinner').text(`GAME OVER! ${currentPlayer} WINS!`)
        $('#alertWinner').show();

        endGame()
        
}
}

function checkOutcomes() {

    checkWinner(currentPlayer, ...winningOutcomes[0]);
    checkWinner(currentPlayer, ...winningOutcomes[1]);
    checkWinner(currentPlayer, ...winningOutcomes[2]);
    checkWinner(currentPlayer, ...winningOutcomes[3]);
    checkWinner(currentPlayer, ...winningOutcomes[4]);
    checkWinner(currentPlayer, ...winningOutcomes[5]);
    checkWinner(currentPlayer, ...winningOutcomes[6]);
    checkWinner(currentPlayer, ...winningOutcomes[7]);

    if(turn === 9 && winner === false){
        endGame();
        $('#alertDraw').show()
    }
}

function startGame() {
    console.log('Start Game!');
    console.log(turn++);
    currentPlayer = player1;
    console.log(currentPlayer);

    $('#p1').addClass("bg-light border border-info");

    //show the start alert
    $('#alertStart').show();

    $('.box').on('click', function(){
        $('#alertStart').hide();

        $(this).text(currentPlayer);

        if(turn > 4){
            //check winners
            console.log('Winner?');
            checkOutcomes();
        }

        if(winner === false && turn < 9){

        if(currentPlayer === player1){
            currentPlayer = player2;
            console.log(turn++);
            $('#p2').addClass("bg-light border border-info");
            $('#p1').removeClass("bg-light border border-info");
        } else{
            currentPlayer = player1
            console.log(turn++);
            $('#p1').addClass("bg-light border border-info");
            $('#p2').removeClass("bg-light border border-info");
        }
    }
        



    
    })

}





document.getElementById('startBtn').addEventListener('click',()=> startGame());

document.getElementById('resetBtn').addEventListener('click',()=> document.location.reload(true));
