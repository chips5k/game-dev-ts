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
    
    simulate(deltaTime: number) {
        //Update position
        this.position.y += this.velocity.y * deltaTime;
        this.position.x += this.velocity.x * deltaTime;

        //Update velocity
        this.velocity.y += this.acceleration.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;

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


class Engine {

    window: Window;
    canvas: HTMLCanvasElement;
    graphicsContext: CanvasRenderingContext2D; 

    deltaTime: number;
    currentLoopStartTime: number;
    timeToSimulate: number;

    keysDown: { [id: string] : boolean};

    
    
    objects: RigidBody[];

    constructor(window: Window, canvas: HTMLCanvasElement, graphicsContext: CanvasRenderingContext2D) {
        this.window = window;
        this.canvas = canvas;
        this.graphicsContext = graphicsContext;
        this.objects = [new RigidBody(20, 40, new Vector2d(30, 30))];
    }

    start() {
        this.registerInputListeners();
       

        //updates per second - 60 updates per 1000 millisecond
        this.deltaTime = 1000 / 60;

        //Setup timers/trackers to default initial values
        this.currentLoopStartTime = this.window.performance.now();
        this.timeToSimulate = 0;

        //Trigger the initial loop
        this.loop();
    }

    registerInputListeners() {
        //Clear any keys
        this.keysDown = {};

        this.window.addEventListener('keydown', (e: KeyboardEvent) => { this.handleKeyDown(e); });
        this.window.addEventListener('keyup', (e: KeyboardEvent) => { this.handleKeyUp(e); });
    }

    handleKeyDown(e: KeyboardEvent) { 
        this.keysDown[e.key] = true; 
    }

    handleKeyUp(e: KeyboardEvent) {
       delete this.keysDown[e.key];
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

            //Apply gravity
            o.applyForce(new Vector2d(0, 0.0096));
            //apply basic friction
            o.applyForce(new Vector2d(o.velocity.x * -0.0026, 0));
            
            
            if(this.keysDown['d']) {
                o.applyForce(new Vector2d(0.0007, 0));
            }

            if(this.keysDown['a']) {
                o.applyForce(new Vector2d(-0.0007, 0));
            }
            if(this.keysDown[' ']) {
                if(o.velocity.y == 0) {
                    o.applyForce(new Vector2d(0, -0.08));
                }
            }

            
            o.simulate(deltaTime);
            
            if(o.position.y + o.height > this.canvas.height) {
                o.velocity.y = 0;
                o.position.y = this.canvas.height - o.height;
            }
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

 