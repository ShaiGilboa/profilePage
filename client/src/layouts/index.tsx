import * as React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import 'modern-normalize'
import '../styles/normalize'

import Header from '../components/Header'
import LayoutRoot from '../components/LayoutRoot'
// import LayoutMain from '../components/LayoutMain'
import ProjectComponent from '../components/Projects';
import { Project } from '../typings'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  },
  allStrapiProject: {
    edges: Project[],
  }
}

interface Props {
  readonly title?: string,
  readonly children: React.ReactNode,
}

const IndexLayout: React.FC<Props> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        allStrapiProjects {
          edges {
            node {
              strapiId
              title
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
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords }
          ]}
        />
        <Header title={data.site.siteMetadata.title} />
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1>Profile Page</h1>
            <ProjectComponent projects={data.allStrapiProject.edges} />
            {children}
          </div>
        </div>
      </LayoutRoot>
    )}
  />
)

export default IndexLayout