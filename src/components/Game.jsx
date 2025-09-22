import { useState } from "react"
import ChessBox from "./ChessBox";
import { Button, Grid } from "@mui/material";
import API from "../lib/api";
import { toast } from "react-toastify";

const Game = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleSelectBox = async (boxId) => {
    if (boxId) {
      try {
        const res = await API.post(`/game/move/${boxId}`);
        if (selectedBox === res.data.boxId) {
          setSelectedBox(null)
        } else {
          setSelectedBox(res.data.boxId)
        }
      } catch (err) {
        toast.error(err.response.data)
      }
    }
  }

  const handleUndo = async () => {
    try {
      const res = await API.patch('/game/undo');
      setSelectedBox(res.data.boxId)
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  const handleRedo = async () => {
    try {
      const res = await API.patch('/game/redo');
      setSelectedBox(res.data.boxId)
    } catch (err) {
      toast.error(err.response.data)
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container columns={{ md: 12 }}>
        {[...Array(8)].map((ele, i) =>
          <div  key={i}>
            {[...Array(8)].map((ele, j) =>
              <Grid size={{ md: 1.5 }} sx={{ width: 'auto' }} onClick={() => handleSelectBox((8 * i) + j + 1)}>
                <ChessBox key={(8 * i) + j + 1} bgColor={((j - i) % 2) ? 'black' : 'white'} selected={((8 * i) + j + 1) === Number(selectedBox)} />
              </Grid>
            )}
          </div>
        )}
      </Grid >

      <div style={{ marginLeft: '100px', display: 'flex', flexDirection: 'column' }}>
        <Button variant="outlined" color="error" sx={{ marginBottom: '20px' }} onClick={handleUndo}>
          Undo
        </Button>
        <Button variant="outlined" onClick={handleRedo}>
          Redo
        </Button>
      </div>
    </div>
  )
}

export default Game;
