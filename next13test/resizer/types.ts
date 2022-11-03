import { RefObject } from 'react';
import { Observable } from 'rxjs';

export interface Coordinate {
  x: number;
  y: number;
}

export type Trend = -1 | 0 | 1;

export enum BarActionType {
  ACTIVATE = 'activate',
  MOVE = 'move',
  DEACTIVATE = 'deactivate',
}


/**
 * An interface describing a bar action.
 * 
 * @interface BarAction
 * @member {BarActionType}: The type of action that is occurring.
 * @member {coordinate}: The (x, y) coordinate of the bar.
 * @member {barID}: The id of the bar.
 */
export interface BarAction {
  type: BarActionType;
  coordinate: Coordinate;
  barID: number;
}


export interface SizeInfo {
  isSolid: boolean;
  currentSize: number;
  maxSize?: number;
  minSize?: number;
  disableResponsive?: boolean;
}

export interface SizeRelatedInfo {
  discard?: boolean;
  sizeInfoArray: SizeInfo[];
  flexGrowRatio: number;
}


/**
 * @interface ChildProps
 * @member {number} size The size of the div. If set, section will ignore values of defaultSize, minSize, and maxSize.
 * @member {number} defaultSize Used to set default size of Section.
 * @member {number} maxSize Used to set max size of Section.
 * @member {number} minSize Used to set min size of Section.
 * @member {ResizerContext} context The context passed in from the Container context
 * @member {boolean} disableResponsive Prevent changes of Container size from affecting the relevant Section.
 * @member {RefObject<HTMLDivElement>} innerRef Used to get the actual DOM ref of section
 * @member {string} synthKey A unique identifier made by \@cmhhelgeson to test issues
 */
export interface ChildProps {
  size?: number;
  defaultSize?: number;
  maxSize?: number;
  minSize?: number;
  context: ResizerContext;
  disableResponsive?: boolean;
  innerRef?: RefObject<HTMLDivElement>;
  synthKey?: string,
}

export interface ChildPropsPlus extends ChildProps {
  identificationTest?: string
}

export interface ResizerContext {
  vertical: boolean;
  createID: (props: ChildProps) => number;
  populateInstance: (id: number, ref: RefObject<HTMLElement>) => void;
  triggerBarAction: (action: BarAction) => void;
  sizeRelatedInfo$: Observable<SizeRelatedInfo>;
}

export interface ExpandInteractiveArea {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}