import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FileList from '../components/FileList';
import { mount } from 'enzyme';

import { File } from '../types/File';

describe('FileTest tests', () => {
  let files: File[];
  let deleteFile: jest.Mock;

  beforeAll(() => {
    files = [
      new File('firstFile.pdf', 'google.com'),
      new File('secondFile.txt', 'bing.com'),
      new File('thirdFile.zip', 'amazon.com')
    ];
    deleteFile = jest.fn();
  });
  
  it('should render an unordered list', () => {
    const fileList = mount(<FileList files={[]} deleteFile={() => {}} />);
    const ul = fileList.find(List);
    expect(ul.length).toEqual(1);
  });

  it('should render a list of files', () => {
    const fileList = mount(<FileList files={files} deleteFile={() => {}} />);
    const li = fileList.find(ListItem);
    expect(li.length).toEqual(3);
  });

  it('should render link and delete button for each file', () => {
    const fileList = mount(<FileList files={files} deleteFile={() => {}} />);
    const li = fileList.find(ListItem).first();
    expect(li.find(Link).props().href).toEqual('google.com');
    expect(li.find(Link).text()).toEqual('firstFile.pdf');
    expect(li.find(DeleteIcon).length).toEqual(1);
  });

  it('should call deleteFile when delete button is clicked', () => {
    const fileList = mount(<FileList files={files} deleteFile={deleteFile} />);
    const button = fileList.find(IconButton).first();
    button.simulate('click');
    expect(deleteFile).toHaveBeenCalledWith('firstFile.pdf');
  });
});