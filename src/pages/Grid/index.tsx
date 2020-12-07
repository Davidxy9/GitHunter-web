import React, { useState, useEffect, FormEvent } from 'react';
import {
  Container, Row, Col,
  Card, Button, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody
} from 'reactstrap';
import api from '../../services/api';
import {
  Title, Form, Pagination, PaginationButton,
  PaginationItem, Error, TextLinkGrid, StarsAndForksText, ContainerList
} from './styles';
import { Link } from 'react-router-dom';
import './stylesCard.css';
import { BsGrid3X3, FiChevronRight } from 'react-icons/all';




import logoImg from '../../assets/logo.svg';

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



const Grid: React.FC = () => {
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

      <Container >
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

        <ContainerList>
          <div className="container-left">
            <h1>
              Repositórios principais
          </h1>
          </div>

          <div className="container-right">
            <Link to={'/'}>
              <Button
                className="ListDash"
                style={{ marginTop: '10px', height: '43px', paddingTop: '4px 12px' }}
                color="secondary">
                <TextLinkGrid>LIST</TextLinkGrid>

                <BsGrid3X3 size={17} />
              </Button>
            </Link>
          </div>
        </ContainerList>

        <Row className="Top" style={{ marginTop: '10px' }}>
          {languagesInItems.map(language => (
            <Col xs="6" sm="4" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Link style={{ textDecoration: 'none' }}
                key={language.id}
                target="_blank"
                to={`//github.com/${language.full_name}`}

              >
                <Card
                  classname="CardStyles"
                  style={{ marginTop: '10px' }}>
                  <CardImg
                    top width="100%"
                    src={language.owner.avatar_url}
                    alt={language.owner.login} />
                  <CardBody>
                    <CardTitle tag="h5">{language.name}</CardTitle>
                    <CardSubtitle
                      tag="h6"
                      className="mb-10 text-muted limitText">
                      {language.description}
                    </CardSubtitle>
                    <CardText>
                      <StarsAndForksText>
                        Stars:
                        </StarsAndForksText>
                      {language.stargazers_count}
                      <StarsAndForksText>
                        Forks:
                        </StarsAndForksText>
                      {language.forks_count}
                    </CardText>

                    <FiChevronRight style={{ marginLeft: '90px', color: '#cbcbd6' }} size={20} />

                  </CardBody>

                </Card>
              </Link>
            </Col>


          ))}

          <Pagination>
            <PaginationButton>
              {currentPage > 1 && (
                <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <button>Previous</button>
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
                  <button>Next</button>
                </PaginationItem>
              )}

            </PaginationButton>
          </Pagination>


        </Row>



      </Container>

    </>


  )
}

export default Grid;
