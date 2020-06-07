import * as React from 'react';
import styles from './GridDumb.module.css';

export enum PixelDisplay {
  White = 0,
  Unknown = 1,
  Black = 2,
  UnknownBlack = 3,
  UnknownWhite = 4
}

export interface IProps {
  pixels: PixelDisplay[][];
  editable: boolean;
  dragStart?: (col: number, row: number) => void;
  onDrag?: (col: number, row: number) => void;
}

interface IState {}

export class GridDumb extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private isDragging = false;

  private gridRef: HTMLDivElement;

  componentDidMount() {
    this.gridRef.addEventListener(
      'touchmove',
      (event) => {
        if (event.touches.length > 1) {
          return;
        }
        // bad hack, pls change
        //  I'm warming up to the hack though...
        const newEvent = new MouseEvent('mouseover', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        const element = document.elementFromPoint(
          event.touches[0].pageX,
          event.touches[0].pageY
        );
        element?.dispatchEvent(newEvent);
        event.stopPropagation();
        event.preventDefault();
      },
      {
        passive: false,
        capture: true
      }
    );
    this.gridRef.addEventListener('touchend', () => {
      this.isDragging = false;
    });
    this.gridRef.addEventListener('touchcancel', () => {
      this.isDragging = false;
    });
  }

  private pixelToColorClass(pix: PixelDisplay): string {
    switch (pix) {
      case PixelDisplay.Black:
        return styles.black;
      case PixelDisplay.White:
        return styles.white;
      case PixelDisplay.Unknown:
        return styles.unknown;
      case PixelDisplay.UnknownBlack:
        return styles.black + ' ' + styles.uncertain;
      case PixelDisplay.UnknownWhite:
        return styles.white + ' ' + styles.uncertain;
    }
  }

  public render() {
    const isEditable = this.props.editable;
    const grid = this.props.pixels;

    const colorClassForPosition = (col: number, row: number): string => {
      const pixelValue = grid[col][row];
      return this.pixelToColorClass(pixelValue);
    };

    const dragEnter = (col: number, row: number) => {
      if (this.isDragging) {
        this.props.onDrag?.(col, row);
      }
    };
    const dragStart = (col: number, row: number) => {
      if (!isEditable || this.isDragging) return;
      this.isDragging = true;
      this.props.dragStart?.(col, row);
    };
    return (
      <div className={styles.Grid} ref={(ref) => ref && (this.gridRef = ref)}>
        {grid.map((col, collIndex) => (
          <div key={collIndex} className={styles.row}>
            {col.map((_item, rowIndex) => (
              <div
                key={rowIndex}
                className={
                  styles.col + ' ' + colorClassForPosition(collIndex, rowIndex)
                }
                onMouseEnter={() => {
                  dragEnter(collIndex, rowIndex);
                }}
                onMouseDown={(event) => {
                  dragStart(collIndex, rowIndex);
                  event.preventDefault();
                }}
                onTouchStart={() => {
                  dragStart(collIndex, rowIndex);
                }}
                onMouseUp={() => {
                  this.isDragging = false;
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

//export GridDumb
