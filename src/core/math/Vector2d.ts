export default class Vector2d {
    
    constructor(public x: number, public y: number) {}

    clone() {
        return new Vector2d(this.x, this.y);
    } 
 
}