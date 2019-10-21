import PropTypes from 'prop-types';
import { Member, MemberPropType } from './Member';
import {Comment, CommentPropType } from './Comment';
import {Poll, PollPropType} from './Poll';

export class Meeting {
  meeting_id: string;
  title: string;
  description: string;
  location: string;
  members: Member[];
  selectedTime: string;
  url: string;
  commentlist: Comment[];
  poll: Poll;
  creatorId: string;

  constructor(meeting_id: string = '', title: string = '', description: string = '',
    location: string = '', members: Member[] = [], selectedTime: string = 'none', url: string = '', commentlist: Comment[] = [], 
    poll: Poll = new Poll('',[]), creatorId: string = ''
    ) {
      this.meeting_id = meeting_id;
      this.title = title;
      this.description = description;
      this.location = location;
      this.members = members;
      this.selectedTime = selectedTime;
      this.url = url;
      this.commentlist = commentlist;
      this.poll = poll;
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
  commentlist: PropTypes.arrayOf(CommentPropType.isRequired).isRequired,
  poll: PollPropType.isRequired,
  creatorId: PropTypes.string,
});