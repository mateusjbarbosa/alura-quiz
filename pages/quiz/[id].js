import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

export default function ExternalQuizPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const externalDb = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((serverResponse) => {
        if (serverResponse.ok) {
          return serverResponse.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((response) => response);

    return {
      props: {
        externalDb,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

ExternalQuizPage.propTypes = {
  externalDb: PropTypes.exact({
    theme: PropTypes.object,
    questions: PropTypes.object,
    bg: PropTypes.string,
  }).isRequired,
};
