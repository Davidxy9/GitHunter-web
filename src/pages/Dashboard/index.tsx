import React, { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';



import logoImg from '../../assets/logo.svg';

import { Title, Grids } from './styles';

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

  useEffect(() => {
    api.get('https://api.github.com/search/repositories?q=java:???&sort=stars&page=1').then(response => {
      setLanguagesInItems(response.data.items);





    })

  }, [languagesInItems]);





  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios</Title>


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
