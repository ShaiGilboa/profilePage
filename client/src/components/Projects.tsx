import React from 'react'
import { Project } from '../typings'
import Card from './Card'

interface ProjectsProps {
  projects: Project[]
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const leftProjectsCount = Math.ceil(projects.length / 5)
  const leftProjects = projects.slice(0, leftProjectsCount)
  const rightProjects = projects.slice(leftProjectsCount, projects.length)

  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {leftProjects.map(article => {
            return <Card article={article} key={`article__${article.node.id}`} />
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightProjects.map(article => {
              return <Card article={article} key={`article__${article.node.id}`} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects