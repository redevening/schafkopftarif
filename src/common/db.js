import { getFirestore, doc, collection, getDocs, onSnapshot, deleteDoc, addDoc, setDoc, serverTimestamp, updateDoc, query, where } from "firebase/firestore"

let subscriptions = []

function db() {
    return getFirestore();
}

function unsubscribe() {
    subscriptions.forEach(unsub => unsub())
    subscriptions = []
}

// Games

function fetchGameDocumentsRealtime(updateCallback) {
    const unsubscribe = onSnapshot(collection(db(), "games"), response => {
        const games = response.docs.map(x => x.data({serverTimestamps: "estimate"}))
        updateCallback(games)
    })
    subscriptions.push(unsubscribe)
}

function fetchGameDocumentRealtime(id, updateCallback) {
    const unsubscribe = onSnapshot(doc(db(), "games", id), response => {
        const game = response.data()
        updateCallback(game)
    })
    subscriptions.push(unsubscribe)
}

async function deleteGameDocument(id) {
    await deleteDoc(doc(db(), "games", id))
}

async function createGameDocument(game) {
    const newGameRef = doc(collection(db(), "games"))
    await setDoc(newGameRef, {
        created: serverTimestamp(),
        ...game,
        id: newGameRef.id
    })
}

async function updateGameDocument(id, update) {
    const gameRef = doc(db(), "games", id)
    await updateDoc(gameRef, update)
}

// Plays
async function createPlayDocument(play) {
    const newPlayRef = doc(collection(db(), "plays"))
    await setDoc(newPlayRef, {
        created: serverTimestamp(),
        ...play,
        id: newPlayRef.id
    })
}

async function fetchPlayDocumentsRealtime(gameId, updateCallback) {
    const requestQuery = query(collection(db(), "plays"), where("gameId", "==", gameId))
    const unsubscribe = onSnapshot(requestQuery, response => {
        const plays = response.docs.map(x => x.data({serverTimestamps: "estimate"}))
        updateCallback(plays)
    })
    subscriptions.push(unsubscribe)
}

export { createGameDocument, deleteGameDocument, fetchGameDocumentRealtime, fetchPlayDocumentsRealtime, fetchGameDocumentsRealtime, unsubscribe, updateGameDocument, createPlayDocument }