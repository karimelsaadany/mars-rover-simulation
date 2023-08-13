import {
    DirectionType,
    CommandType,
    RoverPosition,
    PlateauDimensions
} from './types';

export class MarsRover {
    currentRoverPosition: RoverPosition;
    plateauBoundary: PlateauDimensions;

    private rotationOrderClockwise: DirectionType[] = ['N', 'E', 'S', 'W']
    private rotationOrderCounterClockwise: DirectionType[] = ['N', 'W', 'S', 'E']

    constructor(initialPosition: RoverPosition, plateau: PlateauDimensions) {
        this.currentRoverPosition = initialPosition;
        this.plateauBoundary = plateau;
    }

    moveForward(): void {
        switch (this.currentRoverPosition.facingDirection) {
            case 'N':
                this.currentRoverPosition.yCoordinate++;
                break;
            case 'E':
                this.currentRoverPosition.xCoordinate++;
                break;
            case 'S':
                this.currentRoverPosition.yCoordinate--;
                break;
            case 'W':
                this.currentRoverPosition.xCoordinate--;
                break;
        }
    }

    rotateLeft(): void {
        const currentIndex = this.rotationOrderCounterClockwise.indexOf(this.currentRoverPosition.facingDirection);
        this.currentRoverPosition.facingDirection = this.rotationOrderCounterClockwise[(currentIndex + 1) % 4];
    }

    rotateRight(): void {
        const currentIndex = this.rotationOrderClockwise.indexOf(this.currentRoverPosition.facingDirection);
        this.currentRoverPosition.facingDirection = this.rotationOrderClockwise[(currentIndex + 1) % 4];
    }

    processSingleCommand(command: CommandType): void {
        switch (command) {
            case 'M':
                this.moveForward();
                break;
            case 'L':
                this.rotateLeft();
                break;
            case 'R':
                this.rotateRight();
                break;
        }
    }

    executeCommandSequence(commandSequence: CommandType[]): void {
        for (let command of commandSequence) {
            this.processSingleCommand(command);
            if (!this.isWithinPlateauBoundaries()) {
                throw new Error('The rover is trying to move out of the plateau boundaries');
            }
        }
    }

    private isWithinPlateauBoundaries(): boolean {
        return this.currentRoverPosition.xCoordinate >= 0 &&
               this.currentRoverPosition.xCoordinate <= this.plateauBoundary.maxWidth &&
               this.currentRoverPosition.yCoordinate >= 0 &&
               this.currentRoverPosition.yCoordinate <= this.plateauBoundary.maxHeight;
    }
}
