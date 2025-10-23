import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

// Mock data fetching function
async function fetchProjects() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Project Alpha', description: 'A revolutionary web application' },
        { id: 2, name: 'Project Beta', description: 'Mobile-first responsive design' },
        { id: 3, name: 'Project Gamma', description: 'Enterprise-level solution' },
      ])
    }, 500)
  })
}

export function PortfolioPage() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  if (isLoading) {
    return <div className="loading">Loading portfolio...</div>
  }

  if (error) {
    return <div className="error">Error loading portfolio: {error.message}</div>
  }

  return (
    <div className="portfolio-page">
      <h1>Our Portfolio</h1>
      <p>Check out some of our amazing projects:</p>
      <div className="projects-grid">
        {projects?.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="nav-link">
        Back to Home
      </Link>
    </div>
  )
}
