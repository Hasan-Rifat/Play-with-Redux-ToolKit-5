const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const videoSlice = require('../features/videoSlice')


const store = configureStore({
    reducer: videoSlice,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})


module.exports = store

