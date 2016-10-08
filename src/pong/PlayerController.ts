import Paddle from './Paddle';

export default class PlayerController {
    constructor(public paddle: Paddle) {}

    handleInput(e: KeyboardEvent) {
        
        switch(e.key) {
            case 'a':
            case 'w':
               
                this.paddle.rigidBody.acceleration.y += -0.001;
                if(this.paddle.rigidBody.acceleration.y < -0.003) {
                    this.paddle.rigidBody.acceleration.y = 0;
                }

                
            break;

            case 's':
            case 'd':
                
                this.paddle.rigidBody.acceleration.y += 0.001;
                if(this.paddle.rigidBody.acceleration.y > 0.003) {
                    this.paddle.rigidBody.acceleration.y = 0;
                }
            break;
        }
        
    }


}   