const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");

async function getChats(email) {
  try {
    const emailEdited = email.split(".").join(",");
    let listaChat = [];
    await firebaseApp
      .database()
      .ref("/chats/" + emailEdited)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          listaChat.push({
            timestamp: childSnapshot.val().timestamp,
            uid: childSnapshot.val().uid,
            seen: childSnapshot.val().seen,
          });
        });
      });
    return listaChat;
  } catch (error) {
    console.log("getChats" + error);
    throw error;
  }
}

async function obtenerUltimaConversationsOnce(conversationKey) {
  try {
    return await firebaseApp
      .database()
      .ref("/conversations/" + conversationKey)
      .orderByKey()
      .limitToLast(1)
      .once("value", (child) => {
        child.forEach((childSnapshot) => {
          return childSnapshot.val();
        });
      });
  } catch (error) {
    console.log("getChats" + error);
    throw error;
  }
}

module.exports = {
  getChats,
  obtenerUltimaConversationsOnce,
};
