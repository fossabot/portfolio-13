import type { NextPage } from 'next'
import Head from 'next/head'

import { styled } from '@/styles/StyleConstants'

const Home = () => (
  <>
    <TopPageTitleWrapper>Welcome to roottool&apos;s portfolio!</TopPageTitleWrapper>
    <p>&quot;Why do it yourself when robots do it better?&quot;</p>
    <p>- echo -</p>
  </>
)

const TopPageTitleWrapper = styled('h1', {
  fontSize: '3.5rem',
  marginTop: '40vh',
  '@bp2': {
    fontSize: '2rem',
    marginTop: '20vh',
  },
})

const Container: NextPage = () => (
  <>
    <Head>
      <title>roottool&apos;s Portfolio Site</title>
    </Head>
    <Home />
  </>
)

export default Container
