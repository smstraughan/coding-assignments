// Game data
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
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

// Render function - updates the display
function render() {
  // Update each cell
  $('.cell').each(function() {
    let index = $(this).data('index');
    $(this).text(board[index]);
  });
  
  // Update turn tracker
  $('#turn-tracker').text(currentPlayer + "'s Turn");
}

// Check for winner
function checkWinner() {
  let roundWon = false;
  
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }
  
  if (roundWon) {
    showAlert(`Player ${currentPlayer} Wins!`, 'success');
    gameActive = false;
    return;
  }
  
  // Check for draw
  if (!board.includes('')) {
    showAlert("It's a Draw!", 'warning');
    gameActive = false;
    return;
  }
}

// Show Bootstrap alert
function showAlert(message, type) {
  // Remove any existing alerts first
  $('.game-alert').remove();
  
  // Create banner at top
  $('body').prepend(`
    <div class="game-alert alert alert-${type} alert-dismissible fade show position-fixed top-0 start-0 w-100 m-0 rounded-0 text-center" role="alert" style="z-index: 9999; font-size: 1.5rem; padding: 1rem;">
      <strong>${message}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `);
}

// Handle cell click
$('.cell').on('click', function() {
  let index = $(this).data('index');
  
  // Only allow click if cell is empty and game is active
  if (board[index] !== '' || !gameActive) {
    return;
  }
  
  // Update data
  board[index] = currentPlayer;
  
  // Render the board
  render();
  
  // Check for winner
  checkWinner();
  
  // Switch player
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    render();
  }
});

// Reset button
$('#reset-btn').on('click', function() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  $('#alert-container').html('');
  render();
});

// Initial render
render();