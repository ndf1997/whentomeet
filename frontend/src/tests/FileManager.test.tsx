import React from 'react';
import { InferProps } from 'prop-types';
import { shallow } from 'enzyme';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FileManager from '../components/FileManager';
import UploadFiles from '../components/UploadFiles';
import FileList from '../components/FileList';

describe('FileManager tests', () => {
  let meetingId: string;
  let open: boolean;
  let closeFileDialog: jest.Mock;
  let props: InferProps<typeof FileManager.propTypes>;

  beforeAll(() => {
    meetingId = '1234';
    closeFileDialog = jest.fn();
    open = true;
    props = {
      meetingId,
      closeFileDialog,
      open,
    }
  });

  it('should render a dialog with title, filelist, and actions', () => {
    const fileManager = shallow(<FileManager {...props} />);
    const title = fileManager.find(DialogTitle);
    expect(title.text()).toEqual('File Manager');
    const fileList = fileManager.find(DialogContent).find(FileList);
    expect(fileList.length).toEqual(1);
    const uploadFiles = fileManager.find(DialogActions).find(UploadFiles);
    expect(uploadFiles.length).toEqual(1);
  });

  it('should close the dialog box when cancel is clicked', () => {
    const fileManager = shallow(<FileManager {...props} />);
    const button = fileManager.find(Button);
    button.simulate('click');
    expect(closeFileDialog).toBeCalled();
  });
});