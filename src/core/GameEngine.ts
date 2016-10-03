import GameState from './GameState';
import GameStateRenderer from './GameStateRenderer';

export default class Game {
    private window: any;
    private state: GameState;
    private renderer: GameStateRenderer;

    private totalSimulatedTime: number;
    private totalRunningTime: number;
    private deltaTime: number;
    private currentTime: number;
    private accumulatedTime: number;


    constructor(window: any, state: GameState, renderer: GameStateRenderer) {
        
        this.window = window;
        this.state = state;
        this.renderer = renderer;

        this.totalSimulatedTime = 0;
        this.totalRunningTime = 0;
        this.currentTime = 0;
        this.deltaTime = 1000 / 60; //60 updates per second
        this.accumulatedTime = 0;
    
    }
    
    run() {
        console.log('Total simulated time: ', this.totalSimulatedTime);
        console.log('Total running time: ', this.totalRunningTime);
        //Queue the next run first - apparantly this is the best
        //approach for performance reasons
        this.window.requestAnimationFrame(() => { this.run(); });

        //Update timestamps
        let previousTime = this.currentTime;
        this.currentTime = this.window.performance.now();

        //Calculate the time elapsed since the last run of the loop[]
        let timeSinceLastRun = this.currentTime - previousTime;
        this.totalRunningTime += timeSinceLastRun;

        //Clamp the max amount of catch up time per run loop
        //Prefer to slow the sim down consistently, rather 
        //than spiral into exponential slowness
        if(timeSinceLastRun > 250) {
            timeSinceLastRun = 250;
        }

        //Add on to the accumulated time tracker
        this.accumulatedTime += timeSinceLastRun;
        

        while(this.accumulatedTime >= this.deltaTime) {
            //Update in delta incremenets
            this.state.advance(this.deltaTime);
            //Consume a delta chunk of accumulated time
            this.accumulatedTime -= this.deltaTime;
            //Track the total simulated time
            this.totalSimulatedTime += this.deltaTime;
        }
        
        
        //Finally render the resulting frame
        var tState = this.state.clone();
        var interp = this.accumulatedTime / this.deltaTime;
        this.renderer.render(tState);
    }
    
}

