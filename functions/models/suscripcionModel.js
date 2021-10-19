const firebaseApp = require("firebase/app");

async function findSuscripcionesByEmail(email) {
  try {
    let salida = [];
    const emailEdited = email.split(".").join(",");
    return await firebaseApp
      .database()
      .ref("/suscripciones/" + emailEdited)
      .orderByChild("fechaFin")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((child) => {
          salida.push(child.val());
        });
        return salida;
      });
  } catch (error) {
    console.log("findSuscripcionByEmail" + error);
    throw error;
  }
}

async function findSuscripcionByUID(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");
    return await firebaseApp
      .database()
      .ref("/suscripciones/" + emailEdited + "/" + uid + "/")
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  } catch (error) {
    console.log("findSuscripcionByUID" + error);
    throw error;
  }
}

async function newSuscripcion(suscripcion, email) {
  try {
    const emailEdited = email.split(".").join(",");
    return await firebaseApp
      .database()
      .ref("suscripciones/" + emailEdited)
      .child(suscripcion.uid)
      .set(suscripcion)
      .then(() => {
        return true;
      });
  } catch (error) {
    console.log("newSuscripcion error ! " + error);
    throw error;
  }
}

async function editSuscripcion(email, suscripcion) {
  try {
    const emailEdited = email.split(".").join(",");
    return await firebaseApp
      .database()
      .ref("suscripciones/" + emailEdited)
      .child(suscripcion.uid)
      .set(suscripcion);
  } catch (error) {
    console.log("editsuscripcion" + error);
    throw error;
  }
}

async function deleteSuscripcion(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");
    await firebaseApp
      .database()
      .ref("suscripciones/" + emailEdited)
      .child(uid)
      .remove();
  } catch (error) {
    console.log("deleteSuscripcion" + error);
    throw error;
  }
  return "ok";
}

module.exports = {
  findSuscripcionesByEmail,
  findSuscripcionByUID,
  newSuscripcion,
  editSuscripcion,
  deleteSuscripcion,
};
