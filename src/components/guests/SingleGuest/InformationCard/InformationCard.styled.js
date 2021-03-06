import styled from "@emotion/styled";

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e6e6e6;
  margin: 2rem 0;
`;

const Bio = styled.p`
  padding: 16px;
  background: #19c39c20;
  margin-top: 16px;
  border-radius: 4px;
  position: relative;
  white-space: break-spaces;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 3px;
    background: ${(props) => props.theme.colors.green.brand};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h2 {
    color: ${(props) => props.theme.colors.black.dark};
  }

  h3 {
    color: ${(props) => props.theme.colors.green.brand};
    display: inline-block;
  }

  a:hover {
    h3 {
      color: ${(props) => props.theme.colors.green.hover};
    }
  }
`;

const Votes = styled.div`
  min-width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  color: #19c39c;
  font-size: 36px;
  padding: 0 10px;

  span {
    color: #333;
    font-size: 20px;
    display: inline-block;
    margin: 0 4px;
  }
`;

const Styles = { Divider, Bio, Header, Votes }

export default Styles;