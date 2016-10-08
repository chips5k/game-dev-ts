import GameStateObject from './GameStateObject';
import GameStateRenderer from './GameStateRenderer';
import GameStateSimulator from './GameStateSimulator';
import Visitable from './Visitable';
import Visitor from './Visitor';

export default class GameState implements Visitable{
    objects: GameStateObject[] = [];
    
    constructor() { }

    addObject(o: GameStateObject) {
        this.objects.push(o);
    }

    accept(visitor: Visitor) {
       for(var i in this.objects) {
            visitor.visit(this.objects[i]);
        }
    }
    
 
    clone(): GameState {
        let gs = new GameState();
        gs.objects = this.objects.map(function(n) {
            return n.clone();
        });

        return gs;
    }

}