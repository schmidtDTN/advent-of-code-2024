import { dayOnePartOne, dayOnePartTwo } from "../src/day1";
import { dayTwoPartOne, dayTwoPartTwo } from "../src/day2";
import { dayThreePartOne, dayThreePartTwo } from "../src/day3";

describe('Day 1', () => {
  describe('Part 1', () => {
    test('Example data', () => {
      const result = dayOnePartOne('../inputs/day1_ex.txt');
      expect(result).toEqual(11)
    });
    test('Real data', () => {
      const result = dayOnePartOne('../inputs/day1.txt');
      // console.log('Day 1 Part 1: ', result)
      expect(result).toEqual(1765812);
    });
  });
  describe('Part 2', () => {
    test('Example data', () => {
      const result = dayOnePartTwo('../inputs/day1_ex.txt');
      expect(result).toEqual(31)
    });
    test('Real data', () => {
      const result = dayOnePartTwo('../inputs/day1.txt');
      // console.log('Day 1 Part 2: ', result)
      expect(result).toEqual(20520794)
    });
  });
});

describe('Day 2', () => {
  describe('Part 1', () => {
    test('Example data', () => {
      const safetyReport = dayTwoPartOne('../inputs/day2_ex.txt');
      expect(safetyReport).toEqual([true, false, false, false, false, true, false])
      const safeReportCount = safetyReport.filter((isSafe) => isSafe === true).length
      expect(safeReportCount).toEqual(2);
    });
    test('Real data', () => {
      const safetyReport = dayTwoPartOne('../inputs/day2.txt');
      const safeReportCount = safetyReport.filter((isSafe) => isSafe === true).length
      // console.log('Day 2 Part 1: ', safeReportCount)
      expect(safeReportCount).toEqual(246);
    });
  });
  describe('Part 2', () => {
    test('Example data', () => {
      const safetyReport = dayTwoPartTwo('../inputs/day2_ex.txt');
      expect(safetyReport).toEqual([true, false, false, true, true, true, true])
      const safeReportCount = safetyReport.filter((isSafe) => isSafe === true).length
      expect(safeReportCount).toEqual(5);
    });
    test('Real data', () => {
      const safetyReport = dayTwoPartTwo('../inputs/day2.txt');
      const safeReportCount = safetyReport.filter((isSafe) => isSafe === true).length
      // console.log('Day 2 Part 2: ', safeReportCount)
      expect(safeReportCount).toEqual(318);
    });
  });
});

describe('Day 3', () => {
  describe('Part 1', () => {
    test('Example data', () => {
      const result = dayThreePartOne('../inputs/day3_ex.txt');
      expect(result).toEqual(161);
    });
    test('Real data', () => {
      const result = dayThreePartOne('../inputs/day3.txt');
      // console.log('Day 3 Part 1: ', result)
      expect(result).toEqual(173517243);
    });
  });
  describe('Part 2', () => {
    test('Example data', () => {
      const result = dayThreePartTwo('../inputs/day3_part2_ex.txt');
      expect(result).toEqual(48);
    });
    test('Real data', () => {
      const result = dayThreePartTwo('../inputs/day3.txt');
      // console.log('Day 3 Part 2: ', result)
      expect(result).toEqual(100450138);
    });
  });
});