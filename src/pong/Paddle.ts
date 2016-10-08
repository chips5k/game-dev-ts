import GameStateObject from '../core/GameStateObject';
import RigidBody from '../core/RigidBody';
import Vector2d from '../core/math/Vector2d';
import Visitor from '../core/Visitor';

export default class Paddle implements GameStateObject {
    
    rigidBody: RigidBody;
    
    constructor(position?: Vector2d) {
        this.rigidBody = new RigidBody(new Vector2d(10, 60), position ? position : new Vector2d(0, 0));
    }

    update(milliseconds: number) {

    }

    accept(v: Visitor) {
        
    }

    clone(): Paddle {
       let p = new Paddle(this.rigidBody.position);
       p.rigidBody.velocity = this.rigidBody.velocity.clone();

       return p;
    }

    

}