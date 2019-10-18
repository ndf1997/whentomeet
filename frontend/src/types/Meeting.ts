import PropTypes from 'prop-types';
import { Member, MemberPropType } from './Member';

export class Meeting {
  meeting_id: string;
  title: string;
  description: string;
  location: string;
  members: Member[];
  selectedTime: string;
  url: string;
  creatorId: string;

  constructor(meeting_id: string = '', title: string = '', description: string = '',
    location: string = '', members: Member[] = [], selectedTime: string = 'none', url: string = '',
    creatorId: string = '') {
      this.meeting_id = meeting_id;
      this.title = title;
      this.description = description;
      this.location = location;
      this.members = members;
      this.selectedTime = selectedTime;
      this.url = url;
      this.creatorId = creatorId;
    }
}

export const MeetingPropType = PropTypes.shape({
  meeting_id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(MemberPropType.isRequired).isRequired,
  selectedTime: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  creatorId: PropTypes.string,
});