/* eslint-disable react-hooks/set-state-in-effect */
import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data';
import AppBar from '../components/AppBar/AppBar';
import { useEffect, useState } from 'react';
import { fetchBoardDetailsAPI } from '~/apis';

function Board() {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const boardId = '00639985-a8d7-48ff-94c2-76bab983a69a';
        fetchBoardDetailsAPI(boardId).then((board) => {
            setBoard(board)
        });
    }, [])
    return (
        <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
            <AppBar />
            <BoardBar board={board}/>
            <BoardContent board={board}/>
        </Container>
    )
}

export default Board

// column id: de64ae62-1fce-4b98-af30-e1a7cbf6c91d
// board id: 00639985-a8d7-48ff-94c2-76bab983a69a
// card id: b58d0f8e-3a43-4eda-a6b6-bea4dc807a2b