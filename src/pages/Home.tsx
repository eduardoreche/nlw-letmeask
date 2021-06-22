import {useHistory} from 'react-router-dom'

import {auth, firebase} from '../services/firebase';
import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import Button from '../components/Button';
import '../styles/auth.scss';

const Home: React.FC = () => {
  const history = useHistory();

  const handleCreateRoom = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      console.log(result);
      history.push('/rooms/new');
    })

  }

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImage} alt="Google logo"  />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
