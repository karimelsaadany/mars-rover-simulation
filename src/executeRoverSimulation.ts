import {
    CommandType,
    RoverPosition,
    PlateauDimensions,
    DirectionType
} from './types';
import { MarsRover } from './MarsRover';

export const executeRoverSimulation = (
    plateauDimensionsInput: string,
    roversInput: string[]
): string[] => {
    if (roversInput.length % 2 !== 0) {
        throw new Error('Rover position provided without command sequences');
    }

    const [maxWidthStr, maxHeightStr] = plateauDimensionsInput.split(' ');
    if (!maxWidthStr || !maxHeightStr) {
        throw new Error('Invalid plateau dimensions input');
    }

    const maxWidth = Number(maxWidthStr);
    const maxHeight = Number(maxHeightStr);
    const plateauBoundary: PlateauDimensions = { maxWidth, maxHeight };

    const results: string[] = [];

    for (let i = 0; i < roversInput.length; i += 2) {
        const [xCoordinateStr, yCoordinateStr, facingDirection] = roversInput[i].split(' ');

        if (!xCoordinateStr || !yCoordinateStr || !facingDirection) {
            throw new Error('Invalid rover position input');
        }

        const xCoordinate = Number(xCoordinateStr);
        const yCoordinate = Number(yCoordinateStr);

        const initialPosition: RoverPosition = {
            xCoordinate,
            yCoordinate,
            facingDirection: facingDirection as DirectionType,
        };
        
        const commandSequence: CommandType[] = roversInput[i + 1].split('') as CommandType[];

        if (!commandSequence.every(command => ['L', 'M', 'R'].includes(command))) {
            throw new Error('Invalid command sequence');
        }

        const marsRover = new MarsRover(initialPosition, plateauBoundary);
        marsRover.executeCommandSequence(commandSequence);

        results.push(`${marsRover.currentRoverPosition.xCoordinate} ${marsRover.currentRoverPosition.yCoordinate} ${marsRover.currentRoverPosition.facingDirection}`);
    }

    return results;
};
