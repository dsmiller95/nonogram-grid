import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { PixelDisplay } from '../models/PixelDisplay';
import { GridKeys } from '../grid-keys/GridKeys';
import { GridDumb } from '../base-grid/GridDumb';

import styles from './ManualSolveGrid.module.css';

export interface IProps {
  initialPixels?: PixelDisplay[][];
  goalPixels: PixelDisplay[][];
  transitionModel: PixelDisplay[];
  cellSize?: number;
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
    const gridIsComplete = this.props.goalPixels
      .map((col, colIndex) =>
        col.map((value, rowIndex) => value === pixels[colIndex][rowIndex])
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
        <GridKeys pixels={this.props.goalPixels} cellSize={this.props.cellSize}>
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
