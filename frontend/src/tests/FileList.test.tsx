import React from 'react';
import FileList from '../components/FileList';
import { shallow } from 'enzyme';

describe('FileTest tests', () => {

  it('should have a functional test', () => {
    shallow(<FileList files={[]} deleteFile={() => {}} />);
  });
});