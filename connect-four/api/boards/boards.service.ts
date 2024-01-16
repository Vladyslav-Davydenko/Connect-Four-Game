import { Connect4Game } from "../../src/types/domain/board.model";

import { httpCommon, BOARD_ROUTE } from "..";

const getAllData = () => httpCommon.get(`${BOARD_ROUTE}`);

// ID will be created on backend
const createNewData = (board: Partial<Connect4Game>) =>
  httpCommon.post(`${BOARD_ROUTE}`, JSON.stringify(board));
const deleteData = (id: string) => httpCommon.delete(`${BOARD_ROUTE}/${id}`);

export const boardService = {
  getAllData,
  createNewData,
  deleteData,
};
