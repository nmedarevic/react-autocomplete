import { RenderStringProps } from "./types"
import styled from 'styled-components'

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
