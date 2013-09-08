gambit.js - A bootstrap for your HTML games
===========================================

Usage
-----

```javascript
var game = new Gambit({
  events : {
    after_game_over : function() {
      console.log('Game over! Your Score is: ' + this.total_score);
    },
    after_move : function() {
      this.total_score += 10;
    }
  }
});

game.move();
game.move();
game.move();

game.gameOver = function() {
  this.fire('after_game_over', this);
};
```