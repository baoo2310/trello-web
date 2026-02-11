/* eslint-disable react-hooks/set-state-in-effect */
import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data';
import AppBar from '../components/AppBar/AppBar';
import { useEffect } from 'react';
import { createNewCardAPI, createNewColumnAPI, deleteCardAPI, deleteColumnAPI } from '~/apis';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardDetailsAPI, selectCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';
import { useParams } from 'react-router-dom';

function Board() {
    // const [board, setBoard] = useState(null);
    const board = useSelector(selectCurrentActiveBoard);
    const dispatch = useDispatch();

    const { boardId } = useParams();

    useEffect(() => {
        // const boardId = 'b927744a-d3b1-4778-bad9-5b0d8c73ac06';
        dispatch(fetchBoardDetailsAPI(boardId));
    }, [dispatch, boardId]);

    // This function is used to call API to create new column and re-render state-board
    const createNewColumn = async (newColumnData) => {
        if (!board) return;
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            board_id: board.id
        });
        const placeholder = generatePlaceholderCard(createdColumn);
        createdColumn.cards = [placeholder];
        createdColumn.card_order_ids = [placeholder.id];

        // This one got error cause shallow copy -> use deep copy
        // const newBoard = { ...board }
        // update state board
        const newBoard = cloneDeep(board);
        newBoard.columns.push(createdColumn);
        newBoard.column_order_ids.push(createdColumn.id);

        // Another way is use array concat
        // const newBoard = { ...board };
        // newBoard.columns = newBoard.columns.concat([createdColumn]);
        // newBoard.column_order_ids = newBoard.column_order_ids.concat([createdColumn.id]);

        dispatch(updateCurrentActiveBoard(newBoard));
    };

    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            board_id: board.id
        });
        // update state board
        const newBoard = cloneDeep(board);
        const columnToUpdate = newBoard.columns.find(
            column => column.id === createdCard.column_id
        );
        if (columnToUpdate) {
            if(columnToUpdate.cards.some(card => card.FE_PlaceholderCard)){
                columnToUpdate.cards = [createdCard];
                columnToUpdate.card_order_ids = [createdCard.id];
            } else {
                columnToUpdate.cards.push(createdCard);
                columnToUpdate.card_order_ids.push(createdCard.id);
            }            
        }
        dispatch(updateCurrentActiveBoard(newBoard));
    };

    const deleteCard = async (cardId) => {
        const deleted = await deleteCardAPI(cardId);
        if(!deleted) return;
        if (!board) return;
        const newBoard = {
            ...board,
            columns: board.columns.map(column => {
                if (column.id !== deleted.column_id) return column;
                let nextCards = (column.cards || []).filter(c => c.id !== deleted.id);
                if (isEmpty(nextCards)) {
                    const placeholder = generatePlaceholderCard(column);
                    nextCards = [placeholder];
                }
                return {
                    ...column,
                    cards: nextCards,
                    card_order_ids: nextCards.map(c => c.id)
                };
            })
        };
        dispatch(updateCurrentActiveBoard(newBoard));
    }

    const deleteColumn = async (columnId) => {
        const deleted = await deleteColumnAPI(columnId);
        if(!deleted) return;
        if (!board) return;
        const nextColumns = board.columns.filter(c => c.id !== deleted.id);
        const newBoard = {
            ...board,
            columns: nextColumns,
            column_order_ids: nextColumns.map(c => c.id)
        };
        dispatch(updateCurrentActiveBoard(newBoard));
    }

    return (
        <Container disableGutters maxWidth={false} sx={{ height:'100vh' }}>
            <AppBar />
            <BoardBar board={board}/>
            <BoardContent 
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
                deleteCard={deleteCard}
                deleteColumn={deleteColumn}
            />
        </Container>
    )
}

export default Board

// column id: de64ae62-1fce-4b98-af30-e1a7cbf6c91d
// board id: 00639985-a8d7-48ff-94c2-76bab983a69a
// card id: b58d0f8e-3a43-4eda-a6b6-bea4dc807a2b