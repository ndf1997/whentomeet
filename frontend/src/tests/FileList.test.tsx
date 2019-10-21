import React from 'react';
import { InferProps } from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FileList from '../components/FileList';
import { shallow } from 'enzyme';

import { File } from '../types/File';

describe('FileTest tests', () => {
  let files: File[];
  let deleteFile: jest.Mock;
  let props: InferProps<typeof FileList.propTypes>;

  beforeAll(() => {
    files = [
      new File('firstFile.pdf', 'google.com'),
      new File('secondFile.txt', 'bing.com'),
      new File('thirdFile.zip', 'amazon.com')
    ];
    deleteFile = jest.fn();
    props = {
      files,
      deleteFile,
    }
  });
  
  it('should render an unordered list', () => {
    const fileList = shallow(<FileList {...props} />);
    const ul = fileList.find(List);
    expect(ul.length).toEqual(1);
  });

  it('should render a list of files', () => {
    const fileList = shallow(<FileList {...props} />);
    const li = fileList.find(ListItem);
    expect(li.length).toEqual(3);
  });

  it('should render link and delete button for each file', () => {
    const fileList = shallow(<FileList {...props} />);
    const li = fileList.find(ListItem).first();
    expect(li.find(Link).props().href).toEqual('google.com');
    expect(li.find(Link).text()).toEqual('firstFile.pdf');
    expect(li.find(DeleteIcon).length).toEqual(1);
  });

  it('should call deleteFile when delete button is clicked', () => {
    const fileList = shallow(<FileList {...props} />);
    const button = fileList.find(IconButton).first();
    button.simulate('click');
    expect(deleteFile).toHaveBeenCalledWith('firstFile.pdf');
  });
});