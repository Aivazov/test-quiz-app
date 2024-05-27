import React from "react";
import { LuSquareStack } from "react-icons/lu";
import { styled } from "@mui/material/styles";
// import { Button, ButtonGroup } from "@chakra-ui/react";
import Button, { ButtonProps } from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

type Props = {};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[100]),
  width: "20px",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: purple[100],
  },
}));

const Header = (props: Props) => {
  return (
    <div className="w-[100px] flex justify-center items-start pt-5">
      <ColorButton variant="contained">
        <Link to="/">
          <IconContext.Provider value={{ color: "brown", size: "20px" }}>
            <LuSquareStack />
          </IconContext.Provider>
        </Link>
      </ColorButton>
      {/* <Button variant="contained" className="w-[auto] bg-transparent">
        <Link to="/">
          <LuSquareStack />
        </Link>
      </Button> */}
      {/* <Button colorScheme="blue" variant="outline">
        <Link to="/">
          <LuSquareStack />
          Button
        </Link>
      </Button> */}

      {/* <ButtonGroup>
        <Button colorScheme="orange">Orange</Button>
      </ButtonGroup> */}
    </div>
  );
};

export default Header;
