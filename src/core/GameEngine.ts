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
        this.updateMillis = 60 / 2;
    
    }

    run() {
        this.requestFrame();

        while(this.accumulatedMillis > 0) {
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
        this.state.advance(this.deltaMillis);
    }

    render() {
        var tState = this.state.clone();
        var interp = this.accumulatedMillis * 0.5;
        
        if(interp >= 5 && interp <= 16) {
            tState.advance(interp);
            
        } 
        this.renderer.render(tState);
    }

    requestFrame() {
        let prevMillis = this.currentMillis;
        this.currentMillis = this.window.performance.now();
        this.deltaMillis = this.currentMillis - prevMillis;
        this.accumulatedMillis += this.deltaMillis;
        this.window.requestAnimationFrame(() => { this.run(); });
    }


}

