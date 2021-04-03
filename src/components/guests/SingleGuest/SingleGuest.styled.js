import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

const InfoCard = styled(Box)`
background: #fff;
padding: 32px;
border-radius: 4px;
box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.15);

p:last-child {
  color: #718096;
  font-size: 0.875rem;
  margin-top: auto;
}
`;

const SmallFullCard = styled(Box)`
  background: #fff;
  padding: 1rem;

  h3 {
    color: ${(props) => props.theme.colors.green.brand};
  }
`

const SingleGuestStyles = { InfoCard, SmallFullCard }

export default SingleGuestStyles;