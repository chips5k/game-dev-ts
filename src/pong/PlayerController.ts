import Paddle from './Paddle';

export default class PlayerController {
    constructor(public paddle: Paddle) {}

    handleInput(e: KeyboardEvent) {
        
        switch(e.key) {
            case 'a':
            case 'w':
                this.paddle.rigidBody.acceleration.y += -0.01;
            break;

            case 's':
            case 'd':
                this.paddle.rigidBody.acceleration.y += 0.01;
            break;
        }
        
    }


}   