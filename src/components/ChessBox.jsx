import { Box } from "@mui/material";

const ChessBox = ({ bgColor = 'white', selected = true }) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        border: '1px solid black',
        outline: selected ? '3px solid blue' : 'none',
        outlineOffset: '-2px',
        height: '70px',
        width: '70px',
      }}
    />
  )
}

export default ChessBox;
