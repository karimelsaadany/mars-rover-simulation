import { executeRoverSimulation } from './executeRoverSimulation';

const plateauDimensions = '5 5';
const roverInputs = [
    '1 2 N',
    'LMLMLMLMM',
    '3 3 E',
    'MMRMMRMRRM'
];

const results = executeRoverSimulation(plateauDimensions, roverInputs);

results.forEach(result => {
    console.log(result);
});
