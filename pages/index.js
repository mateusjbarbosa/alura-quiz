import styled from 'styled-components'

import configs from '../configs.json'

const BackgroundImage = styled.div`
  background-image: url(${configs.bg});
  background-size: cover;
  background-position: center;
  flex: 1;
`

export default function Home() {
  return (
    <BackgroundImage></BackgroundImage>
  )
}
