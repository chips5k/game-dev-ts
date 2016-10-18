class RigidBody {

    width: number;
    height: number;
    position: Vector2d;
    velocity: Vector2d;
    acceleration: Vector2d;

    constructor(width: number, height: number, position: Vector2d) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.velocity = new Vector2d(0, 0);
        this.acceleration = new Vector2d(0, 0);
    }

    applyForce(f: Vector2d) {
        this.acceleration.y += f.y;
        this.acceleration.x += f.x;
    }
    
    clearForces() {
        this.acceleration.y = 0;
        this.acceleration.x = 0;
    }
}

class Vector2d {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class GameObject {

}

class GameState {
    gameObjects: GameObject[];

    constructor() {
        this.gameObjects = [];
    }

    update(deltaTime: number) {
        var newState = new GameState();

    }
    
}

class InputManager {
    window: Window;
    keysDown: { [id: string] : boolean};
    //Clear any keys
    

    constructor(window: Window) {
        this.window = window;
        this.keysDown = {};
        this.registerListeners();
    }

    //This approach works for simple cases, but will eventually fall down.
    //a better approach might be to queue up the received events, and consume them
    //Cases such as detecting key release events, or timed events not handled in this setup
    registerListeners() {
        this.window.addEventListener('keydown', (e: KeyboardEvent) => { this.handleKeyDown(e); });
        this.window.addEventListener('keyup', (e: KeyboardEvent) => { this.handleKeyUp(e); });
    }
    
    handleKeyDown(e: KeyboardEvent) { 
        this.keysDown[e.key] = true; 
    }

    handleKeyUp(e: KeyboardEvent) {
       delete this.keysDown[e.key];
    }

    keyDown(key: string) {

        switch(key) {
            case 'space':
                return this.keysDown[' '];
        }

        return this.keysDown[key];
    }
}


class Engine {

    window: Window;
    canvas: HTMLCanvasElement;
    graphicsContext: CanvasRenderingContext2D; 
    inputManager: InputManager;

    deltaTime: number;
    currentLoopStartTime: number;
    timeToSimulate: number;

    objects: RigidBody[];

    constructor(window: Window, canvas: HTMLCanvasElement, graphicsContext: CanvasRenderingContext2D) {
        this.window = window;
        this.canvas = canvas;
        this.graphicsContext = graphicsContext;
        this.objects = [new RigidBody(20, 40, new Vector2d(30, 30))];

        //updates per second - 60 updates per 1000 millisecond
        this.deltaTime = 1000 / 60;
        this.inputManager = new InputManager(window);
    }

    start() {
       //Setup timers/trackers to default initial values
        this.currentLoopStartTime = this.window.performance.now();
        this.timeToSimulate = 0;

        //Trigger the initial loop
        this.loop();
    }

    loop() {

        //Queue the next run of this function FIRST - apparantly this is the best
        //approach for performance reasons in rel. to requestAnimationFrame
        this.window.requestAnimationFrame(() => { this.loop(); });

        //Shuffle timestamp values to track time betweeen loops
        let previousLoopStartTime = this.currentLoopStartTime;
        this.currentLoopStartTime = this.window.performance.now();

        //grab the time difference/delta between loop calls
        let timeSinceLastLoop = this.currentLoopStartTime - previousLoopStartTime; 
        
        //Calculate the time we want to simulate in this loop execution
        //If the timeSinceLastLoop is too large, we clamp it to prevent 
        //our game progressively slowing down and being unable to catch up.
        this.timeToSimulate += (timeSinceLastLoop > 250 ? 250 : timeSinceLastLoop);
        
        //While there are discrete delta chunks of time to simulate/consume
        while(this.timeToSimulate >= this.deltaTime) {
            
            //update in delta time increments
            this.update(this.deltaTime);
            //and consume a delta slice of simulator time
            this.timeToSimulate -= this.deltaTime;
        }
        
        //Next render an interpolation based on remaining unsimulated time
        this.render();
    }
    
    update(deltaTime: number) {

        for(let o of this.objects) {    

             //Update position
            o.position.y += o.velocity.y * deltaTime;
            o.position.x += o.velocity.x * deltaTime;

            //Check for collisions
            if(o.position.y + o.height > this.canvas.height) {
                //prevent clipping through the floor
                o.position.y = this.canvas.height - o.height;
            }

            //Clear forces
            o.clearForces();
            
            //Apply basic gravity
            o.applyForce(new Vector2d(0, 0.0096));

            if(o.position.y + o.height >= this.canvas.height) {
                o.velocity.y = 0;
                o.applyForce(new Vector2d(0, -0.0096));
            }

            //apply basic friction
            o.applyForce(new Vector2d(o.velocity.x * -0.0026, 0));
            
            //Handle input
            if(this.inputManager.keyDown('d')) {
                o.applyForce(new Vector2d(0.0007, 0));
            }

            if(this.inputManager.keyDown('a')) {
                o.applyForce(new Vector2d(-0.0007, 0));
            }

            if(this.inputManager.keyDown('space')) {
                if(o.velocity.y == 0) {
                    o.applyForce(new Vector2d(0, -0.05));
                }
            }

            //Update velocity
            o.velocity.y += o.acceleration.y * deltaTime;
            o.velocity.x += o.acceleration.x * deltaTime;

        }
    }

    render() {
        this.graphicsContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let o of this.objects) {
            
            this.graphicsContext.fillRect(
                o.position.x,
                o.position.y, 
                o.width, 
                o.height
            );
        }

    }

}






let canvas = <HTMLCanvasElement>document.getElementById("main");
let ctx = canvas.getContext("2d");

let engine = new Engine(window, canvas, ctx);

engine.start();

 