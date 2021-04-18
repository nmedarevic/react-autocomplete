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

  ${({isSelected}) => {
    console.log(isSelected)
    if (isSelected) {
      return `
        background-color: #e2e2e2;
      `
    }
  }}

  :hover {
    background-color: #e2e2e2;
  }
`

interface RenderStringProps {
  item: ResultItem;
  onSelect: Function;
  onHover: Function;
  isSelected: boolean;
  index: number;
  onHoverEnter: Function;
  onHoverLeave: Function;
}
export const RenderString = ({
  item,
  onSelect,
  onHoverEnter,
  onHoverLeave,
  isSelected = false,
  index
}: RenderStringProps) => (
  <RenderStringItem
    data-testid={item.id}
    onClick={() => {onSelect(item)}}
    onMouseEnter={() => {onHoverEnter(item, index)}}
    onMouseLeave={() => {onHoverLeave(item, index)}}
    isSelected={isSelected}
  >
    {item.value}
  </RenderStringItem>
)
interface ResultListProps {
  resultItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onSelect?: Function;
  onHoverEnter?: Function;
  onHoverLeave?: Function;
  selectedIndex?: number;
}
const ResultListContainer = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  border-radius: 5px;
  box-shadow: 5px 10px 15px 4px rgb(0 0 0 / 25%);
  width: 100%;
  max-height: 200px;
  overflow: scroll;

  > li:first-child:hover {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  > li:last-child:hover {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`
const ResultList = ({
  resultItems = [],
  ResultItemRenderer = RenderString,
  onSelect = () => {},
  onHoverEnter = () => {},
  onHoverLeave = () => {},
  selectedIndex
}: ResultListProps) => {
  if (resultItems.length === 0) {
    return null
  }

  return (
    <ResultListContainer data-testid='result-list'>
      {resultItems.map((item: ResultItem, index: number) => (
        <ResultItemRenderer
          key={item.id}
          item={item}
          isSelected={index === selectedIndex}
          index={index}
          onSelect={onSelect}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
      ))}
    </ResultListContainer>
  )
}

const defaultOnSelect = ({id, value}: ResultItem) => {
  return null
}
const ListContainer = styled.div`
  position: relative;
`
const UP_KEY = 38
const DOWN_KEY = 40
const ARROW_KEYS = [UP_KEY, DOWN_KEY]

const selectedByKeyPressed = (value, keyCode) => {
  if (keyCode === DOWN_KEY) {
    return value + 1
  }

  if (keyCode === UP_KEY) {
    return value - 1
  }

  return value
}
const selectedByMaxLen = (value, maxValue) => {
  if (value > maxValue) {
    return 0
  }

  if (value < 0) {
    return maxValue
  }

  return value
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
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [hoverIndex, setHoverIndex] = useState(null)
  const debouncedQuery = useDebounce(originalQuery, defaultDebounceTime)

  const onInputChange = (event) => {
    const value = event.target.value

    setQuery(value)
    setOriginalQuery(value)
  }

  const onHoverEnter = (_, index) => {
    setHoverIndex(index)
  }
  const onHoverLeave = (_, index) => {
    setHoverIndex(null)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!ARROW_KEYS.includes(event.keyCode)) {
        return
      }

      const newIndex = selectedIndex === null
        ? 0
        : selectedByMaxLen(
            selectedByKeyPressed(selectedIndex, event.keyCode),
            resultItems.length - 1
          )
      setSelectedIndex(newIndex)
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  useEffect(() => {
    console.log('effect', debouncedQuery)
    if (debouncedQuery && debouncedQuery.length >= 3) {
      onChange(debouncedQuery)
    }
  }, [debouncedQuery])

  let inputValue = originalQuery

  if (hoverIndex !== null) {
    inputValue = resultItems && resultItems[hoverIndex]&& resultItems[hoverIndex].value
  }

  if (hoverIndex === null && selectedIndex !== null) {
    inputValue = resultItems && resultItems[selectedIndex]&& resultItems[selectedIndex].value
  }

  return (
    <div>
      <label htmlFor='query'>{label}</label>
      <div>
        <input
          id='query'
          type='text'
          value={inputValue}
          placeholder={placeholder}
          onChange={onInputChange}
        />
      </div>
      <ListContainer>
        <ResultList
          resultItems={resultItems}
          ResultItemRenderer={ResultItemRenderer}
          onSelect={onSelect}
          selectedIndex={selectedIndex}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
      </ListContainer>
    </div>
  )
}

export default Autocomplete
