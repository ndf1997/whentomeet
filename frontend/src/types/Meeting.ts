import PropTypes from 'prop-types';
import { Member, MemberPropType } from './Member';

export class Meeting {
  meeting_id: string;
  title: string;
  description: string;
  location: string;
  members: Member[];
  selectedTime: string;

  constructor(meeting_id: string = '', title: string = '', description: string = '',
    location: string = '', members: Member[] = [], selectedTime: string = 'none') {
      this.meeting_id = meeting_id;
      this.title = title;
      this.description = description;
      this.location = location;
      this.members = members;
      this.selectedTime = selectedTime;
    }
}

export const MeetingPropType = PropTypes.shape({
  meeting_id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(MemberPropType.isRequired).isRequired,
  selectedTime: PropTypes.string.isRequired,
});