import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';


import logoImg from '../../assets/logo.svg';

import { Title, Grids } from './styles';

interface language {
  id: string;
  name: string;
  forks_url: string;
}
//import axios from 'axios';

const Dashboard: React.FC = () => {

  const [languages, setLanguages] = useState<language[]>([]);

  useEffect(() => {
    api.get('https://api.github.com/search/repositories?q=java:???&sort=stars&page=1').then(response => {
      setLanguages(response.data.items);
    })

  }, [languages])


  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios</Title>
      {/*
      <Form onSubmit={handleAddRepositories}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite a linguagem" />
        <button type="submit">Pesquisar</button>
      </Form> */}


      <Grids>
        {languages.map(language => (

          <a key={language.id} href="/#">

            <div>
              <strong>{language.name}</strong>
              <p>{language.forks_url}</p>

            </div>

            <FiChevronRight size={20} />
          </a>
        ))}

      </Grids>
    </>
  );
}

export default Dashboard;
