import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

import db from '../../db.json';

export default function QuizPage({ pageProps }) {
  const { playerName } = pageProps;
  return (
    <ThemeProvider theme={db.theme}>
      <h1>{playerName}</h1>
      <QuizScreen
        externalQuestions={db.questions}
        externalBg={db.bg}
        playerName={playerName}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      playerName: context.query.playerName,
    },
  };
}

QuizPage.propTypes = {
  pageProps: PropTypes.exact({
    playerName: PropTypes.string,
  }).isRequired,
};
