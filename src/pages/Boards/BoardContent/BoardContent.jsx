/* eslint-disable react-hooks/set-state-in-effect */
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { useColorScheme } from '@mui/material/styles';
import { arrayMove } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';

import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { generatePlaceholderCard } from '~/utils/formatter';
import { updateBoardAPI, updateCardAPI, updateColumnAPI } from '~/apis';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const toUuidList = (cards) => {
  return (cards || [])
    .map(card => card?.id || card?._id)
    .filter(id => typeof id === 'string' && UUID_RE.test(id));
};

function BoardContent({ board, createNewColumn, createNewCard, deleteCard, deleteColumn }) {
  const { mode } = useColorScheme();
  // if use PointerSensor default has to associate with the touch-action = 'none' but have bugs.
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });
  // Require the mouse move 10px before activating
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
  // Press and hold 250ms and move 5px to activate the event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } });
  const sensors = useSensors(mouseSensor, touchSensor);
  const [orderedColumns, setOrderedColumns] = useState([]);
  // at the same time, just one item is being drag (card or column)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDragging, setOldColumnWhenDragging] = useState(null);

  const normalizeColumns = (columns) => {
    return columns.map((column) => {
      const rawCards = column?.cards || [];
      const normalizedCards = rawCards.map((card) => ({
        ...card,
        id: card.id || card._id,
        columnId: card.columnId || card.column_id,
      }));

      const realCards = normalizedCards.filter(card => !card.FE_PlaceholderCard);
      if (isEmpty(realCards)) {
        const placeholder = generatePlaceholderCard(column);
        return {
          ...column,
          cards: [placeholder],
          card_order_ids: [placeholder.id],
        };
      }
      return {
        ...column,
        cards: realCards,
        card_order_ids: column?.card_order_ids || realCards.map(card => card.id)
      };
    });
  };

  useEffect(() => {
    const columns = (board?.columns || []).map((column) => {
      const cardsFromBoard = board?.cards;
      const cardsFromColumn = column?.cards || [];
      const cards = Array.isArray(cardsFromBoard)
        ? cardsFromBoard.filter(card => (card.column_id ?? card.columnId) === column.id)
        : cardsFromColumn;
      return { ...column, cards };
    });
    const ordered = mapOrder(columns, board?.column_order_ids || board?.columnOrderIds, 'id');
    setOrderedColumns(normalizeColumns(ordered));
  }, [board]);
  // Find a column base on cardId 
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card.id)?.includes(cardId));
  }

  const handleDragStart = (event) => {
    const data = event?.active?.data?.current;
    const isCard =
      Boolean(data?.columnId) || Boolean(data?.column_id);

    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      isCard ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(data);

    if (isCard) {
      setOldColumnWhenDragging(findColumnByCardId(event?.active?.id));
    }
  }

  const handleDragOver = (event) => {
    // do nothing if dragging column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    // if dragging card => handle moving card between column
    const { active, over } = event;
    if (!active || !over) return;
    // activeDraggingCardData is the card being dragged
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
    // overCard is the card being at top or bottom compared to the card being dragged
    const { id: overCardId } = over;

    // Find 2 columns base on the card id
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return
    if (activeColumn.id !== overColumn.id) {
      setOrderedColumns(prevColumns => {
        // find the position of overCard in the goal column
        const overCardIndex = overColumn?.cards?.findIndex(card => card.id === overCardId);

        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
        // clone the old array OrderedColumnsState to a new one to modifier. After that return the new one
        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find(column => column.id === activeColumn.id);
        const nextOverColumn = nextColumns.find(column => column.id === overColumn.id)
        if (nextActiveColumn) {
          // remove card at active column 
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card.id !== activeDraggingCardId)
          // update the card_order_ids
          nextActiveColumn.card_order_ids = nextActiveColumn.cards.map(card => card.id);
        }
        if (nextOverColumn) {
          // keep existing cards in the target column
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData);
          nextOverColumn.card_order_ids = nextOverColumn.cards.map(card => card.id);
        }


        return normalizeColumns(nextColumns);
      })
    }
  }

  const handleDragEnd = (event) => {
    // console.log(event);
    const { active, over } = event;
    if (!active || !over) return;
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCardData is the card being dragged
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active;
      // overCard is the card being at top or bottom compared to the card being dragged
      const { id: overCardId } = over;

      // Find 2 columns base on the card id
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDragging.id !== overColumn.id) {
        // find the position of overCard in the goal column
        const overCardIndex = overColumn?.cards?.findIndex(card => card.id === overCardId);

        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height / 2;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(orderedColumns);
        const nextActiveColumn = nextColumns.find(column => column.id === activeColumn.id);
        const nextOverColumn = nextColumns.find(column => column.id === overColumn.id);
        const movedCard = {
          ...activeDraggingCardData,
          column_id: overColumn.id,
          columnId: overColumn.id
        };
        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card.id !== activeDraggingCardId);
          if (isEmpty(nextActiveColumn.cards)) {
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
          }
          nextActiveColumn.card_order_ids = nextActiveColumn.cards.map(card => card.id);
        }
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, movedCard);
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard);
          nextOverColumn.card_order_ids = nextOverColumn.cards.map(card => card.id);
        }

        setOrderedColumns(normalizeColumns(nextColumns));

        const nextActiveCardIds = toUuidList(nextActiveColumn?.cards);
        const nextOverCardIds = toUuidList(nextOverColumn?.cards);

        updateColumnAPI(nextActiveColumn.id, { card_order_ids: nextActiveCardIds });
        updateColumnAPI(nextOverColumn.id, { card_order_ids: nextOverCardIds });
        updateCardAPI(activeDraggingCardId, { column_id: overColumn.id });
      }
      else {
        const oldCardIndex = oldColumnWhenDragging?.cards?.findIndex(c => c.id === activeDragItemId); // Old index of active
        const newCardIndex = overColumn?.cards?.findIndex(c => c.id === overCardId); // Old index of active
        const dndOrderedCards = arrayMove(oldColumnWhenDragging?.cards, oldCardIndex, newCardIndex);
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn = nextColumns.find(c => c.id === overColumn.id);
          targetColumn.cards = dndOrderedCards;
          targetColumn.card_order_ids = dndOrderedCards.map(c => c.id);

          return normalizeColumns(nextColumns);
        });
        const orderedCardIds = toUuidList(dndOrderedCards);
        updateColumnAPI(overColumn.id, { card_order_ids: orderedCardIds });
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c.id === active.id); // Old index of active
        const newColumnIndex = orderedColumns.findIndex(c => c.id === over.id); // Old index of active
        // Use arrayMove to sort column 
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
        setOrderedColumns(dndOrderedColumns);
        const dndOrderedColumnIds = dndOrderedColumns.map(c => c.id);
        updateBoardAPI(board.id, { columnOrderIds: dndOrderedColumnIds });
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDragging(null);
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
      <Box sx={{
        bgcolor: mode === 'dark' ? '#34495e' : '#1976d2',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0',
        '&::-webkit-scrollbar-track': {
          m: 2,
        },
      }}>
        <ListColumns 
          columns={orderedColumns} 
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteCard={deleteCard}
          deleteColumn={deleteColumn}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent