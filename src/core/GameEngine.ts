import GameState from './GameState';
import GameStateRenderer from './GameStateRenderer';

export default class Game {
    private window: any;
    private state: GameState;
    private renderer: GameStateRenderer;

    private startMillis: number;
    private currentMillis: number;
    private deltaMillis: number;
    private updateMillis: number;
    private accumulatedMillis: number;


    constructor(window: any, state: GameState, renderer: GameStateRenderer) {
        
        this.window = window;
        this.state = state;
        this.renderer = renderer;

        this.startMillis = this.window.performance.now();
        this.currentMillis = this.startMillis;
        this.deltaMillis = 0;
        this.accumulatedMillis = 0;
        //Target 60 updates per second
        this.updateMillis = 1000 / 60;
    
    }

    sleep(ticks: number)
    {
       
        var now = new Date().getTime();
        while(new Date().getTime() < now + ticks){ /* do nothing */ } 
    }

    run() {
        this.requestFrame();

        while(this.accumulatedMillis >= this.updateMillis) {
            let diff = this.accumulatedMillis - this.updateMillis;
            
            if(diff >= 0) {
                this.update();
                this.accumulatedMillis = diff;
            } else {
                break;
            }
        }   

        this.render();
    }

    update() {
        this.state.advance(this.updateMillis);
    }

    render() {
        var tState = this.state.clone();
        var interp = this.accumulatedMillis / 2;
        this.renderer.render(tState);
    }

    requestFrame() {
        
        let prevMillis = this.currentMillis;
        this.currentMillis = this.window.performance.now();
        this.deltaMillis = this.currentMillis - prevMillis;

        //Clamp the delta millis, to prevent spiral of death
        //E.g only allow a max of 9~ updates before rendering
        //Otherwise we begin lagging behind more and more
        //and never actually catch up
        if(this.deltaMillis > 150) {
            this.deltaMillis = 150;
        }

        this.accumulatedMillis += this.deltaMillis;
        this.window.requestAnimationFrame(() => { this.run(); });
    }


}

