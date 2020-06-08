import * as React from 'react';
import styles from './GridKeys.module.css';
import { PixelDisplay } from '../base-grid/GridDumb';
import { generateKey } from './grid-to-key';

export type IProps =
  | {
      pixels: PixelDisplay[][];
    }
  | IKeysProps;

interface IKeysProps {
  keys: IKeys;
}
export interface IKeys {
  rows: number[][];
  columns: number[][];
}

interface IState {}

export class GridKeys extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {}

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
          col.map((item) =>
            item === PixelDisplay.Black || item === PixelDisplay.UnknownBlack
              ? true
              : false
          )
        )
      );
      return {
        columns: keys.firstDimension,
        rows: keys.secondDimension
      };
    }
  }
  private getMaxInnerLength<T>(array: T[][]): number {
    return array.reduce((agg, current) => Math.max(agg, current.length), 0);
  }

  public render() {
    const keys = this.getKeys();

    const columnsReversed = keys.columns.map((x) => x.reverse());
    const rowsReversed = keys.rows.map((x) => x.reverse());

    const columnsMaxSize = this.getMaxInnerLength(keys.columns);
    const rowsMaxSize = this.getMaxInnerLength(keys.rows);
    const maxGuideSize = Math.max(columnsMaxSize, rowsMaxSize);

    const columnsWithIndexes = columnsReversed.flatMap((x, colIndex) =>
      x.map((y, rowIndex) => ({
        rowIndex: maxGuideSize - rowIndex,
        colIndex: colIndex + maxGuideSize + 1,
        value: y
      }))
    );
    const rowsWithIndexes = rowsReversed.flatMap((x, rowIndex) =>
      x.map((y, colIndex) => ({
        rowIndex: rowIndex + 1 + maxGuideSize,
        colIndex: maxGuideSize - colIndex,
        value: y
      }))
    );

    return (
      <div
        className={styles.keysContainer}
        style={{
          gridTemplateColumns: `repeat(${
            rowsReversed.length + maxGuideSize
          }, 1fr)`,
          gridTemplateRows: `repeat(${
            columnsReversed.length + maxGuideSize
          }, 1fr)`
        }}
      >
        {columnsWithIndexes.map((cell) => (
          <div
            className={styles.colNumberContainer}
            style={{
              gridArea: cell.rowIndex + ' / ' + cell.colIndex
            }}
          >
            <div className={styles.colNumber}>
              <div className={styles.number}>{cell.value}</div>
            </div>
          </div>
        ))}
        {rowsWithIndexes.map((cell) => (
          <div
            className={styles.rowNumberContainer}
            style={{
              gridArea: cell.rowIndex + ' / ' + cell.colIndex
            }}
          >
            <div className={styles.rowNumber}>
              <div className={styles.number}>{cell.value}</div>
            </div>
          </div>
        ))}
        <div
          className={styles.content}
          style={{
            gridArea:
              maxGuideSize +
              1 +
              ' / ' +
              (maxGuideSize + 1) +
              ' / ' +
              (maxGuideSize + 1 + rowsReversed.length) +
              ' / ' +
              (maxGuideSize + 1 + columnsReversed.length)
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
