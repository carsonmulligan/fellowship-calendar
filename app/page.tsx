import { FellowshipCard } from '@/components/fellowship-card'

const upcomingFellowships = [
  {
    id: 'rhodes-scholarship',
    name: '🇬🇧 Rhodes Scholarship',
    description: 'The Rhodes Scholarships are the oldest and most celebrated international fellowship awards in the world.',
    deadline: '01/10/2025',
    url: 'http://www.rhodesscholar.org/',
    isBookmarked: false,
  },
  {
    id: 'marshall-scholarship',
    name: '🇬🇧 Marshall Scholarship',
    description: 'The Marshall Scholarship funds one or two years of graduate study at a wide range of institutions in the United Kingdom.',
    deadline: '15/09/2025',
    url: 'http://www.marshallscholarship.org/',
    isBookmarked: false,
  },
  {
    id: 'gates-cambridge',
    name: '🇬🇧 Gates Cambridge Scholarship',
    description: 'The Gates Cambridge Scholarship supports one to three years of post-baccalaureate study in any field at the University of Cambridge.',
    deadline: '10/10/2025',
    url: 'https://www.gatescambridge.org/',
    isBookmarked: false,
  },
]

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold">Fellowship Calendar</h1>
        <p className="text-muted-foreground">
          Track and manage your fellowship applications
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Upcoming Deadlines</h2>
        <div className="grid gap-6">
          {upcomingFellowships.map((fellowship) => (
            <FellowshipCard
              key={fellowship.id}
              fellowship={fellowship}
              onBookmark={(id) => {
                console.log('Bookmark:', id)
                // TODO: Implement bookmark functionality
              }}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

