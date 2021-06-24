import { useHistory, useParams } from 'react-router-dom';
import logoImage from '../assets/images/logo.svg';
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
import useRoom from '../hooks/useRoom';

import deleteImage from '../assets/images/delete.svg';
import checkImage from '../assets/images/check.svg';
import answerImage from '../assets/images/answer.svg';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParms = {
  id: string;
};

const AdminRoom: React.FC = () => {
  const history = useHistory();
  const { id: roomId } = useParams<RoomParms>();
  const { title, questions } = useRoom(roomId);

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Are you you want to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  };

  const handleHighlightedQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  const handleCheckQuestionAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    });

    history.push('/');
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="logo" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button onClick={() => handleCheckQuestionAnswered(question.id)}>
                    <img src={checkImage} alt="Check as answered" />
                  </button>
                  <button onClick={() => handleHighlightedQuestion(question.id)}>
                    <img src={answerImage} alt="Highlight question" />
                  </button>
                </>
              )}
              <button onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImage} alt="Delete question" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
