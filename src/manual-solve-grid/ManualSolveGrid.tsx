import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { PixelDisplay } from '../models/PixelDisplay';
import { GridKeys } from '../grid-keys/GridKeys';
import { GridDumb } from '../base-grid/GridDumb';

import styles from './ManualSolveGrid.module.css';

export interface IProps {
  initialPixels?: PixelDisplay[][];
  /**
   * The grid which will be used to render the keys from. This is also the grid
   *  which will be used to verify to see if the nonogram is complete
   */
  goalPixels: PixelDisplay[][];
  /**
   * The grid to be used to check against to see if the nonogram is solved
   *  use this when the goal has uncertainty involved in it
   */
  verificationPixels?: PixelDisplay[][];
  transitionModel: PixelDisplay[];
  cellSize?: number;
  hideColKeys?: boolean;
  hideRowKeys?: boolean;
}

interface IState {
  currentDragValue: PixelDisplay;
  currentPixels: PixelDisplay[][];
}

export class ManualSolveGrid extends React.Component<IProps, IState> {
  componentWillMount() {
    this.setState({
      currentPixels:
        this.props.initialPixels?.map((x) => x.map((y) => y)) ||
        this.props.goalPixels.map((x) => x.map(() => PixelDisplay.Unknown)),
      currentDragValue: PixelDisplay.White,
    });
  }

  public render() {
    const pixels = this.state.currentPixels;
    const target = this.props.verificationPixels || this.props.goalPixels;
    const gridIsComplete = target
      .map((row, rowIndex) =>
        row.map((value, colIndex) => value === pixels[rowIndex][colIndex])
      )
      .flatMap((x) => x)
      .every((x) => x);
    return (
      <div
        className={
          styles.editableGridBox +
          ((gridIsComplete && ' ' + styles.complete) || '')
        }
      >
        <GridKeys
          pixels={this.props.goalPixels}
          cellSize={this.props.cellSize}
          hideColKeys={this.props.hideColKeys}
          hideRowKeys={this.props.hideRowKeys}
        >
          <GridDumb
            pixels={pixels}
            editable
            dragStart={(col, row) => {
              const currentValueIndex = this.props.transitionModel.indexOf(
                pixels[col][row]
              );
              const newDragValue = this.props.transitionModel[
                (currentValueIndex + 1) % this.props.transitionModel.length
              ];
              pixels[col][row] = newDragValue;
              this.setState({
                currentDragValue: newDragValue,
                currentPixels: pixels,
              });
            }}
            onDrag={(col, row) => {
              pixels[col][row] = this.state.currentDragValue;
              this.setState({
                currentPixels: pixels,
              });
            }}
          />
        </GridKeys>
      </div>
    );
  }
}
