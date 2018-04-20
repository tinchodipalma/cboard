import defaultBoards from '../../api/boards.json';

import {
  IMPORT_BOARDS,
  CHANGE_BOARD,
  PREVIOUS_BOARD,
  CREATE_BOARD,
  CREATE_TILE,
  DELETE_TILES,
  EDIT_TILES,
  FOCUS_TILE,
  CHANGE_OUTPUT
} from './Board.constants';

// const [...boards] = defaultBoards.advanced;
// TODO: delete after Microsoft Build 2018 conference
const msBuildDemoBoards = [
   {
      "id": "root",
      "nameKey": "cboard.board.home",
      "tiles": [
        {
          "labelKey": "cboard.vocalization.myNameIsAmberley",
          "vocalizationKey": "cboard.vocalization.myNameIsAmberley",
          "image": "symbols/mulberry/correct.svg",
          "id": "HsVQfR9pX5F-"
        },
        {
          "labelKey": "cboard.vocalization.niceToMeetYou",
          "vocalizationKey": "cboard.vocalization.niceToMeetYou",
          "image": "symbols/mulberry/no.svg",
          "id": "SkBQMRqpX5t-"
        },
        {
          "labelKey": "cboard.vocalization.iHadAGreatTime",
          "vocalizationKey": "cboard.vocalization.iHadAGreatTime",
          "image": "symbols/cboard/speech_bubble.svg",
          "id": "S1LdsadQGA9p7qK-"
        },
        {
          "labelKey": "cboard.vocalization.iHadAnAwfulTime",
          "vocalizationKey": "cboard.vocalization.iHadAnAwfulTime",
          "image": "symbols/cboard/speech_bubble.svg",
          "id": "S1LQGA9p7qK-"
        }
      ]
    }
];

const boards = msBuildDemoBoards;

const rootBoardId = 'root';
const initialState = {
  boards,
  output: [],
  activeBoardId: rootBoardId,
  navHistory: [rootBoardId]
};

function tileReducer(board, action) {
  switch (action.type) {
    case CREATE_TILE:
      return {
        ...board,
        tiles: [...board.tiles, { ...action.tile }]
      };
    case DELETE_TILES:
      return {
        ...board,
        tiles: board.tiles.filter(tile => action.tiles.indexOf(tile.id) === -1)
      };
    case EDIT_TILES:
      return {
        ...board,
        tiles: board.tiles.map(
          tile => action.tiles.find(s => s.id === tile.id) || tile
        )
      };
    default:
      return board;
  }
}

function boardReducer(state = initialState, action) {
  switch (action.type) {
    case IMPORT_BOARDS:
      return {
        ...state,
        boards: action.boards
      };
    case CHANGE_BOARD:
      return {
        ...state,
        navHistory: [...state.navHistory, action.boardId],
        activeBoardId: action.boardId
      };
    case PREVIOUS_BOARD:
      const [...navHistory] = state.navHistory;
      if (navHistory.length === 1) {
        return state;
      }
      navHistory.pop();
      return {
        ...state,
        navHistory,
        activeBoardId: navHistory[navHistory.length - 1]
      };
    case CREATE_BOARD:
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            id: action.boardId,
            name: action.boardName,
            nameKey: action.boardNameKey,
            tiles: []
          }
        ]
      };
    case CREATE_TILE:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId ? board : tileReducer(board, action)
        )
      };
    case DELETE_TILES:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId ? board : tileReducer(board, action)
        )
      };
    case EDIT_TILES:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId ? board : tileReducer(board, action)
        )
      };
    case FOCUS_TILE:
      return {
        ...state,
        boards: state.boards.map(
          board =>
            board.id !== action.boardId
              ? board
              : { ...board, focusedTileId: action.tileId }
        )
      };
    case CHANGE_OUTPUT:
      return {
        ...state,
        output: [...action.output]
      };
    default:
      return state;
  }
}

export default boardReducer;
