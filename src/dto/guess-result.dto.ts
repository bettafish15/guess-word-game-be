export enum ResultKind {
  ABSENT = 'absent',
  PRESENT = 'present',
  CORRECT = 'correct'
}

export class GuessResult {
  slot: number;
  guess: string;
  result: ResultKind;
}
