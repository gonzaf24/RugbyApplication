const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");
const userModel = require("./userModel");

async function findPlayerByEmail(email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let result = await db.collection("players").doc(emailEdited).get();
    return result.data();
  } catch (error) {
    console.log("findPlayerByEmail" + error);
    throw error;
  }
}

async function newPlayer(player, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db
      .collection("players")
      .doc(emailEdited)
      .set({ ...player, userEmail: email });
    let userAux = await userModel.findById(player.uid);
    userAux = {
      ...userAux,
      fotoPerfil: player.fotoPerfil,
      nombre: player.nombre + " " + player.apellido,
    };
    await userModel.edit(userAux);
  } catch (error) {
    console.log("newPlayer" + error);
    throw error;
  }
}

async function editPlayer(email, player) {
  try {
    const emailEdited = email.split(".").join(",");
    const playerAux = await findPlayerByEmail(email);
    let playerPersist = { ...playerAux, ...player };
    let db = admin.firestore();
    await db.collection("players").doc(emailEdited).update(playerPersist);
    let userAux = await userModel.findById(playerPersist.uid);
    userAux = {
      ...userAux,
      fotoPerfil: playerPersist.fotoPerfil,
      nombre: playerPersist.nombre + " " + playerPersist.apellido,
    };
    await userModel.edit(userAux);
  } catch (error) {
    console.log("editplayer" + error);
    throw error;
  }
}

async function deletePlayer(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db.collection("players").doc(emailEdited).delete();
    /* 
    await firebaseApp
      .database()
      .ref("players/" + emailEdited)
      .remove(); */
  } catch (error) {
    console.log("deletePlayer" + error);
    throw error;
  }
  return "ok";
}

module.exports = {
  findPlayerByEmail,
  newPlayer,
  editPlayer,
  deletePlayer,
};
