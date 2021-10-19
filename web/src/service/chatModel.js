const firebaseApp = require("firebase/app");

import { format } from "date-fns";
import { es } from "date-fns/locale";

export async function obtenerChats(email) {
  const emailEdited = email.split(".").join(",");
  firebaseApp
    .database()
    .ref("/chats/" + emailEdited)
    .on("value", (snapshot) => {
      return snapshot.val();
    });
}

export async function newChat(email, userUID, seen) {
  try {
    const emailEdited = email.split(".").join(",");
    const timestampDate = new Date().getTime();
    await firebaseApp
      .database()
      .ref("/chats/" + emailEdited)
      .child(userUID)
      .set({
        uid: userUID,
        timestamp: timestampDate,
        seen: seen,
      });
  } catch (error) {
    console.log("error newChat" + error);
    return error;
  }
}

export async function seen(email, userUID, timestamp, seen) {
  try {
    const emailEdited = email.split(".").join(",");
    await firebaseApp
      .database()
      .ref("/chats/" + emailEdited)
      .child(userUID)
      .set({
        uid: userUID,
        timestamp: timestamp,
        seen: seen,
      });
  } catch (error) {
    console.log("error seen" + error);
    return error;
  }
}

export function obtenerConversationsOnLine(conversationKey) {
  try {
    firebaseApp
      .database()
      .ref("/conversations/" + conversationKey)
      .on("child_added", function (snapshot) {
        return snapshot.val();
      });
  } catch (error) {
    console.log("error obtenerConversationsOnLine" + error);
    return error;
  }
}

export async function obtenerConversationsOnce(conversationKey) {
  try {
    let listaChat = [];
    await firebaseApp
      .database()
      .ref("/conversations/" + conversationKey)
      .once("value", (snapshot) => {
        snapshot.forEach((child) => {
          listaChat.push(child.val());
        });
      });
    return listaChat;
  } catch (error) {
    console.log("error obtenerConversationsOnce" + error);
    return error;
  }
}

export async function obtenerUltimaConversationsOnce(conversationKey) {
  try {
    return await firebaseApp
      .database()
      .ref("/conversations/" + conversationKey)
      .orderByKey()
      .limitToLast(1)
      .once("value", (child) => {
        child.forEach((childSnapshot) => {
          console.log(" uy !");
          return childSnapshot.val();
        });
      });
  } catch (error) {
    console.log("error obtenerUltimaConversationsOnce" + error);
    return error;
  }
}

export async function obtenerChatsOnce(email, uid, userMutation) {
  try {
    const emailEdited = email.split(".").join(",");
    let salida = [];
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
    await listaChat.reduce(async (promise, elemento) => {
      await promise;
      const input = { id: elemento.uid };

      const userResponse = await userMutation({
        variables: { input },
      });
      let nameVal;
      let surnameVal;
      let fotoPerfil;
      switch (userResponse.data.user.type) {
        case "PLAYER":
          nameVal = userResponse.data.user.player.nombre;
          surnameVal = userResponse.data.user.player.apellido;
          fotoPerfil = userResponse.data.user.player.fotoPerfil;
          break;
        case "AGENT":
          nameVal = userResponse.data.user.agent.nombre;
          fotoPerfil = userResponse.data.user.agent.fotoPerfil;
          break;
        case "CLUB":
          nameVal = userResponse.data.user.club.nombre;
          fotoPerfil = userResponse.data.user.club.fotoPerfil;
          break;
      }
      const conversationKey = [elemento.uid, uid].sort().join("|");
      let lastMessage = await obtenerUltimaConversationsOnce(conversationKey);
      const dateObject = new Date(elemento.timestamp);
      const fecha = format(dateObject, "dd/MM/yyyy", { locale: es });
      const timeString = `${fecha}-${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
      lastMessage.forEach((msg) => {
        let chat = {
          timestamp: elemento.timestamp,
          nombre: nameVal,
          apellido: surnameVal,
          uid: userResponse.data.user.uid,
          avatar: fotoPerfil,
          message: msg.val().message,
          horaPrev: timeString,
          seen: elemento.seen,
          email: userResponse.data.user.email,
        };
        salida.push(chat);
      });
      return Promise.resolve();
    }, Promise.resolve());

    await salida.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return salida;
  } catch (error) {
    console.log("error obtenerChatsOnce : " + error);
    return error;
  }
}

export async function obtenerCountNotSeen(email) {
  try {
    const emailEdited = email.split(".").join(",");
    let count = 0;
    await firebaseApp
      .database()
      .ref("/chats/" + emailEdited)
      .once("value", function (snapshot) {
        snapshot.forEach((childSnapshot) => {
          if (!childSnapshot.val().seen) {
            count++;
          }
        });
      });
    return count;
  } catch (error) {
    console.log("error obtenerCountNotSeen : " + error);
    return error;
  }
}

export function obtenerConversations(conversationKey) {
  try {
    let listaChat = [];
    firebaseApp
      .database()
      .ref("/conversations/" + conversationKey)
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          listaChat.push(child.val());
        });
      });
    return listaChat;
  } catch (error) {
    console.log("error obtenerConversations" + error);
    return error;
  }
}

export async function newConversation(conversationKey, conversation) {
  try {
    const timestampDate = new Date().getTime();
    let conversationA = {
      ...conversation,
      timestamp: timestampDate,
    };
    firebaseApp
      .database()
      .ref("conversations/" + conversationKey + "/" + timestampDate)
      .set(conversationA);
  } catch (error) {
    console.log("error newConversation" + error);
    return error;
  }
}
