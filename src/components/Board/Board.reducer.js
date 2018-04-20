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
          "image":
            "data:image/jpeg;base64,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",
          "id": "HsVQfR9pX5F-"
        },
        {
          "labelKey": "cboard.vocalization.niceToMeetYou",
          "vocalizationKey": "cboard.vocalization.niceToMeetYou",
          "image": "symbols/mulberry/meet_,_to.svg",
          "id": "SkBQMRqpX5t-"
        },
        {
          "labelKey": "cboard.vocalization.iHadAGreatTime",
          "vocalizationKey": "cboard.vocalization.iHadAGreatTime",
          "image": "symbols/mulberry/funny_laugh.svg",
          "id": "S1LdsadQGA9p7qK-"
        },
        {
          "labelKey": "cboard.vocalization.iHadAnAwfulTime",
          "vocalizationKey": "cboard.vocalization.iHadAnAwfulTime",
          "image": "symbols/mulberry/yucky.svg",
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
