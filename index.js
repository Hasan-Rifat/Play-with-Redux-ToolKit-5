const store = require("./app/store")
const { getRelatedVideo, getVideo } = require("./features/videoSlice")

// dispatch video thunk
store.dispatch(getVideo())
    .unwrap() // if unwrap is applied, next .then gives payload instead of action
    .then((payload) => {
        // console.log("Video: ", payload); // used logger instead
        const tags = payload.tags
        const arg = tags.slice(0, 2).map(tag => `tags_like=${tag}`).join("&")
        const url = `http://localhost:9000/videos?${arg}`

        // dispatch related video thunk
        store.dispatch(getRelatedVideo(url))
            .unwrap()
            .then(payload => {
                // console.log("Related Video: ", payload)  // used logger instead
            })
            .then(() => console.log("Done!"))
            .catch(err => console.log('err', err))

    })
    .catch(err => console.log('err', err))



