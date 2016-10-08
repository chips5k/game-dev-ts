import GameState from './GameState';
import GameStateRenderer from './GameStateRenderer';
import GameStateSimulator from './GameStateSimulator';
export default class GameEngine {

    totalSimulatedTime: number = 0;
    totalRunningTime: number = 0;
    deltaTime: number = 1000 / 60;
    currentTime: number = 0;
    accumulatedTime: number = 0;

    constructor(public window: Window, public state: GameState, public renderer: GameStateRenderer, public simulator: GameStateSimulator) {}
    
    run() {
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
            this.simulator.simulate(this.state, this.deltaTime);
            //Consume a delta chunk of accumulated time
            this.accumulatedTime -= this.deltaTime;
            //Track the total simulated time
            this.totalSimulatedTime += this.deltaTime;
        }
        
        
        //Finally render the resulting frame
        let tState = this.state.clone();
        this.simulator.simulate(tState, this.accumulatedTime / this.deltaTime);

        this.renderer.render(tState);
    }
    
}

