import { Member } from '../types/Member';
import { Day } from '../types/Day';

export const testMembers: Member[] = [
  new Member('', 'Nick', [
    new Day('Monday', [
      '9:30am',
      '10:00am',
      '1:00pm',
      '1:30pm',
    ]),
    new Day('Wednesday', [
      '9:30am',
      '10:00am',
      '1:00pm',
      '1:30pm',
      '2:00pm',
      '2:30pm',
    ])
  ]),
  new Member('', 'Mihir', [
    new Day('Monday', [
      '9:30am',
      '10:00am',
      '1:00pm',
      '1:30pm',
      '2:00pm'
    ]),
  ]),
  new Member('', 'Ben', [
    new Day('Monday', [
      '1:00pm',
      '1:30pm',
    ]),
    new Day('Wednesday', [
      '9:30am',
      '10:00am',
      '1:00pm',
      '2:00pm'
    ]),
    new Day('Thursday', [
      '9:30am',
      '10:00am',
      '1:00pm',
      '2:00pm'
    ]),
  ]),
]