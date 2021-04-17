export const defaultPlaceholder = 'Type something here'
export const defaultLabel = 'Find something'

type ResultItem = {
  id: string;
  value: string;
}

interface AutocompleteProps {
  placeholder?: string;
  label?: string;
  resultItems?: ResultItem[];
  ResultItemRenderer?: Function;
}

export const RenderString = ({item}: {item: ResultItem}) => (
  <span data-testid={item.id}>{item.value}</span>
)
interface ResultListProps {
  resultItems?: ResultItem[];
  ResultItemRenderer?: Function;
}
const ResultList = ({
  resultItems = [],
  ResultItemRenderer = RenderString
}: ResultListProps) => {
  if (resultItems.length === 0) {
    return null
  }

  return (
    <div data-testid='result-list'>
      {resultItems.map((item: ResultItem) => (
        <ResultItemRenderer key={item.id} item={item} />
      ))}
    </div>
  )
}

const Autocomplete = ({
  placeholder = defaultPlaceholder,
  label = defaultLabel,
  resultItems = [],
  ResultItemRenderer = RenderString
}: AutocompleteProps) => {
  return (
    <div>
      <label htmlFor='query'>{label}</label>
      <div>
        <input id='query' type='text' placeholder={placeholder}/>
      </div>
      <ResultList
        resultItems={resultItems}
        ResultItemRenderer={ResultItemRenderer}
      />
    </div>
  )
}

export default Autocomplete
