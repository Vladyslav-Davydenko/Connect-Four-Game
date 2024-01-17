import {
  EntityState,
  SerializedError,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

import { boardService } from "../../../api";

import { Connect4Game } from "../../types/domain";

import { toSerializedError } from "../app/utils";
import { Status } from "../../types/domain";

type InitialBoardState = EntityState<Connect4Game, string> & {
  status: Status;
  error: SerializedError | null;
};

const boardAdapter = createEntityAdapter<Connect4Game>();

const initialState: InitialBoardState = boardAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchBoards = createAsyncThunk<
  Connect4Game[],
  void,
  { rejectValue: SerializedError }
>("boards/fetchBoards", async (_, thunkAPI): Promise<Connect4Game[]> => {
  try {
    const responce = await boardService.getAllData();
    return responce.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const addBoard = createAsyncThunk<
  Connect4Game,
  Partial<Connect4Game>,
  { rejectValue: SerializedError }
>("boards/addBoard", async (createdData, thunkAPI): Promise<Connect4Game> => {
  try {
    const nedData = { ...createdData, id: uuidv4() };
    const responce = await boardService.createNewData(nedData);
    return responce.data;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const deleteBoard = createAsyncThunk<
  string,
  string,
  { rejectValue: SerializedError }
>("boards/deleteBoard", async (id, thunkAPI): Promise<string> => {
  try {
    await boardService.deleteData(id);
    return id;
  } catch (error) {
    throw thunkAPI.rejectWithValue(toSerializedError(error));
  }
});

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    [fetchBoards, addBoard, deleteBoard].forEach((thunk) => {
      builder.addCase(thunk.pending, (state) => {
        state.error = null;
        state.status = "loading";
      });
      builder.addCase(thunk.rejected, (state, action) => {
        state.error = action.payload as SerializedError;
        state.status = "failed";
      });
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      boardAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      boardAdapter.removeOne(state, action.payload);
    });
    builder.addCase(addBoard.fulfilled, (state, action) => {
      boardAdapter.addOne(state, action);
    });
  },
});
