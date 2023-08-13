export type DirectionType = 'N' | 'E' | 'S' | 'W';

export type CommandType = 'L' | 'R' | 'M';

export type RoverPosition = {
    xCoordinate: number;
    yCoordinate: number;
    facingDirection: DirectionType;
};

export type PlateauDimensions = {
    maxWidth: number;
    maxHeight: number;
};
