import PropTypes from 'prop-types';

export class File {
  filename: string;
  url: string;

  constructor(filename: string = '', url: string = '') {
    this.filename = filename;
    this.url = url;
  }
}

export const FilePropType = PropTypes.shape({
  filename: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export const testFiles: File[] = [
  new File('test.txt', 'google.com'),
  new File('second file.pdf', 'localhost:3000'),
];