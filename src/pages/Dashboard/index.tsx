import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
//import api from '../../services/api';


import logoImg from '../../assets/logo.svg';


import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios</Title>

      <Form>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img src="https://avatars3.githubusercontent.com/u/55166538?s=460&u=0d608fa19290cb96c761ef39af93a91f67882227&v=4"
            alt="Davin"
          />
          <div>
            <strong>Davidxy9/GoBarberApp</strong>
            <p>Projeto de serviços de uma barbearia</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
}

export default Dashboard;
