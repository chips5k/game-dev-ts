import Paddle from './Paddle';
import Puck from './Puck';

export default class AiController {

    constructor(public paddle: Paddle) {}

    
    handlePuckChange(puck: Puck) {

        let distanceY = puck.rigidBody.position.y + puck.rigidBody.dimensions.y / 2 -  this.paddle.rigidBody.position.y + this.paddle.rigidBody.dimensions.y / 2;

        
        if(puck.rigidBody.position.y + puck.rigidBody.dimensions.y / 2 < this.paddle.rigidBody.position.y + this.paddle.rigidBody.dimensions.y / 2) {
            this.paddle.rigidBody.acceleration.y = -0.025;
        }

        if(puck.rigidBody.position.y + puck.rigidBody.dimensions.y / 2 > this.paddle.rigidBody.position.y + this.paddle.rigidBody.dimensions.y / 2) {
            this.paddle.rigidBody.acceleration.y = 0.025;
        }


    }
    
    
}   