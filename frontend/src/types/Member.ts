import { Day } from './Day';

export class Member {
  memberId: string;
  name: string;
  days: Day[];
  pollingChoice?: number;

  constructor(memberId: string, name: string, days: Day[]) {
    this.memberId = memberId;
    this.name = name;
    this.days = days;
  }
}