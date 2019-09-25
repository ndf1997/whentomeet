import PropTypes from 'prop-types';
import { Member, MemberPropType } from './Member';

export class Meeting {
  meeting_id: string;
  title: string;
  description: string;
  location: string;
  members: Member[];

  constructor(meeting_id: string = '', title: string = '', description: string = '',
    location: string = '', members: Member[] = []) {
      this.meeting_id = meeting_id;
      this.title = title;
      this.description = description;
      this.location = location;
      this.members = members;
    }
}

export const MeetingPropType = PropTypes.shape({
  meeting_id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  members: PropTypes.arrayOf(MemberPropType),
});