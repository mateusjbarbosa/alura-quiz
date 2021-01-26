import styled from 'styled-components'

import configs from '../configs.json'

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
`;

export default function Home() {
  return (
    <BackgroundImage>
      <QuizContainer></QuizContainer>
    </BackgroundImage>
  )
}
