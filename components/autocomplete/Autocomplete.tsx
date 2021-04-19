import { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import styled from 'styled-components'

export const defaultPlaceholder = 'Type something here'
export const defaultLabel = 'Find something'
export const defaultDebounceTime = 300
export const noop = () => {}
export const asyncNoop = async () => {}
export const UP_KEY = 38
export const DOWN_KEY = 40
export const ARROW_KEYS = [UP_KEY, DOWN_KEY]

type ResultItem = {
  id: string;
  value: string;
}

type OnSelectFunction = (ResultItem) => {}

interface AutocompleteProps {
  placeholder?: string;
  label?: string;
  resultItems?: ResultItem[];
  selectedItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onChange: Function;
  onSelect: OnSelectFunction;
}

const RenderStringItem = styled.li`
  padding: 5px;
  cursor: pointer;

  ${({isActive}) => {
    if (isActive) {
      return `
        background-color: #e2e2e2;
      `
    }
  }}

  ${({isDisabled}) => {
    if (isDisabled) {
      return `
        pointer-events: none;
        cursor: not-allowed;
        background-color: #f1f1f1;
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
  isActive: boolean;
  isDisabled: boolean;
  index: number;
  onHoverEnter: Function;
  onHoverLeave: Function;
}
export const RenderString = ({
  item,
  onSelect,
  onHoverEnter,
  onHoverLeave,
  isActive = false,
  index,
  isDisabled = false
}: RenderStringProps) => (
  <RenderStringItem
    data-testid={`${item.id}${isDisabled ? 'disabled' : ''}${isActive ? 'active' : ''}`}
    onClick={() => {onSelect(item)}}
    onMouseEnter={() => {onHoverEnter(item, index)}}
    onMouseLeave={() => {onHoverLeave(item, index)}}
    isActive={isActive}
    isDisabled={isDisabled}
    className={isDisabled ? 'disabled' : ''}
  >
    {item.value}
  </RenderStringItem>
)
interface ResultListProps {
  resultItems?: ResultItem[];
  selectedItems?: ResultItem[];
  ResultItemRenderer?: Function;
  onSelect?: Function;
  onHoverEnter?: Function;
  onHoverLeave?: Function;
  hoverIndex?: number;
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
  selectedItems = [],
  ResultItemRenderer = RenderString,
  onSelect = noop,
  onHoverEnter = noop,
  onHoverLeave = noop,
  hoverIndex
}: ResultListProps) => {
  if (resultItems.length === 0) {
    return null
  }

  return (
    <ResultListContainer data-testid='result-list'>
      {resultItems.map((item: ResultItem, index: number) => {

        const isSelected = selectedItems.find(({id}) => id === item.id)
        const isActive = index === hoverIndex

        return (
          <ResultItemRenderer
            key={item.id}
            item={item}
            isActive={isActive}
            index={index}
            onSelect={onSelect}
            onHoverEnter={onHoverEnter}
            onHoverLeave={onHoverLeave}
            isDisabled={isSelected}
          />
        )
      })}
    </ResultListContainer>
  )
}

const defaultOnSelect = ({id, value}: ResultItem) => {
  return null
}

const ListContainer = styled.div`
  position: relative;
`


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

const getNextSelectedIndex = (currentIndex, results, keyCode) => {
  if (currentIndex === null) {
    return 0
  }

  return selectedByMaxLen(
    selectedByKeyPressed(currentIndex, keyCode),
    results.length - 1
  )
}

const Autocomplete = ({
  placeholder = defaultPlaceholder,
  label = defaultLabel,
  resultItems = [],
  selectedItems = [],
  ResultItemRenderer = RenderString,
  onChange = asyncNoop,
  onSelect = defaultOnSelect
}: AutocompleteProps) => {
  const [originalQuery, setOriginalQuery] = useState('')
  const [hoverIndex, setHoverIndex] = useState(null)
  const [arrowKeySelectIndex, setArrowKeySelectIndex] = useState(null)
  const debouncedQuery = useDebounce(originalQuery, defaultDebounceTime)

  const onInputChange = (event) => {
    const value = event.target.value

    setOriginalQuery(value)
  }

  const onHoverEnter = (_, index) => {
    setArrowKeySelectIndex(index)
  }
  const onHoverLeave = (_, __) => {
    setArrowKeySelectIndex(null)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!ARROW_KEYS.includes(event.keyCode)) {
        return
      }

      setHoverIndex(
        getNextSelectedIndex(hoverIndex, resultItems, event.keyCode)
      )
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [hoverIndex])

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length >= 3) {
      onChange(debouncedQuery)
    }
  }, [debouncedQuery])

  let inputValue = originalQuery

  if (arrowKeySelectIndex !== null) {
    inputValue = resultItems && resultItems[arrowKeySelectIndex] && resultItems[arrowKeySelectIndex].value
  }

  if (arrowKeySelectIndex === null && hoverIndex !== null) {
    inputValue = resultItems && resultItems[hoverIndex]&& resultItems[hoverIndex].value
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
          selectedItems={selectedItems}
          ResultItemRenderer={ResultItemRenderer}
          onSelect={onSelect}
          hoverIndex={hoverIndex}
          onHoverEnter={onHoverEnter}
          onHoverLeave={onHoverLeave}
        />
      </ListContainer>
    </div>
  )
}

export default Autocomplete
