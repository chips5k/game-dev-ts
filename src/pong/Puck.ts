import GameStateObject from '../core/GameStateObject';
import RigidBody from '../core/RigidBody';
import Vector2d from '../core/math/Vector2d';
import Visitor from '../core/Visitor';

export default class Puck implements GameStateObject {
    
    rigidBody: RigidBody;
    
    constructor(position?: Vector2d) {
        this.rigidBody = new RigidBody(new Vector2d(10, 10), position ? position : new Vector2d(0, 0));
    }

    update(milliseconds: number) {

    }

    accept(v: Visitor) {
        
    }

    clone(): Puck {
       let p = new Puck(this.rigidBody.position);
       p.rigidBody.velocity = this.rigidBody.velocity.clone();
       return p;
    }
}