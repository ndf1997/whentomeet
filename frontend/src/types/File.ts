import PropTypes from 'prop-types';

export class File {
  file_id: string;
  name: string;
  url: string;

  constructor(file_id: string = '', name: string = '', url: string = '') {
    this.file_id = file_id;
    this.name = name;
    this.url = url;
  }
}

export const FilePropType = PropTypes.shape({
  file_id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const testFiles: File[] = [
  new File('1', 'test.txt', 'google.com'),
  new File('2', 'second file.pdf', 'localhost:3000'),
];