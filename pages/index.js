import React from 'react';

import configs from '../configs.json';

import BackgroundImage from '../src/components/BackgroundImage';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function Home() {
  return (
    <BackgroundImage backgroundImage={configs.bg}>
      <QuizContainer>
        <QuizLogo />
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
  );
}
