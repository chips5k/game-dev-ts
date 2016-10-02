interface GameStateObject {
    vY: number;
    vX: number;
    x: number;
    y: number;

    update(milliseconds: number): void;
    clone(): GameStateObject;
}

export default GameStateObject;