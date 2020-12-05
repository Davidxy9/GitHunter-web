import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';



import logoImg from '../../assets/logo.svg';

import { Title, Grids, Form } from './styles';

interface languageInItemsData {
  id: string;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}


const Dashboard: React.FC = () => {

  const [languagesInItems, setLanguagesInItems] = useState<languageInItemsData[]>([]);
  const [newChoice, setNewChoice] = useState('');


  async function handleAddRepositories(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await api.get(`https://api.github.com/search/repositories?q=language:${newChoice}&sort=stars&page=1`).then(response => {
      setLanguagesInItems(response.data.items);
    })


  }

  /*  useEffect(() => {
     api.get(`https://api.github.com/search/repositories?q=language:${newChoice}&sort=stars&page=1`).then(response => {
       setLanguagesInItems(response.data.items);
     })

   }, [newChoice]); */



  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios</Title>

      <Form onSubmit={handleAddRepositories}>
        <input
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          placeholder="Digite a linguagem dos repositórios" />
        <button type="submit">Pesquisar</button>
      </Form>


      <Grids>
        {languagesInItems.map(language => (

          <Link key={language.id} target="_blank" to={`//github.com/${language.full_name}`}>
            <img
              src={language.owner.avatar_url}
              alt={language.owner.login}
            />

            <div>
              <strong>{language.name}</strong>
              <p>{language.description}</p>
            </div>

            <strong>{language.stargazers_count}</strong>
            <span>Stars</span>
            <p>{language.forks_count}</p>
            <span>Forks</span>



            <FiChevronRight size={20} />
          </Link >
        ))}

      </Grids>
    </>
  );
}



export default Dashboard;
