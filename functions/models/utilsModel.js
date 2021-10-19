let firebaseApp = require("firebase");
const admin = require("firebase-admin");

async function getPlanById(id) {
  try {
    return await firebaseApp
      .database()
      .ref("plans/" + id)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  } catch (error) {
    throw error;
  }
}

async function getFotoPerfilYNombre(type, email) {
  try {
    let db = admin.firestore();
    const emailEdited = email.split(".").join(",");
    let result;
    if (type === "CLUB") {
      result = await db.collection("clubs").doc(emailEdited).get();
      let salida = {
        fotoPerfil: result.data().fotoPerfil,
        nombreUsuario: result.data().nombre,
      };
      return salida;
    } else if (type === "PLAYER") {
      result = await db.collection("players").doc(emailEdited).get();

      let salida = {
        fotoPerfil: result.data().fotoPerfil,
        nombreUsuario: result.data().nombre + " " + result.data().apellido,
      };
      return salida;
    }
    return "";
  } catch (error) {
    console.log("getFotoPerfilYNombre " + error);
    throw error;
  }
}

module.exports = {
  getPlanById,
  getFotoPerfilYNombre,
};
