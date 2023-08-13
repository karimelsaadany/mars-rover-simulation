import { executeRoverSimulation } from '../executeRoverSimulation';

describe('MarsRover Simulation', () => {
    it('should correctly process rover movements', () => {
        const plateauDimensions = '5 5';
        const roverInputs = [
            '1 1 S',
            'LLMMRMLMLM',
            '2 4 E',
            'MRRMMMLLLM'
        ];

        const expectedResults = [
            '1 4 W',
            '0 5 N'
        ];

        const results = executeRoverSimulation(plateauDimensions, roverInputs);

        expect(results).toEqual(expectedResults);
    });

    it.each([
        [
            'Invalid plateau dimensions input',
            '5',
            ['1 1 S', 'LLMMRMLMLM']
        ],
        [
            'The rover is trying to move out of the plateau boundaries',
            '5 5',
            ['1 1 S', 'LLMMRMLMLMMM']
        ],
        [
            'Rover position provided without command sequences',
            '5 5',
            ['1 1 S', 'LLMMRMLMLM', '2 4 E']
        ],
        [
            'Invalid rover position input',
            '5 5',
            ['1 S', 'LLMMRMLMLM']
        ],
        [
            'Invalid command sequence',
            '5 5',
            ['1 1 S', 'XLLMMRMLMLM', '2 4 E', 'MRRMMMLLLM']
        ]
    ])('should throw an error for invalid inputs when %s', (expectedError, plateauDimensions, roverInputs) => {
        expect(() => {
            executeRoverSimulation(plateauDimensions, roverInputs);
        }).toThrow(expectedError);
    });
});
