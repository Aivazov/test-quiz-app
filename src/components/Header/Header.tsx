// import React from 'react';
import { LuSquareStack } from 'react-icons/lu';
import { CgAddR } from 'react-icons/cg';
import { styled } from '@mui/material/styles';
// import { Button, ButtonGroup } from "@chakra-ui/react";
import Button, { ButtonProps } from '@mui/material/Button';
import { purple, green } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

type Props = {
  buttonSize?: number; // Размер стороны квадратной кнопки в пикселях
};

// const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
//   color: theme.palette.getContrastText(purple[100]),
//   width: '20px',
//   backgroundColor: 'transparent',
//   '&:hover': {
//     backgroundColor: purple[100],
//   },
// }));

const ColorButton = styled(Button)<ButtonProps & { buttonSize: number }>(
  ({ theme, buttonSize }) => ({
    color: theme.palette.getContrastText(purple[100]),
    width: buttonSize,
    height: buttonSize,
    minWidth: buttonSize,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: purple[100],
    },
    '&:focus': {
      backgroundColor: purple[100],
    },
  })
);

const ColorButton2 = styled(Button)<ButtonProps & { buttonSize: number }>(
  ({ theme, buttonSize }) => ({
    color: theme.palette.getContrastText(green[100]),
    width: buttonSize,
    height: buttonSize,
    minWidth: buttonSize,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: green[300],
    },
    '&:focus': {
      backgroundColor: green[300],
    },
  })
);

const Header = ({ buttonSize = 50 }: Props) => {
  return (
    <div className='w-[100px] flex flex-col justify-start items-center pt-5 border-r-[1px] border-black h-screen gap-8'>
      <Link to='/'>
        <ColorButton variant='contained' buttonSize={buttonSize}>
          <IconContext.Provider value={{ color: 'brown', size: '30px' }}>
            <LuSquareStack />
          </IconContext.Provider>
        </ColorButton>
      </Link>

      <Link to='/add' className=''>
        <ColorButton2 variant='contained' buttonSize={buttonSize}>
          <IconContext.Provider value={{ color: 'brown', size: '30px' }}>
            <CgAddR />
          </IconContext.Provider>
        </ColorButton2>
      </Link>
    </div>
  );
};

export default Header;

{
  /* <Button variant="contained" className="w-[auto] bg-transparent">
        <Link to="/">
          <LuSquareStack />
        </Link>
      </Button> */
}
{
  /* <Button colorScheme="blue" variant="outline">
        <Link to="/">
          <LuSquareStack />
          Button
        </Link>
      </Button> */
}

{
  /* <ButtonGroup>
        <Button colorScheme="orange">Orange</Button>
      </ButtonGroup> */
}
