import * as React from 'react';
import styles from './KeyNumber.module.css';

export interface IProps {
  display: number;
}

interface IState {}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text: string, font: string) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  if (!context) {
    throw new Error('cannot get context of canvas');
  }
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export class KeyNumber extends React.Component<IProps, IState> {
  public render() {
    const numberText = this.props.display.toString(10);
    const font = 'bold 10px cursive';
    const textSize = getTextWidth(numberText, font);
    const textOffsetFromCenter = textSize / 2;
    const boxWidth = 15;
    return (
      <svg viewBox='0 0 15 15' className={styles.svgBox}>
        <text
          y='11.5'
          x={boxWidth / 2 - textOffsetFromCenter}
          fill='black'
          className={styles.textContainer}
        >
          {this.props.display}
        </text>
        <rect
          x='.5'
          y='.5'
          rx='2'
          ry='2'
          width='14'
          height='14'
          fillOpacity='0.5'
          style={{ stroke: 'black', strokeWidth: 1, opacity: 0.5 }}
        />
      </svg>
    );
  }
}
