import React from 'react'
import { Link } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import { Project } from '../typings'

interface ProjectProps {
  project: Project
}

const Card: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Link to={`/project/${project.node.strapiId}`} className="uk-link-reset">
      <div className="uk-card uk-card-muted">
        <div className="uk-card-media-top">
          <Img fluid={project.node.image.childImageSharp.fluid} />
        </div>
        <div className="uk-card-body">
          <p id="skills" className="uk-text-uppercase">
            {project.node.skills[0].type}
          </p>
          <p id="title" className="uk-text-large">
            {project.node.title}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card