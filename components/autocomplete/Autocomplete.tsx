const defaultPlaceholder = 'Type something here'
const defaultLabel = 'Find something'

interface AutocompleteProps {
  placeholder: string;
  label: string;
}

const Autocomplete = ({
  placeholder = defaultPlaceholder,
  label = defaultLabel
}: AutocompleteProps) => {
  return (
    <div>
      <label htmlFor='query'>{label}</label>
      <div>
        <input id='query' type='text' placeholder={placeholder}/>
      </div>
    </div>
  )
}

export default Autocomplete
