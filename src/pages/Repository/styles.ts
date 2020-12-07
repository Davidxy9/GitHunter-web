import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface PaginationItemProps {
  isSelect?: boolean;
}

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3a3a3a;
    max-width: 450px;
    line-height: 56px;

    margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
   margin-top: 40px;
   max-width: 700px;

   display: flex;

   input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${props =>
    props.hasError &&
    css`
        border-color: #c53030;
      `}

    &::placeholder{
      color: #a8a8b3;
    }
  }

   button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 30px;
`;



export const Pagination = styled.div`
  margin-top: 5px;
  display: flex;
  min-width: 500px;
  justify-content: center;
  padding-left: 100 px;
  //margin: 0 4px;
  align-items: center;


`;

export const PaginationButton = styled.div`
  display: flex;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: #f0f0f5;

`;

export const PaginationItem = styled.div<PaginationItemProps>`
   margin: 0 10px;
  //border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  color: black;
  font-size: 22px;
  font-weight: semi-bold;
  border-radius: 1px;
  //border-width: 5px;

    button {
      width: 100px;
      height: 30px;
      background: #04d361;
      border-radius: 5px 5px 5px 5px;
      border: 0;
      color: #fff;
      font-weight: bold;
      transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, '#04d361')};
        }
      }


  ${props => props.isSelect && {
    borderRadius: '5px 5px 5px 5px',
    background: '#04d361',
    padding: '0 5px',
    transition: 'background-color .3s',
  }}

`;

export const TextLinkGrid = styled.div`
  color: white;
  font-weight: semi-bold;
  text-decoration: none;

`;

export const StarsAndForksText = styled.text`
  font-weight: bold;

  & + text{
   margin-left: 5px;

  }
`;
