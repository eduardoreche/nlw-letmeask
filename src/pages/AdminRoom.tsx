import { useParams } from 'react-router-dom';
import logoImage from '../assets/images/logo.svg';
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
import useRoom from '../hooks/useRoom';

import deleteImage from '../assets/images/delete.svg';

import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParms = {
  id: string;
};

const AdminRoom: React.FC = () => {
  const { id: roomId } = useParams<RoomParms>();
  const { title, questions } = useRoom(roomId);

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Are you you want to delete this question?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="logo" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar Sala</Button>
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
            <Question key={question.id} content={question.content} author={question.author}>
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
