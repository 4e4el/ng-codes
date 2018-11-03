
import { BoxIkCheatCode, InvalidCheatCode, UnreachableCheatCode, DuplicateCheatCode, CheatCodeError } from './types';
import { AllSpecialKeys } from './constants';
import { isLowerCase } from './utils';

/**
 * Check for invalid symbols in cheat code
 * @param cheatCode 
 */
export function cheatCodeErrors(cheatCode: BoxIkCheatCode): InvalidCheatCode | null {
  const invalidSymbols = [];
  for(let char of cheatCode.code) {
    if (AllSpecialKeys.includes(char)) {
      continue;
    }
    if (isLowerCase(char)) {
      continue;
    }
    invalidSymbols.push(char);
  }
  if (invalidSymbols.length > 0) {
    return new InvalidCheatCode(cheatCode, invalidSymbols);
  }
  return null;
}

/**
 * Check for unreachable cheat codes
 * @param cheatCodes sorted list of codes
 */
export function cheatCodeListErrors(cheatCodes: BoxIkCheatCode[]): CheatCodeError[] | null {
  let errors = [];
  for(let i = 0; i < cheatCodes.length; ++i) {
    let current = cheatCodes[i];
    
    for (let j = i + 1; j < cheatCodes.length; ++j) {
      let other = cheatCodes[j];
      if (other.code === current.code) {
        errors.push(new DuplicateCheatCode(other));
      }
      if (other.code.endsWith(current.code)) {
        continue;
      }
      if (other.code.includes(current.code)) {
        errors.push(new UnreachableCheatCode(other, current));
      }
    }
  }
  if (errors.length > 0) {
    return errors;
  }
  return null;
}