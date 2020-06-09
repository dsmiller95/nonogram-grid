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
// TODO
// function getTextWidth(text: string, font: string) {
//   // re-use canvas object for better performance
//   var canvas =
//     getTextWidth.canvas ||
//     (getTextWidth.canvas = document.createElement('canvas'));
//   var context = canvas.getContext('2d');
//   context.font = font;
//   var metrics = context.measureText(text);
//   return metrics.width;
// }

export class KeyNumber extends React.Component<IProps, IState> {
  public render() {
    return (
      <svg viewBox='0 0 15 15' className={styles.svgBox}>
        <text y='12' x='3.5' fill='black' className={styles.textContainer}>
          {this.props.display}
        </text>
        <rect
          x='3'
          y='1'
          rx='1'
          ry='1'
          width='9'
          height='13'
          fillOpacity='0.5'
          style={{ stroke: 'black', strokeWidth: 1, opacity: 0.5 }}
        />
      </svg>
    );
  }
}
