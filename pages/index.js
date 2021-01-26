import styled from 'styled-components'

import configs from '../configs.json'

import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GithubCorner from '../src/components/GithubCorner'

const BackgroundImage = styled.div`
  background-image: url(${configs.bg});
  background-size: cover;
  background-position: center;
  flex: 1;
`

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  return (
    <BackgroundImage>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>{configs.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{configs.description}</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>

      <GithubCorner projectUrl="https://github.com/mateusjbarbosa/b3_2020_alura_quiz" />
    </BackgroundImage>
  )
}
