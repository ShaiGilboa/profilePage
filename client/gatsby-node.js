'use strict'

const path = require('path')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout } = node.frontmatter
      const { relativePath } = getNode(node.parent)

      let slug = permalink

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      })

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const results = await graphql(`
  {
    projects: allStrapiProjects {
      edges {
        node {
          strapiId
        }
      }
    }
    categories: allStrapiCategory {
      edges {
        node {
          strapiId
        }
      }
    }
  }
  `)

  if (results.errors) {
    console.error('results.errors gatsby-node.js', results.errors)
    throw new Error(results.errors)
  }

  const projects = results.data.projects.edges;
  const categories = results.data.categories.edges;

  projects.forEach((project, index) => {
    createPage({
      path: `/projects/${project.node.strapiId}`,
      component: require.resolve('./src/templates/project.tsx'),
      context: {
        id: project.node.strapiId
      }
    })
  })

  categories.forEach((category, index) => {
    createPage({
      path: `/category/${category.node.strapiId}`,
      component: require.resolve('./src/templates/category.tsx'),
      context: {
        id: category.node.strapiId
      }
    })
  })
}