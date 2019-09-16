import { Member } from './Member';

export class Meeting {
  meetingId: string;
  title: string;
  description: string;
  location: string;
  members: Member[];

  constructor(meetingId: string, title: string, description: string,
    location: string, members: Member[]) {
      this.meetingId = meetingId;
      this.title = title;
      this.description = description;
      this.location = location;
      this.members = members;
    }
}