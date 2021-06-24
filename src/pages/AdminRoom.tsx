import { useParams } from 'react-router-dom';
import logoImage from '../assets/images/logo.svg';
import Button from '../components/Button';
import Question from '../components/Question';
import RoomCode from '../components/RoomCode';
import useRoom from '../hooks/useRoom';

import '../styles/room.scss';

type RoomParms = {
  id: string;
};

const AdminRoom: React.FC = () => {
  const { id: roomId } = useParams<RoomParms>();
  const { title, questions } = useRoom(roomId);

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
            <Question key={question.id} content={question.content} author={question.author} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
