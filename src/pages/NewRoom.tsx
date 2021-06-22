import {Link} from 'react-router-dom'

import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';

import Button from '../components/Button';
import '../styles/auth.scss';


const NewRoom: React.FC = () => {
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImage} alt="Illustration for Q&A" />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas da audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImage} alt="letmeask logo" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar a sala</Button>
          </form>
          <p>
            Quer entrar numa sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;
