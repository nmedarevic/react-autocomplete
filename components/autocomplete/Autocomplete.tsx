import { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import styled from 'styled-components'
export const defaultPlaceholder = 'Type something here'
export const defaultLabel = 'Find something'
export const defaultDebounceTime = 300
export const noop = () => {}
export const asyncNoop = async () => {}

type ResultItem = {
  id: string;
  value: string;
}

type OnSelectFunction = (ResultItem) => {}

interface AutocompleteProps {
  placeholder?: string;
  label?: string;
  resultItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onChange: Function;
  onSelect: OnSelectFunction;
}
const RenderStringItem = styled.li`
  padding: 5px;
  cursor: pointer;

  :hover {
    background-color: #b7b7b7;
  }
`
export const RenderString = ({item, onSelect}: {item: ResultItem, onSelect: Function}) => (
  <RenderStringItem data-testid={item.id} onClick={() => {onSelect(item)}}>
    {item.value}
  </RenderStringItem>
)
interface ResultListProps {
  resultItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onSelect: Function
}
const ResultListContainer = styled.ul`
  list-style: none;
  padding: 0;
  border-radius: 5px;
  box-shadow: 5px 10px 15px 4px rgb(0 0 0 / 25%);
`
const ResultList = ({
  resultItems = [],
  ResultItemRenderer = RenderString,
  onSelect = () => {}
}: ResultListProps) => {
  if (resultItems.length === 0) {
    return null
  }

  return (
    <ResultListContainer data-testid='result-list'>
      {resultItems.map((item: ResultItem) => (
        <ResultItemRenderer key={item.id} item={item} onSelect={onSelect} />
      ))}
    </ResultListContainer>
  )
}

const defaultOnSelect = ({id, value}: ResultItem) => {
  console.log(id, value)
  return null
}

const Autocomplete = ({
  placeholder = defaultPlaceholder,
  label = defaultLabel,
  resultItems = [],
  ResultItemRenderer = RenderString,
  onChange = asyncNoop,
  onSelect = defaultOnSelect
}: AutocompleteProps) => {
  const [query, setQuery] = useState('')
  const [originalQuery, setOriginalQuery] = useState('')
  const debouncedQuery = useDebounce(originalQuery, defaultDebounceTime)

  const onInputChange = (event) => {
    const value = event.target.value

    setQuery(value)
    setOriginalQuery(value)
  }

  useEffect(() => {
    console.log('effect', debouncedQuery)
    if (debouncedQuery && debouncedQuery.length >= 3) {
      onChange(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <div>
      <label htmlFor='query'>{label}</label>
      <div>
        <input id='query' type='text' placeholder={placeholder} onChange={onInputChange}/>
      </div>
      <div>
        <ResultList
          resultItems={resultItems}
          ResultItemRenderer={ResultItemRenderer}
          onSelect={onSelect}
        />
      </div>
    </div>
  )
}

export default Autocomplete
