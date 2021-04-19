import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/react'
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

  describe('keyboard events', () => {
    it('should allow keyboard selection', async () => {
      const results = [
        {id: 'someid1', value: 'result1'},
        {id: 'someid2', value: 'result2'},
        {id: 'someid3', value: 'result3'},
        {id: 'someid4', value: 'result4'}
      ]
      const {
        baseElement,
        findByPlaceholderText,
        getByTestId
      } = render(<Autocomplete resultItems={results} />)

      try {
        expect(getByTestId(`${results[0].id}active`)).not.toBeInTheDocument()
      } catch (e) {
        expect(e).toBeTruthy()
      }
      const input = await waitFor(() => findByPlaceholderText('Type something here'))
      fireEvent.keyDown(
        input,
        { key: 'ArrowDown', which: 40, keyCode: 40 }
      )
      expect(getByTestId(`${results[0].id}active`)).toBeInTheDocument()
    })
  })

  describe('mouse events', () => {
    it('should allow item click', async () => {
      const results = [
        {id: 'someid1', value: 'result1'},
        {id: 'someid2', value: 'result2'},
        {id: 'someid3', value: 'result3'},
        {id: 'someid4', value: 'result4'}
      ]
      const onSelect = jest.fn()
      const {
        findByPlaceholderText,
        getByTestId
      } = render(<Autocomplete resultItems={results} onSelect={onSelect} />)

      fireEvent.click(getByTestId(results[0].id))

      expect(onSelect).toBeCalled()
    })
  })
})
