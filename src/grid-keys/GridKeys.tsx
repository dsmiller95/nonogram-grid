import * as React from 'react';
import styles from './GridKeys.module.css';
import { PixelDisplay } from '../base-grid/GridDumb';

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
      throw 'converter not implemented';
    }
  }

  private standardizeJaggedArray<T, J>(
    array: T[][],
    emptyValue: J
  ): (T | J)[][] {
    const columnsMaxSize = array.reduce(
      (agg, current) => Math.max(agg, current.length),
      0
    );
    return array.map((column: (T | J)[]) => {
      const oldColumnLength = column.length;
      column.length = columnsMaxSize;
      // TODO: fill from other side
      return column.fill(emptyValue, oldColumnLength, column.length);
    });
  }

  public render() {
    const keys = this.getKeys();

    const columnsStandardized = this.standardizeJaggedArray(keys.columns, null);
    const rowsStandardized = this.standardizeJaggedArray(keys.rows, null);

    const columnsMaxSize = columnsStandardized[0].length;
    const rowsMaxSize = rowsStandardized[0].length;

    const columnsWithIndexes = columnsStandardized
      .flatMap((x, colIndex) =>
        x.map((y, rowIndex) => ({ rowIndex, colIndex, value: y }))
      )
      .map((x) => ({
        ...x,
        colIndex: x.colIndex + rowsMaxSize + 1,
        rowIndex: x.rowIndex + 1
      }));
    const rowsWithIndexes = rowsStandardized.flatMap((x, rowIndex) =>
      x.map((y, colIndex) => ({
        rowIndex: rowIndex + 1 + columnsMaxSize,
        colIndex: colIndex + 1,
        value: y
      }))
    );
    console.log(rowsWithIndexes);

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
            <div className={styles.colNumber}>
              <div className={styles.number}>
                {cell.value === null ? '' : cell.value}
              </div>
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
              <div className={styles.number}>
                {cell.value === null ? '' : cell.value}
              </div>
            </div>
          </div>
        ))}
        <div
          className={styles.content}
          style={{
            gridArea:
              rowsMaxSize +
              1 +
              ' / ' +
              (columnsMaxSize + 1) +
              ' / ' +
              (rowsMaxSize + 1 + columnsStandardized.length) +
              ' / ' +
              (columnsMaxSize + 1 + rowsStandardized.length)
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
