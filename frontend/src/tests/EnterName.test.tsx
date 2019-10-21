import React from 'react';
import { InferProps } from 'prop-types';
import { shallow } from 'enzyme';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import EnterName from '../components/EnterName';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

describe('EnterName tests', () => {
  let createNewUser: jest.Mock;
  let props: InferProps<typeof EnterName.propTypes>;

  beforeAll(() => {
    createNewUser = jest.fn();
    props = {
      createNewUser,
    }
  });

  it('should render a dialog with name field and enter button', () => {
    const confirmTime = shallow(<EnterName {...props} />);
    expect(confirmTime.find(Dialog).length).toEqual(1);
    expect(confirmTime.find(DialogTitle).text()).toEqual('Enter Name');
    expect(confirmTime.find(TextField).props().label).toEqual('Name');
    const actions = confirmTime.find(DialogActions);
    expect(actions.find(Button).first().text()).toEqual('Enter');
  });

  it('should not call create new user if no name is entered', () => {
    const confirmTime = shallow(<EnterName {...props} />);
    const enter = confirmTime.find(Button);
    enter.simulate('click');
    expect(createNewUser).toBeCalledTimes(0);
  });

  it('should call create new user when name is entered', () => {
    const confirmTime = shallow(<EnterName {...props} />);
    const textField = confirmTime.find(TextField);
    textField.simulate('change', { target: { value: 'Nick' }});
    const enter = confirmTime.find(Button);
    enter.simulate('click');
    expect(createNewUser).toBeCalledWith('Nick');
  });

});