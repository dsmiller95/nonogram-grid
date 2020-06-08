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

  private standardizeJaggedArray<T, J>(
    array: T[][],
    emptyValue: J
  ): (T | J)[][] {
    const columnsMaxSize = this.getMaxInnerLength(array);
    return array.map((column: (T | J)[]) => {
      var newColumn = column.map((x) => x);
      while (newColumn.length < columnsMaxSize) {
        newColumn.unshift(emptyValue);
      }
      return newColumn;
    });
  }
  private getMaxInnerLength<T>(array: T[][]): number {
    return array.reduce((agg, current) => Math.max(agg, current.length), 0);
  }

  public render() {
    const keys = this.getKeys();

    const columnsStandardized = this.standardizeJaggedArray(keys.columns, null);
    const rowsStandardized = this.standardizeJaggedArray(keys.rows, null);

    const columnsMaxSize = this.getMaxInnerLength(keys.columns);
    const rowsMaxSize = this.getMaxInnerLength(keys.rows);

    const columnsWithIndexes = columnsStandardized.flatMap((x, colIndex) =>
      x.map((y, rowIndex) => ({
        rowIndex: rowIndex + 1,
        colIndex: colIndex + rowsMaxSize + 1,
        value: y
      }))
    );
    const rowsWithIndexes = rowsStandardized.flatMap((x, rowIndex) =>
      x.map((y, colIndex) => ({
        rowIndex: rowIndex + 1 + columnsMaxSize,
        colIndex: colIndex + 1,
        value: y
      }))
    );

    return (
      <div
        className={styles.keysContainer}
        style={{
          gridTemplateColumns: `repeat(${
            rowsStandardized.length + rowsMaxSize
          }, 1fr)`,
          gridTemplateRows: `repeat(${
            columnsStandardized.length + columnsMaxSize
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
            {cell.value !== null ? (
              <div className={styles.colNumber}>
                <div className={styles.number}>{cell.value}</div>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
        {rowsWithIndexes.map((cell) => (
          <div
            className={styles.rowNumberContainer}
            style={{
              gridArea: cell.rowIndex + ' / ' + cell.colIndex
            }}
          >
            {cell.value !== null ? (
              <div className={styles.rowNumber}>
                <div className={styles.number}>{cell.value}</div>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
        <div
          className={styles.content}
          style={{
            gridArea:
              columnsMaxSize +
              1 +
              ' / ' +
              (rowsMaxSize + 1) +
              ' / ' +
              (columnsMaxSize + 1 + rowsStandardized.length) +
              ' / ' +
              (rowsMaxSize + 1 + columnsStandardized.length)
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
