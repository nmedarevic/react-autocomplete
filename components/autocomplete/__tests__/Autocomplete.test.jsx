import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Autocomplete from '../Autocomplete'

describe('<Autocomplete />', () => {
  it('should render', () => {
    const {getByLabelText, getByPlaceholderText, queryAllByTestId} = render(<Autocomplete />)

    expect(getByLabelText('Find something')).toBeInTheDocument()
    expect(getByPlaceholderText('Type something here')).toBeInTheDocument()
    expect(queryAllByTestId('render-string').length).toEqual(0)
  })

  it('should render a custom label', () => {
    const {getByLabelText, getByPlaceholderText} = render(<Autocomplete label='Custom'/>)

    expect(getByLabelText('Custom')).toBeInTheDocument()
    expect(getByPlaceholderText('Type something here')).toBeInTheDocument()
  })

  it('should render a custom placeholder', () => {
    const {getByLabelText, getByPlaceholderText} = render(<Autocomplete placeholder='Custom'/>)

    expect(getByLabelText('Find something')).toBeInTheDocument()
    expect(getByPlaceholderText('Custom')).toBeInTheDocument()
  })

  it('should render a custom placeholder', () => {
    const {getByLabelText, getByPlaceholderText} = render(<Autocomplete placeholder='Custom'/>)

    expect(getByLabelText('Find something')).toBeInTheDocument()
    expect(getByPlaceholderText('Custom')).toBeInTheDocument()
  })

  it('should render a list of results', () => {
    const results = [{id: 'someid', value: 'result1'}]
    const {
      getByText
    } = render(<Autocomplete resultItems={results} />)

    expect(getByText(results[0].value)).toBeInTheDocument()
  })
})
