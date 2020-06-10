import * as React from 'react';
import styles from './GridKeys.module.css';
import { generateKey } from './grid-to-key';
import { KeyNumber } from './key-number/KeyNumber';
import { PixelDisplay } from '../models/PixelDisplay';

export type IProps =
  | {
      pixels: PixelDisplay[][];
      cellSize?: number;
      hideColKeys?: boolean;
      hideRowKeys?: boolean;
    }
  | IKeysProps;

interface IKeysProps {
  keys: IKeys;
  cellSize?: number;
}
export interface IKeys {
  rows: number[][];
  columns: number[][];
}

interface IState {
  dimensions: {
    width: number;
    height: number;
  };
}

export class GridKeys extends React.Component<IProps, IState> {
  container: HTMLDivElement | null;

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container?.offsetWidth || 0,
        height: this.container?.offsetHeight || 0,
      },
    });
  }

  private isKeysProps(props: any): props is Readonly<IKeysProps> {
    if (props.keys) {
      return true;
    }
    return false;
  }

  private getKeys(): Readonly<IKeys> {
    if (this.isKeysProps(this.props)) {
      return this.props.keys;
    } else {
      const keys = generateKey(
        this.props.pixels.map((col) =>
          col.map(
            (item) =>
              !!(
                item === PixelDisplay.Black ||
                item === PixelDisplay.UnknownBlack
              )
          )
        )
      );
      return {
        columns: this.props.hideColKeys
          ? keys.firstDimension.map(() => [])
          : keys.firstDimension,
        rows: this.props.hideRowKeys
          ? keys.secondDimension.map(() => [])
          : keys.secondDimension,
      };
    }
  }

  private getMaxInnerLength<T>(array: T[][]): number {
    return array.reduce((agg, current) => Math.max(agg, current.length), 0);
  }

  private renderContent() {
    const keys = this.getKeys();

    const columnsReversed = keys.columns.map((x) => x.reverse());
    const rowsReversed = keys.rows.map((x) => x.reverse());

    const colSize = this.getMaxInnerLength(keys.columns);
    const rowSize = this.getMaxInnerLength(keys.rows);
    const columnsWithIndexes = columnsReversed.flatMap((x, colIndex) =>
      x.map((y, rowIndex) => ({
        rowIndex: colSize - rowIndex,
        colIndex: colIndex + rowSize + 1,
        value: y,
      }))
    );
    const rowsWithIndexes = rowsReversed.flatMap((x, rowIndex) =>
      x.map((y, colIndex) => ({
        rowIndex: rowIndex + 1 + colSize,
        colIndex: rowSize - colIndex,
        value: y,
      }))
    );
    const totalCols = columnsReversed.length + rowSize;
    const totalRows = rowsReversed.length + colSize;
    let cellSize = this.props.cellSize;
    if (!cellSize) {
      const { dimensions } = this.state;
      cellSize = Math.min(
        dimensions.width / totalCols,
        dimensions.height / totalRows
      );
    }
    return (
      <div
        className={styles.keysGrid}
        style={{
          gridTemplateColumns: `repeat(${
            columnsReversed.length + rowSize
          }, ${cellSize}px)`,
          gridTemplateRows: `repeat(${
            rowsReversed.length + colSize
          }, ${cellSize}px)`,
        }}
      >
        {columnsWithIndexes.map((cell) => (
          <div
            className={styles.colNumberContainer}
            style={{
              gridArea: cell.rowIndex + ' / ' + cell.colIndex,
            }}
            key={`col${cell.colIndex}/${cell.rowIndex}`}
          >
            <KeyNumber display={cell.value} />
          </div>
        ))}
        {rowsWithIndexes.map((cell) => (
          <div
            className={styles.rowNumberContainer}
            style={{
              gridArea: cell.rowIndex + ' / ' + cell.colIndex,
            }}
            key={`row${cell.colIndex}/${cell.rowIndex}`}
          >
            <KeyNumber display={cell.value} />
          </div>
        ))}
        <div
          className={styles.content}
          style={{
            gridArea:
              colSize +
              1 +
              ' / ' +
              (rowSize + 1) +
              ' / ' +
              (colSize + 1 + rowsReversed.length) +
              ' / ' +
              (rowSize + 1 + columnsReversed.length),
          }}
          key='mainGrid'
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  public render() {
    return (
      <div className={styles.keysContainer} ref={(el) => (this.container = el)}>
        {this.state?.dimensions && this.renderContent()}
      </div>
    );
  }
}
