const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const { default: fetch } = require("node-fetch");

// thunk function 
const getVideo = createAsyncThunk("video/getVideo", async () => {
    const res = await fetch('http://localhost:9000/videos')
    return await res.json();

})

const getRelatedVideo = createAsyncThunk("video/getRelatedVideo", async (url) => {
    const res = await fetch(url)
    return await res.json();
})


// slice
const videoSlice = createSlice({
    name: 'video',
    initialState: {
        video: {},
        related: [],
        loading: false,
        error: null
    },
    extraReducers: builder => {
        builder
            // getVideo thunk stages
            .addCase(getVideo.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getVideo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.video = payload
            })
            .addCase(getVideo.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
                state.video = {}
            })

            // getRelatedVideo thunk stages
            .addCase(getRelatedVideo.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getRelatedVideo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;


                // sort items according to views count
                const sorted = payload.sort((a, b) => {
                    // convert views into number 
                    const item1 = Number(a.views.split('k')[0])
                    const item2 = Number(b.views.split('k')[0])
                    return item2 - item1
                })
                state.related = sorted
            })
            .addCase(getRelatedVideo.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
                state.related = []
            })
    }
})

module.exports = videoSlice.reducer;
module.exports.getVideo = getVideo
module.exports.getRelatedVideo = getRelatedVideo