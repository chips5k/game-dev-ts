import Paddle from './Paddle';
import Puck from './Puck';

export default class AiController {

    constructor(public paddle: Paddle) {}

    
    handlePuckChange(puck: Puck) {

        let distanceY = puck.rigidBody.position.y + puck.rigidBody.dimensions.y / 2 -  this.paddle.rigidBody.position.y + this.paddle.rigidBody.dimensions.y / 2;


        //Calculate distance from puck X coord to paddle X coord   
        let distanceToPaddleX = this.paddle.rigidBody.position.x - puck.rigidBody.position.x;
        //Calcualte the time it will take the pucks X coord to reach the paddles X coord
        let millisecondsToPaddleX = distanceToPaddleX / puck.rigidBody.velocity.x;

        //Calculate where the pucks y coord will be after millisecondsToPaddleX
        let puckYIntercept = puck.rigidBody.position.y + puck.rigidBody.velocity.y * millisecondsToPaddleX
        
        //Calculate required forces to intercept the pucks path
        
        

    }
    
    
}   