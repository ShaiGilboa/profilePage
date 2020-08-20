import React from 'react'
import { graphql } from 'gatsby'

import LayoutRoot from '../components/LayoutRoot'
import ProjectsComponent from '../components/projects'
import { Project } from '../typings'

interface CategoryProps {
  data: {
    projects: {
      edges: Project[]
    }
    category: {
      name: string
    }
  }
}

export const query = graphql`
  query Category($id: Int!) {
    projects: allStrapiProjects(filter: { created_by: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          title
          skills {
            type
          }
          image {
            childImageSharp {
                fluid(maxWidth: 595, quality: 100) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
              }
          }
        }
      }
    }
    category: strapiCategory(strapiId: { eq: $id }) {
      type
    }
  }
`

const Category: React.FC<CategoryProps> = ({ data }) => {
  const projects = data.projects.edges
  const category = data.category.name

  return (
    <LayoutRoot>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category}</h1>
          <ProjectsComponent projects={projects} />
        </div>
      </div>
    </LayoutRoot>
  )
}

export default Category