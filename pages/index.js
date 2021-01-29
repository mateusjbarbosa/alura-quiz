import React, { useState } from 'react';

import { useRouter } from 'next/router';

import db from '../db.json';

import BackgroundImage from '../src/components/BackgroundImage';
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import Input from '../src/components/Input';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function HomePage() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  return (
    <BackgroundImage backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            <form onSubmit={(e) => {
              e.preventDefault();

              router.push(`/quiz?name=${playerName}`);
            }}
            >
              <Input name="playerName" placeholder="Qual seu nome?" value={playerName} onChange={(e) => { setPlayerName(e.target.value); }} />

              <Button type="submit" disabled={playerName.length === 0}>
                Olá! Vamos jogar?
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((link) => {
                const [projectName, user] = link.replace(/\//g, '').replace('https:', '').replace('.vercel.app', '').split('.');
                const userProject = `${user}/${projectName}`;
                return (
                  <li>
                    <Widget.Topic href={link}>
                      {userProject}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>

          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>

      <GithubCorner projectUrl="https://github.com/mateusjbarbosa/b3_2020_alura_quiz" />
    </BackgroundImage>
  );
}
