export type ResultItem = {
  id: string;
  value: string;
}

export type OnSelectFunction = (ResultItem) => {}

export interface AutocompleteProps {
  placeholder?: string;
  label?: string;
  resultItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onChange: Function;
  onSelect: OnSelectFunction;
}
