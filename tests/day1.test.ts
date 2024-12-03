import { dayOnePartOne, dayOnePartTwo } from "../src/day1";

describe('Day 1', () => {
  describe('Part 1', () => {
    test('Example data', () => {
      const result = dayOnePartOne('../inputs/day1_ex.txt');
      expect(result).toEqual(11)
    });
    test('Real data', () => {
      const result = dayOnePartOne('../inputs/day1.txt');
      console.log('Day 1 Part 1: ', result)
    });
  });
  describe('Part 2', () => {
    test('Example data', () => {
      const result = dayOnePartTwo('../inputs/day1_ex.txt');
      expect(result).toEqual(31)
    });
    test('Real data', () => {
      const result = dayOnePartTwo('../inputs/day1.txt');
      console.log('Day 1 Part 2: ', result)
    });
  });
});