import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';


import logoImg from '../../assets/logo.svg';

import { Title, Grids } from './styles';

interface languageInItemsData {
  id: string;
  name: string;
  description?: string;
  avatar_url: string;
  login: string;
  stargazers_count: number;
}

const Dashboard: React.FC = () => {

  const [languagesInItems, setLanguagesInItems] = useState<languageInItemsData[]>([]);

  useEffect(() => {
    api.get('https://api.github.com/search/repositories?q=java:???&sort=stars&page=1').then(response => {
      setLanguagesInItems(response.data.items);
    })

  }, [languagesInItems])


  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios</Title>


      <Grids>
        {languagesInItems.map(language => (

          <a key={language.id} href="/#">

            <img
              src={language.avatar_url}
              alt={language.login}
            />

            <div>
              <strong>{language.name}</strong>
              <p>{language.stargazers_count}</p>

            </div>

            <FiChevronRight size={20} />
          </a>
        ))}

      </Grids>
    </>
  );
}

export default Dashboard;
