import React from 'react'
import { graphql } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'

import ReactMarkdown from 'react-markdown'

import LayoutRoot from '../components/LayoutRoot'
import { Skill } from '../typings'

interface ProjectProps {
  data: {
    strapiProject: {
      image: {
        childImageSharp: {
            fixed: FixedObject
          }
      }
      title: string,
      description: string,
      link_to_project: string,
      skills: Skill[],
    }
  }
}

export const query = graphql`
  query ProjectQuery($id: Int!) {
    strapiProject(strapiId: { eq: $id }) {
      strapiId
      title
      updated_at
      description
      link_to_project
      image {
        childImageSharp {
            fluid(maxWidth: 595, quality: 100) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
      }
      skills {
        type
        tech_used {
          title
          used
        }
      }
    }
    }
  }
`

const Project: React.FC<ProjectProps> = ({ data }) => {
  const project = data.strapiProject
  return (
    <LayoutRoot>
      <div>
        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        >
          <Img className="banner-bg" fixed={project.image.childImageSharp.fixed} />
          <h1 className="uk-position-z-index"><a href={`${project.link_to_project}`}>{project.title}</a></h1>
        </div>
        <ul>
          {project.skills.map(skill => {skill.tech_used && <li key={skill.id}>{skill.type}</li>})}
        </ul>
        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown source={project.description} />
          </div>
        </div>
      </div>
    </LayoutRoot>
  )
}

export default Project