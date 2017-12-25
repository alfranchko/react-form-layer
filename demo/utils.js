
const utils = {
    addEventsToDocument(eventMap) {
        for (const key in eventMap) {
            document.addEventListener(key, eventMap[key], false)
        }
    },

    removeEventsFromDocument(eventMap) {
        for (const key in eventMap) {
            document.removeEventListener(key, eventMap[key], false)
        }
    },

    targetIsDescendant(event, parent) {
        let node = event.target
        while (node !== null) {
            if (node === parent) return true
            node = node.parentNode
        }
        return false
    },

    pauseEvent(event) {
        event.stopPropagation()
        event.preventDefault()
    }
}


export default utils