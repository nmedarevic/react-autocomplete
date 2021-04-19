import { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import styled from 'styled-components'
import { AutocompleteProps, RenderStringProps, ResultItem } from "./types"
import { ARROW_KEYS, asyncNoop, defaultDebounceTime, defaultLabel, defaultPlaceholder, DOWN_KEY, UP_KEY } from "../../util/constants"
import { ResultList } from "./ResultList"
import { RenderString } from "./RenderString"
import { getNextSelectedIndex } from "./helper"

const defaultOnSelect = ({id, value}: ResultItem) => {
  return null
}

const ListContainer = styled.div`
  position: relative;
`


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
