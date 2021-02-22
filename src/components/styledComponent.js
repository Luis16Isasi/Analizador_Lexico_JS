import styled from 'styled-components';

export const ContentDiv = styled.div`
  min-width: 650px;
  max-width: 1000px;
  margin: 0px;
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 140px;
  margin: 0px 0px 10px 0px;
  /* background-color: #ffa755; */
  background-image: linear-gradient(to right, #32beed 40%, #163ea1);
  background: -moz-linear-gradient(to right, #32beed 40%, #163ea1);
  background: -webkit-gradient(to right, #32beed 40%, #163ea1);
  background: -webkit-linear-gradient(to right, #32beed 40%, #163ea1);
  background: -o-linear-gradient(to right, #32beed 40%, #163ea1);
  background: -ms-linear-gradient(to right, #32beed 40%, #163ea1);
  background: linear-gradient(to right, #32beed 40%, #163ea1);

  & > textarea {
    padding: 15px;
    border: none;
    border-radius: 5px;
    box-shadow: 3px 3px 7px #74717a;
    width: 350px;
    min-width: 350px;
    max-width: 350px;
    height: 70px;
    min-height: 70px;
    max-height: 160px;
    font-size: 18px;
  }
`;

export const ContentDivButton = styled.div`
  padding: 5px;
  height: auto;
`;

export const Button = styled.button`
  border: none;
  border-radius: 24px;
  height: 45px;
  width: 140px;
  color: white;
  box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.25);
  background-color: #2f3545;
  font-size: 20px;
  margin: 8px;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-around;
  align-items: center;

  & > * {
    font-weight: 400;
    color: white;
  }

  &:hover {
    background-color: #394054;
    box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, 0.5);
  }
`;
export const ContentOutputDiv = styled.div`
  background-color: white;
  width: 220px;
  height: 240px;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 5px 5px 15px #d7d1e2;

  & > p {
    font-weight: 500;
  }
  & > p > b {
    color: #2e38e8;
    font-size: 20px;
  }
`;

export const DivOutput = styled.div`
  border-radius: 10px;
  height: 180px;
  width: 100%;
  overflow-y: auto;
`;
export const List = styled.ul`
  position: relative;
  top: -15px;
`;

export const Li = styled.li`
  display: flex;
  flex-flow: nowrap column;
  position: relative;
  margin: 10px;
  left: -45px;
  padding: 0px;
  width: 114%;
`;
