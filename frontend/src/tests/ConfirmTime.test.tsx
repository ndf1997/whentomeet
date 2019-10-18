import React from 'react';
import { InferProps } from 'prop-types';
import { shallow } from 'enzyme';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import ConfirmTime from '../components/ConfirmTime';
import Button from '@material-ui/core/Button';

describe('ConfirmTime tests', () => {
  let open: boolean;
  let time: string;
  let handleSelection: jest.Mock;
  let props: InferProps<typeof ConfirmTime.propTypes>;

  beforeAll(() => {
    open = true;
    time = 'Wednesday, 11:30am';
    handleSelection = jest.fn();
    props = {
      open,
      time,
      handleSelection,
    }
  });

  it('should render a dialog with title and actions', () => {
    const confirmTime = shallow(<ConfirmTime {...props} />);
    expect(confirmTime.find(Dialog).length).toEqual(1);
    expect(confirmTime.find(DialogTitle).text()).toEqual('Confirm Time Selected');
    const actions = confirmTime.find(DialogActions);
    expect(actions.find(Button).at(0).text()).toEqual('Cancel');
    expect(actions.find(Button).at(1).text()).toEqual('Schedule');
  });

  it('should render the correct time', () => {
    const confirmTime = shallow(<ConfirmTime {...props} />);
    const expectedContent = 'Schedule this meeting for ' + time + '?';
    expect(confirmTime.find(DialogContent).text()).toEqual(expectedContent);
  });

  it('should close when cancel clicked', () => {
    const confirmTime = shallow(<ConfirmTime {...props} />);
    const cancelButton = confirmTime.find(Button).first();
    cancelButton.simulate('click');
    expect(handleSelection).toBeCalledWith('');
  });

  it('should schedule when schedule clicked', () => {
    const confirmTime = shallow(<ConfirmTime {...props} />);
    const cancelButton = confirmTime.find(Button).last();
    cancelButton.simulate('click');
    expect(handleSelection).toBeCalledWith(time);
  });
});