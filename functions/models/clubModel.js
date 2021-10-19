const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");
const userModel = require("./userModel");

async function findClubByEmail(email) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    let result = await db.collection("clubs").doc(emailEdited).get();
    return result.data();
  } catch (error) {
    console.log("findClubByEmail" + error);
    throw error;
  }
}

async function newClub(club, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db
      .collection("clubs")
      .doc(emailEdited)
      .set({ ...club, userEmail: email });

    let userAux = await userModel.findById(club.uid);
    userAux = { ...userAux, fotoPerfil: club.fotoPerfil, nombre: club.nombre };
    await userModel.edit(userAux);
  } catch (error) {
    console.log("newClub" + error);
    throw error;
  }
}

async function editClub(email, club) {
  try {
    const emailEdited = email.split(".").join(",");
    const clubAux = await findClubByEmail(email);
    let clubPersist = { ...clubAux, ...club };
    let db = admin.firestore();
    await db.collection("clubs").doc(emailEdited).update(clubPersist);
    let userAux = await userModel.findById(clubPersist.uid);
    userAux = {
      ...userAux,
      fotoPerfil: clubPersist.fotoPerfil,
      nombre: clubPersist.nombre,
    };
    await userModel.edit(userAux);
  } catch (error) {
    console.log("editClub" + error);
    throw error;
  }
}

async function deleteClub(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    await db.collection("clubs").doc(emailEdited).delete();
  } catch (error) {
    console.log("deleteClub" + error);
    throw error;
  }
  return "ok";
}

module.exports = {
  findClubByEmail,
  newClub,
  editClub,
  deleteClub,
};
