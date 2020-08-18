import { FluidObject } from "gatsby-image"
import { number } from "prop-types"

interface CSSModule {
  [className: string]: string
}

interface TechUsed {
  id?: number,
  title: string,
  used: boolean,
}

interface Skill {
  id?: number,
  type: string,
  tech_used: TechUsed[],
}

interface Project {
  node: {
    id?: number,
    strapiId: number,
    image: {
      childImageSharp: {
        fixed: FixedObject,
        fluid: FluidObject,
      },
    },
    title: string,
    description: string,
    link_to_project: string,
    skills: Skill[],
  }
}

// type shims for CSS modules

declare module '*.module.scss' {
  const cssModule: CSSModule
  export = cssModule
}

declare module '*.module.css' {
  const cssModule: CSSModule
  export = cssModule
}