import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import BackgroundImage from '../../components/BackgroundImage';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results, playerName }) {
  return (
    <Widget
      as={motion.section}
      variants={{
        show: {
          opacity: 1,
          y: '0',
        },
        hidden: {
          opacity: 0,
          y: '100%',
        },
      }}
      initial="hidden"
      animate="show"
      transition={{
        delay: 0,
        duration: 0.5,
      }}
    >
      <Widget.Header>
        Resultado do Quiz
      </Widget.Header>

      <Widget.Content>
        <h2>
          {`Parabéns, ${playerName}, você acertou `}
          {results.filter((pergunta) => pergunta === true).length}
          {' de '}
          {results.length}
          {' questões!'}
        </h2>
        <ul>
          {results.map((result, index) => (
            // eslint-disable-next-line react/jsx-one-expression-per-line
            <li key={`result__${index.toString()}`}>Pergunta #{index + 1} - {result === true ? 'Acertou' : 'Errou'}</li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget
      as={motion.section}
      variants={{
        show: {
          opacity: 1,
          y: '0',
        },
        hidden: {
          opacity: 0,
          y: '100%',
        },
      }}
      initial="hidden"
      animate="show"
      transition={{
        delay: 0,
        duration: 0.5,
      }}
    >
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget
      as={motion.section}
      variants={{
        show: {
          opacity: 1,
          y: '0',
        },
        hidden: {
          opacity: 0,
          y: '100%',
        },
      }}
      initial="hidden"
      animate="show"
      transition={{
        delay: 0,
        duration: 0.5,
      }}
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();

            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg, playerName }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <BackgroundImage backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {/* eslint-disable-next-line max-len */}
        {screenState === screenStates.RESULT && <ResultWidget results={results} playerName={playerName} />}
      </QuizContainer>
    </BackgroundImage>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.exact({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    answer: PropTypes.number,
    alternatives: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
};

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.bool).isRequired,
  playerName: PropTypes.string.isRequired,
};

QuizPage.propTypes = {
  externalQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  externalBg: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
};
