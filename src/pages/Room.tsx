import { useParams } from 'react-router-dom';
import logoImage from '../assets/images/logo.svg';
import Button from '../components/Button';
import RoomCode from '../components/RoomCode';

import '../styles/room.scss';

type RoomParms = {
  id: string;
};

const Room: React.FC = () => {
  const { id } = useParams<RoomParms>();

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImage} alt="logo" />
          <RoomCode code={id} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?" />
          <div className="form-footer">
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Room;
