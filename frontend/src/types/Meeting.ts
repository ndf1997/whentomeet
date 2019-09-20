import PropTypes from 'prop-types';
import { Member, MemberPropType } from './Member';

export class Meeting {
  meetingId: string;
  title: string;
  description: string;
  location: string;
  members: Member[];

  constructor(meetingId: string = '', title: string = '', description: string = '',
    location: string = '', members: Member[] = []) {
      this.meetingId = meetingId;
      this.title = title;
      this.description = description;
      this.location = location;
      this.members = members;
    }
}

export const MeetingPropType = PropTypes.shape({
  meetingId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  members: PropTypes.arrayOf(MemberPropType),
});