import GameStateObject from './GameStateObject';
import GameStateRenderer from './GameStateRenderer';

export default class GameState {
    private elapsed: number;
    private boundingWidth: number;
    private boundingHeight: number;

    private objects: GameStateObject[];
    

    constructor(w: number, h: number, e?: number, objects?: GameStateObject[]) {
        this.boundingWidth = w;
        this.boundingHeight = h;
        
        this.elapsed = 0;

        this.objects = objects ? objects : [];
    }

    addObject(o: GameStateObject) {
        this.objects.push(o);
    }

    accept(renderer: GameStateRenderer) {
        for(var i in this.objects) {
            renderer.visit(this.objects[i]);
        }
    }

    advance(milliseconds: number) {
        for(var i in this.objects) {

            var o = this.objects[i];

            if(o.x + 30 >= this.boundingWidth) {
                o.vX = -10;
            }

            if(o.x < 0) {
                o.vX = 10;
            }

            if(o.y + 30 >= this.boundingHeight) {
                o.vY = -10;
            }

            if(o.y < 0) {
                o.vY = 10;
            }

            o.update(milliseconds);
        }
    }

    clone(): GameState {
        return new GameState(this.boundingWidth, this.boundingHeight, this.elapsed, this.objects.map(function(n) {
            return n.clone();
        }));
    }

}