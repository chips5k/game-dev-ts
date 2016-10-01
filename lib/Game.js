'use strict';

function Game(window, gameState, renderer) {
    this.window = window;
    this.startMillis = this.window.performance.now();
    this.currentMillis = this.startMillis;
    this.deltaMillis = 0;
    this.updateMillis = 60 / 2;
    this.accumulated = 0;
    this.renderer = renderer;
    this.gameState = gameState;
}


Game.prototype.run = function() {
    
    this.requestFrame();

    while(this.accumulated > 0) {
        let diff = this.accumulated - this.updateMillis;
        
        if(diff >= 0) {
            this.update();
            this.accumulated = diff;
        } else {
            break;
        }
    }   

    this.render();

}

Game.prototype.update = function() {
    
    this.gameState.advance(this.deltaMillis);

}

Game.prototype.requestFrame = function() {
    let prevMillis = this.currentMillis;
    this.currentMillis = this.window.performance.now();
    this.deltaMillis = this.currentMillis - prevMillis;
    this.accumulated += this.deltaMillis;
    this.window.requestAnimationFrame(() => { this.run(); });
}

Game.prototype.render = function() {
    var tGameState = this.gameState.clone();
    var interp = this.accumulated * 0.5;
    
    if(interp >= 5 && interp <= 16) {
        tGameState.advance(interp);
        
    } 
    this.renderer.render(tGameState);

}

function GameState(boundingWidth, boundingHeight) {
    this.elapsed = 0;
    this.bounds = {
        width: boundingWidth,
        height: boundingHeight
    };

    this.gameObjects = [];

}

//Retrieve the game state for elapsed milliseconds
GameState.prototype.advance = function(deltaMillis) {
    
    for(var i in this.gameObjects) {

        var o = this.gameObjects[i];

        if(o.x + 30 >= this.bounds.width) {
            o.vX = -5;
        }

        if(o.x < 0) {
            o.vX = 5;
        }

        if(o.y + 30 >= this.bounds.height) {
            o.vY = -5;
        }

        if(o.y < 0) {
            o.vY = 5;
        }

        o.update(deltaMillis);
    }
}

GameState.prototype.clone = function() {
    var gs = new GameState(this.boundingWidth, this.boundingHeight);
    
    gs.elapsed = this.elapsed;
    gs.gameObjects = this.gameObjects.map(function(n) {
        return n.clone();
    });

    return gs;
}


function SimpleSquareGameObject() {
    this.x = 0;
    this.y = 0;
    this.w = 30;
    this.h = 30;
    this.vX = 5;
    this.vY = 5;
    
}

SimpleSquareGameObject.prototype.update = function(millis) {
    

    this.x += this.vX;
    this.y += this.vY;

}

SimpleSquareGameObject.prototype.clone = function() {
    var s = new SimpleSquareGameObject();
    s.x = this.x;
    s.y = this.y;
    s.w = this.w;
    s.h = this.h;
    s.vX = this.vX;
    s.vY = this.vY;

    return s;
}

function SimpleRenderer(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
}

SimpleRenderer.prototype.render = function(gameState) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for(var i in gameState.gameObjects ) {
        switch(gameState.gameObjects[i].constructor.name) {
            case 'SimpleSquareGameObject':
                this.renderSimpleSquareGameObject(gameState.gameObjects[i]);
            break;
        }
    }
}

SimpleRenderer.prototype.renderSimpleSquareGameObject = function(obj) {
    this.ctx.fillRect(obj.x,obj.y, obj.w, obj.h);
}