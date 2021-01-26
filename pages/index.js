import React, { useState } from 'react';

import { useRouter } from 'next/router';

import configs from '../configs.json';

import BackgroundImage from '../src/components/BackgroundImage';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

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

            <form onSubmit={(e) => {
              e.preventDefault();

              router.push(`/quiz?name=${playerName}`);
            }}
            >
              <input placeholder="Qual seu nome?" onChange={(e) => { setPlayerName(e.target.value); }} />

              <button type="submit" disabled={playerName.length === 0}>
                Olá! Vamos jogar?
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>

      <GithubCorner projectUrl="https://github.com/mateusjbarbosa/b3_2020_alura_quiz" />
    </BackgroundImage>
  );
}
