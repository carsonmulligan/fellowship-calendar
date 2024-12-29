import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('@/components/fellowship-card', () => {
  return {
    FellowshipCard: ({ fellowship }: any) => (
      <div data-testid={`fellowship-${fellowship.id}`}>
        <h3>{fellowship.name}</h3>
        <p>{fellowship.description}</p>
      </div>
    ),
  }
})

describe('Home', () => {
  it('renders the page title and description', () => {
    render(<Home />)
    
    expect(screen.getByText('Fellowship Calendar')).toBeInTheDocument()
    expect(
      screen.getByText('Track and manage your fellowship applications')
    ).toBeInTheDocument()
  })

  it('renders the upcoming fellowships section', () => {
    render(<Home />)
    
    expect(screen.getByText('Upcoming Deadlines')).toBeInTheDocument()
    expect(screen.getByTestId('fellowship-rhodes-scholarship')).toBeInTheDocument()
    expect(screen.getByTestId('fellowship-marshall-scholarship')).toBeInTheDocument()
    expect(screen.getByTestId('fellowship-gates-cambridge')).toBeInTheDocument()
  })

  it('displays fellowship information correctly', () => {
    render(<Home />)
    
    const rhodesCard = screen.getByTestId('fellowship-rhodes-scholarship')
    expect(rhodesCard).toHaveTextContent('🇬🇧 Rhodes Scholarship')
    expect(rhodesCard).toHaveTextContent(
      'The Rhodes Scholarships are the oldest and most celebrated international fellowship awards in the world.'
    )
  })
}) 