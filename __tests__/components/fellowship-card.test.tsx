import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FellowshipCard } from '@/components/fellowship-card'
import { createClient } from '@/lib/supabase/client'

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: jest.fn(() => Promise.resolve({
        data: {
          session: {
            user: { id: 'test-user-id' }
          }
        }
      }))
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve({ data: null }))
          }))
        }))
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          eq: jest.fn(() => Promise.resolve())
        }))
      })),
      insert: jest.fn(() => Promise.resolve())
    }))
  }))
}))

const mockFellowship = {
  id: 'rhodes-scholarship',
  name: '🇬🇧 Rhodes Scholarship',
  description: 'The Rhodes Scholarships are the oldest and most celebrated international fellowship awards in the world.',
  deadline: '01/10/2025',
  url: 'http://www.rhodesscholar.org/',
}

describe('FellowshipCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders fellowship information correctly', () => {
    render(<FellowshipCard fellowship={mockFellowship} />)
    
    expect(screen.getByTestId('fellowship-title')).toHaveTextContent('🇬🇧 Rhodes Scholarship')
    expect(screen.getByTestId('fellowship-description')).toHaveTextContent(
      'The Rhodes Scholarships are the oldest and most celebrated international fellowship awards in the world.'
    )
    expect(screen.getByTestId('fellowship-deadline')).toHaveTextContent('Due: 10/01/2025')
    expect(screen.getByTestId('fellowship-link')).toHaveAttribute(
      'href',
      'http://www.rhodesscholar.org/'
    )
  })

  it('checks bookmark status on load', async () => {
    render(<FellowshipCard fellowship={mockFellowship} />)
    
    const supabase = createClient()
    
    await waitFor(() => {
      expect(supabase.auth.getSession).toHaveBeenCalled()
    })
    
    expect(supabase.from).toHaveBeenCalledWith('bookmarks')
  })

  it('handles bookmark toggle', async () => {
    render(<FellowshipCard fellowship={mockFellowship} />)
    
    const bookmarkButton = screen.getByTestId('bookmark-button')
    
    // Wait for initial load
    await waitFor(() => {
      expect(bookmarkButton).not.toBeDisabled()
    })
    
    // Click to bookmark
    fireEvent.click(bookmarkButton)
    
    const supabase = createClient()
    
    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('bookmarks')
      expect(screen.getByTestId('bookmark-button')).toHaveClass('text-yellow-500')
    })
    
    // Click to remove bookmark
    fireEvent.click(bookmarkButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('bookmark-button')).not.toHaveClass('text-yellow-500')
    })
  })

  it('formats date correctly', () => {
    const { rerender } = render(
      <FellowshipCard 
        fellowship={mockFellowship} 
      />
    )
    
    // Test DD/MM/YYYY format
    expect(screen.getByTestId('fellowship-deadline')).toHaveTextContent('Due: 10/01/2025')
    
    // Test MM/DD/YYYY format
    rerender(
      <FellowshipCard 
        fellowship={{ ...mockFellowship, deadline: '10/01/2025' }} 
      />
    )
    expect(screen.getByTestId('fellowship-deadline')).toHaveTextContent('Due: 10/01/2025')
    
    // Test invalid date
    rerender(
      <FellowshipCard 
        fellowship={{ ...mockFellowship, deadline: 'invalid-date' }} 
      />
    )
    expect(screen.getByTestId('fellowship-deadline')).toHaveTextContent('Due: Invalid date')
  })
}) 