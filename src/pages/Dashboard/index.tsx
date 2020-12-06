import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';



import logoImg from '../../assets/logo.svg';

import { Title, Grids, Form, Pagination, PaginationButton, PaginationItem, Error } from './styles';

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
  const total = 100;
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputError, setInputError] = useState('');



  function handleAddRepositories(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newChoice) {
      setInputError('Digite uma linguagem');
      return;
    }

    api.get(`https://api.github.com/search/repositories?q=language:${newChoice}&sort=stars&page=1`).then(response => {

      const totalPages = Math.ceil(total / limit)

      const arrayPages: [] = [];
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i as never);
      }

      setPages(arrayPages);
      setLimit(10);
      setLanguagesInItems(response.data.items);

      setInputError('');


    })


  }

  useEffect(() => {
    api.get(`https://api.github.com/search/repositories?q=languages???&sort=stars&page=${currentPage}`).then(response => {
      setLanguagesInItems(response.data.items);
    })

  }, [currentPage]);



  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepositories}>
        <input
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          placeholder="Digite a linguagem dos repositórios" />
        <button name="Button" type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

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

            <ul>
              <li>
                <strong>{language.stargazers_count}</strong>
                <span>Stars</span>
              </li>
              <li>
                <strong>{language.forks_count}</strong>
                <span>Forks</span>
              </li>
            </ul>

            {/*  <strong>{language.stargazers_count}</strong>
            <span>Stars</span>
            <p>{language.forks_count}</p>
            <span>Forks</span>
 */}


            <FiChevronRight size={20} />
          </Link >
        ))}
        <Pagination>
          <PaginationButton>
            {currentPage > 1 && (
              <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </PaginationItem>
            )}
            {pages.map((page) => (
              <PaginationItem
                isSelect={page === currentPage}
                key={page} onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationItem>
            ))}
            {currentPage < pages.length && (
              <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </PaginationItem>
            )}

          </PaginationButton>
        </Pagination>

      </Grids>
    </>
  );
}



export default Dashboard;
