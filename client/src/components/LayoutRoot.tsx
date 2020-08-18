import * as React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled';

import Seo from './Seo'
import Header from './Header';
import main from '../styles/main'
import normalize from '../styles/normalize'

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => (
  <>
    <Seo />
    <Global styles={() => css(normalize, main)} />
    <Header />
    <main>
      <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
    </main>
  </>
)

export default LayoutRoot

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
