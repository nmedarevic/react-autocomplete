import styled from 'styled-components'
import { noop } from '../../util/constants'
import { RenderString } from './RenderString'
import { ResultItem, ResultListProps } from './types'

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

export const ResultList = ({
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
