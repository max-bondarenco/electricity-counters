import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    counters: [],
}

const counterSlice = createSlice({
    name: 'counters',
    initialState,
    reducers: {
        setCounters: (state, action) => {
            state.counters = action.payload
        },
        addCounter: (state, action) => {
            state.counters.push(action.payload)
        },
        removeCounter: (state, action) => {
            state.counters = state.counters.filter(
                (counter) => counter._id !== action.payload
            )
        },
        updateCounter: (state, action) => {
            state.counters = state.counters.map((counter) => {
                if (counter._id === action.payload._id)
                    return action.payload.data
            })
        },
    },
})

export default counterSlice.reducer
export const { setCounters, addCounter, removeCounter, updateCounter } =
    counterSlice.actions
