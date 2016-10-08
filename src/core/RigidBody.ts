import Vector2d from './math/Vector2d';
export default class RigidBody {

    constructor(public dimensions: Vector2d, public position?: Vector2d, public velocity?: Vector2d, public acceleration?: Vector2d) {

        if(!position) {
            this.position = new Vector2d(0, 0);
        }

        if(!velocity) {
            this.velocity = new Vector2d(0, 0);
        }

        if(!acceleration) {
            this.acceleration = new Vector2d(0, 0);
        }
        
    }

    clone(): RigidBody {
        return new RigidBody(this.dimensions, this.position, this.velocity, this.acceleration);
    }
}