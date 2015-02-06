var App = function(global) {
    var exports = {};
    /**
     * Enemy NPC 
     * @param {string}(optional) type     type of enemy e.g. bug
     * @param {number}(optional) velocity how many pixels per frame 
     */
    var Enemy = function(type, velocity) {
        var row = Math.floor(Math.random() * 3 + 1);
        
        //set default values for the enemy
        velocity = velocity || Math.random() * 100;
        // make enemy go faster then that.
        this.velocity = velocity + 75;
        
        // The x y coordinates of the starting point of the enemy
        this.x = -101;
        this.y = row * 83;

        switch(type){
            default:
                this.sprite = 'images/enemy-bug.png';
        }
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + dt * this.velocity;

        //when enemy has moved outside the canvas view
        if (this.x > ctx.canvas.width) {
            //remove enemy from array and then
            allEnemies.splice(allEnemies.indexOf(this), 1);
            //add a new enemy
            allEnemies.push(new Enemy());
        }
    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 20);
    };

    // Now write your own player class
    // This class requires an update(), render() and
    // a handleInput() method.
    /**
     * Player constructor.
     * Creates a playable character
     * @param (optional) {string} name choose the type of the player
     */
    var Player = function(name){
        name = name || 'boy';
        switch(name){
            case ('boy'):
                this.sprite = 'images/char-boy.png';
                break;
            case ('princess'):
                this.sprite = 'images/char-princess-girl.png';
                break;
            case ('cat'):
                this.sprite = 'images/char-cat-girl.png';
                break;
            case ('horn'):
                this.sprite = 'images/char-horn-girl.png';
                break;
            case ('pink'):
                this.sprite = 'images/char-pink-girl.png';
                break;
        }
        
        //start coordinates
        this.y = 5 * 83  ;
        this.x = 2 * 101;
    };

    /**
     * change player x and y coordinates.
     * @param (optional) {number} to change x coordinate with
     * @param (optional) {number} to change y coordinate with
     * @return {void}
     */
    Player.prototype.update = function(x, y) {
        x = (x || 0) + this.x;
        y = (y || 0) + this.y;
        
        //prevent player from moving outside the canvas
        if (x < ctx.canvas.width && x >= 0  && y < ctx.canvas.height - 2 * 83 && y >= -20) {
            this.x = x ;
            this.y = y ;
        }
    };

    /**
     * render player sprite on canvas.
     */
    Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y -20);
    };

    /**
     * handle control buttons/key presses
     * @param  {string} eg up down left right.  
     * @return {void}
     */
    Player.prototype.handleInput = function(key){
        var x, y;

        switch(key){
            case ('up'):
                y =  -83;
                break;
            case ('down'):
                y = 83;
                break;
            case ('left'):
                x = -101;
                break;
            case ('right'):
                x = 101;
                break;
        }
        this.update(x,y);
    };


    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keydown', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    /**
     * Function to start the game
     * @param  {object} global the global object(in a browser this is the window object)
     * @return {void} 
     */
    exports.start = function(){
        // Make entities globally available for the game Engine
        allEnemies = [];
        global.allEnemies = allEnemies;
        global.player = new Player(); 

        allEnemies.push(new Enemy());
        allEnemies.push(new Enemy());
        allEnemies.push(new Enemy());
        allEnemies.push(new Enemy());
        allEnemies.push(new Enemy());
 
        console.log('starting the game');
    };


    exports.newCharacter = function(name){
        global.window.player = new Player(name);
    };
    return exports;

}(this);

App.start();