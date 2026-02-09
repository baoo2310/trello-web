/* eslint-disable react-hooks/set-state-in-effect */
import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data';
import AppBar from '../components/AppBar/AppBar';
import { useEffect, useState } from 'react';
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI } from '~/apis';
import { isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatter';

function Board() {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        const boardId = 'b927744a-d3b1-4778-bad9-5b0d8c73ac06';
        fetchBoardDetailsAPI(boardId).then((board) => {
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    const placeholder = generatePlaceholderCard(column);
                    column.cards = [placeholder];
                    column.card_order_ids = [placeholder.id];
                }
            })
            setBoard(board)
        });
    }, [])

    // This function is used to call API to create new column and re-render state-board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            board_id: board.id
        });
        const placeholder = generatePlaceholderCard(createdColumn);
        createdColumn.cards = [placeholder];
        createdColumn.card_order_ids = [placeholder.id];

        // update state board
        const newBoard = { ...board }
        newBoard.columns.push(createdColumn);
        newBoard.column_order_ids.push(createdColumn.id);
        setBoard(newBoard);
    };

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            board_id: board.id
        });
        // update state board
        const newBoard = { ...board };
        const columnToUpdate = newBoard.columns.find(
            column => column.id === createdCard.column_id
        );
        if (columnToUpdate) {
            columnToUpdate.cards = (columnToUpdate.cards || []).filter(c => !c.FE_PlaceholderCard);
            columnToUpdate.cards.push(createdCard);
            columnToUpdate.card_order_ids = columnToUpdate.cards.map(c => c.id);
        }
        setBoard(newBoard);
    };

    return (
        <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
            <AppBar />
            <BoardBar board={board}/>
            <BoardContent 
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
            />
        </Container>
    )
}

export default Board

// column id: de64ae62-1fce-4b98-af30-e1a7cbf6c91d
// board id: 00639985-a8d7-48ff-94c2-76bab983a69a
// card id: b58d0f8e-3a43-4eda-a6b6-bea4dc807a2b