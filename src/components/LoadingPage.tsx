import { Spinner } from "grommet";
import styled from "styled-components";
import { colors } from "../constants";

// Wrapper for the loading page
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 7rem;
`;

const LoadingPage = () => {
  return (
    <Wrapper>
      <Spinner color={colors.primary} size="large" />
    </Wrapper>
  );
};

export default LoadingPage;
