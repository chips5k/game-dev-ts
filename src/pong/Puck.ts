import GameStateObject from '../core/GameStateObject';

export default class Puck implements GameStateObject {
    public x: number;
    public y: number;
    public w: number;
    public h: number;
    public vX: number;
    public vY: number;

    constructor(x: number, y: number, vX?: number, vY?: number) {
        this.x = x;
        this.y = y;
        this.w = 30;
        this.h = 30;
        this.vX = vX ? vX : 10;
        this.vY = vY ? vY : 10;

    }

    update(milliseconds: number) {
        this.x += this.vX;
        this.y += this.vY;
    }

    clone(): Puck {
        return new Puck(this.x, this.y, this.vX, this.vY);
        
    }

}