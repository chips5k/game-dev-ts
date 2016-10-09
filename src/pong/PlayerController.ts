import Paddle from './Paddle';

export default class PlayerController {
    private keysDown: { [id: string] : boolean} = {};

    constructor(public paddle: Paddle) {}

    handleKeyDown(e: KeyboardEvent) { 
        this.keysDown[e.key] = true;
        
        
    }

    handleKeyUp(e: KeyboardEvent) {
       delete this.keysDown[e.key];
    }

    processInput() {
        
        if(this.keysDown['a'] || this.keysDown['w']) {
            
            this.paddle.rigidBody.acceleration.y = -0.025;
        }

        if(this.keysDown['s'] || this.keysDown['d']) {
            this.paddle.rigidBody.acceleration.y = 0.025;
        }
    }
    
}   