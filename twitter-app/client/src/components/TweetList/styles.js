import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #cccccc;
  background: white;
  max-width: 640px;
  width: 100%;
  box-sizing: border-box;

  > textarea {
    resize: none;
    margin-bottom: 1rem;
    border-radius: 10px;
    border: 1px solid #1da1f2;
    padding: 0.6rem;
  }

  > div {
    display: flex;
    justify-content: flex-end;

    > button {
      background: white;
      border-radius: 20px;
      border: 1px solid #1da1f2;
      padding: 0.4rem 1rem;
      color: #1da1f2;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        background: #1da1f2;
        color: white;
      }
    }
  }
`;