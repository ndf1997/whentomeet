import React from 'react';
import TableCell from '@material-ui/core/TableCell';

const initialState = { isSelected: false };
type State = Readonly<typeof initialState>

class TimeTableCell extends React.Component {
  readonly state: State = initialState;

  clickHandler = () => {
    this.setState({ isSelected: !this.state.isSelected });
  }

  hoverHandler = (event: React.MouseEvent) => {
    if (event.buttons === 1) {
      this.clickHandler();
    }
  }

  render () {
    return (
      <TableCell
        onClick={this.clickHandler}
        onMouseEnter={event => this.hoverHandler(event)}
      >{this.state.isSelected ? 'X' : 'O'}</TableCell>
    )
  }
}

export default TimeTableCell;