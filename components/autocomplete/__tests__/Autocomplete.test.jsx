import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Autocomplete from '../Autocomplete'

describe('<Autocomplete />', () => {
  it('should render', () => {
    const {getByLabelText, getByPlaceholderText} = render(<Autocomplete />)

    expect(getByLabelText('Find something')).toBeInTheDocument()
    expect(getByPlaceholderText('Type something here')).toBeInTheDocument()
  })
})
