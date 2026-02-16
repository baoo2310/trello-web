export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholderCard = (column) => {
  return {
    id: `${column.id}-placeholder-card`,
    boardId: column.boardId || column.board_id,
    columnId: column.id,
    FE_PlaceholderCard: true,
  }
}

// This technique use css pointer-event to block user spam click at everywhere click action call api
// This code use one time for all the project
// With every link or button which has the action call api then add class "interceptor-loading"

export const interceptorLoadingElements = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading');
  for(let i = 0; i < elements.length; i++) {
    if(calling){
      elements[i].style.opacity = 0.5;
      elements[i].style.pointerEvents = 'none';
    }
    else{
      elements[i].style.opacity = 'initial';
      elements[i].style.pointerEvents = 'initial';
    }
  }
}