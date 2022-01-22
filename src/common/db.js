import {
  getFirestore,
  doc,
  collection,
  onSnapshot,
  deleteDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'

let subscriptions = []

function db() {
  return getFirestore()
}

function unsubscribe() {
  subscriptions.forEach((unsub) => unsub())
  subscriptions = []
}

// Players
function fetchPlayerDocumentsRealtime(updateCallback) {
  const callb = onSnapshot(collection(db(), 'players'), (response) => {
    const games = response.docs.map((x) =>
      x.data({ serverTimestamps: 'estimate' })
    )
    updateCallback(games)
  })
  subscriptions.push(callb)
}

async function createPlayerDocument(player) {
  const newGameRef = doc(collection(db(), 'players'))
  await setDoc(newGameRef, {
    created: serverTimestamp(),
    ...player,
    id: newGameRef.id,
  })
}

// Games

function fetchGameDocumentsRealtime(updateCallback) {
  const callb = onSnapshot(collection(db(), 'games'), (response) => {
    const games = response.docs.map((x) =>
      x.data({ serverTimestamps: 'estimate' })
    )
    updateCallback(games)
  })
  subscriptions.push(callb)
}

function fetchGameDocumentRealtime(id, updateCallback) {
  const callb = onSnapshot(doc(db(), 'games', id), (response) => {
    const game = response.data()
    updateCallback(game)
  })
  subscriptions.push(callb)
}

async function deleteGameDocument(id) {
  await deleteDoc(doc(db(), 'games', id))
}

async function createGameDocument(game) {
  const newGameRef = doc(collection(db(), 'games'))
  await setDoc(newGameRef, {
    created: serverTimestamp(),
    ...game,
    id: newGameRef.id,
  })
}

async function updateGameDocument(id, update) {
  const gameRef = doc(db(), 'games', id)
  await updateDoc(gameRef, update)
}

// Plays
async function createPlayDocument(play) {
  const newPlayRef = doc(collection(db(), 'plays'))
  await setDoc(newPlayRef, {
    created: serverTimestamp(),
    ...play,
    id: newPlayRef.id,
  })
}

async function fetchPlayDocumentsRealtime(gameId, updateCallback) {
  const requestQuery = query(
    collection(db(), 'plays'),
    where('gameId', '==', gameId)
  )
  const callb = onSnapshot(requestQuery, (response) => {
    const plays = response.docs.map((x) =>
      x.data({ serverTimestamps: 'estimate' })
    )
    updateCallback(plays)
  })
  subscriptions.push(callb)
}

async function deletePlayDocument(id) {
  await deleteDoc(doc(db(), 'plays', id))
}

export {
  fetchPlayerDocumentsRealtime,
  createPlayerDocument,
  createGameDocument,
  deleteGameDocument,
  fetchGameDocumentRealtime,
  fetchPlayDocumentsRealtime,
  fetchGameDocumentsRealtime,
  unsubscribe,
  updateGameDocument,
  createPlayDocument,
  deletePlayDocument,
}
