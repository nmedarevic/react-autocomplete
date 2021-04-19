export type ResultItem = {
  id: string;
  value: string;
}

export type OnSelectFunction = (ResultItem) => {}

export interface AutocompleteProps {
  placeholder?: string;
  label?: string;
  resultItems?: ResultItem[];
  selectedItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onChange: Function;
  onSelect: OnSelectFunction;
}

export interface RenderStringProps {
  item: ResultItem;
  onSelect: Function;
  onHover: Function;
  isActive: boolean;
  isDisabled: boolean;
  index: number;
  onHoverEnter: Function;
  onHoverLeave: Function;
}

export interface ResultListProps {
  resultItems?: ResultItem[];
  selectedItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onSelect?: Function;
  onHoverEnter?: Function;
  onHoverLeave?: Function;
  hoverIndex?: number;
}
