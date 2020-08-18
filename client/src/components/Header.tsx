import * as React from 'react'
// import styled from '@emotion/styled'
// import { transparentize } from 'polished'
import { Link, StaticQuery, graphql } from 'gatsby'

// import { heights, dimensions, colors } from '../styles/variables'
// import Container from './Container'

interface categoryInterface {
  node: {
    strapiId : number,
    type: string,
  }
}

interface HeaderProps {
  title?: string,
  readonly children?: React.ReactNode,
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <div>
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/">Strapi Blog</Link>
            </li>
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <StaticQuery
              query={graphql`
                query {
                  allStrapiCategory {
                    edges {
                      node {
                        strapiId
                        type
                      }
                    }
                  }
                }
              `}
              render={data =>
                data.allStrapiCategory.edges.map((category: categoryInterface, i: number) => {
                  return (
                    <li key={category.node.strapiId}>
                      <Link to={`/category/${category.node.strapiId}`}>{category.node.type}</Link>
                    </li>
                  )
                })
              }
            />
          </ul>
        </div>
      </nav>
    </div>
  </div>
)

// const Header: React.FC<HeaderProps> = ({ title }) => (
//   <StyledHeader>
//     <HeaderInner>
//       <HomepageLink to="/">{title}</HomepageLink>
//     </HeaderInner>
//   </StyledHeader>
// )

export default Header


// const StyledHeader = styled.header`
//   height: ${heights.header}px;
//   padding: 0 ${dimensions.containerPadding}rem;
//   background-color: ${colors.brand};
//   color: ${transparentize(0.5, colors.white)};
// `

// const HeaderInner = styled(Container)`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   height: 100%;
// `

// const HomepageLink = styled(Link)`
//   color: ${colors.white};
//   font-size: 1.5rem;
//   font-weight: 600;
//   &:hover,
//   &:focus {
//     text-decoration: none;
//   }
// `