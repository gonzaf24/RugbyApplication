let firebaseApp = require("firebase");
const jsonwebtoken = require("jsonwebtoken");

async function findById(uid) {
  try {
    return await firebaseApp
      .database()
      .ref("/usuarios/" + uid)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  } catch (error) {
    throw error;
  }
}

async function edit(usuario) {
  try {
    return await firebaseApp
      .database()
      .ref("usuarios/" + usuario.uid)
      .set(usuario)
      .then(() => {
        return true;
      });
  } catch (error) {
    throw error;
  }
}

async function newUsuario(usuario) {
  try {
    return await firebaseApp
      .database()
      .ref("usuarios/" + usuario.uid)
      .set(usuario)
      .then(() => {
        return true;
      });
  } catch (error) {
    throw error;
  }
}

async function login(uid) {
  try {
    return await firebaseApp
      .database()
      .ref("/usuarios/" + uid)
      .once("value")
      .then((snapshot) => {
        //console.log("snapshot -------- " + JSON.stringify(snapshot));
        return (respuesta = {
          uid: snapshot.child("uid"),
          email: snapshot.child("email"),
          fechaCreacion: snapshot.child("fechaCreacion"),
          notificarSuscripcion: snapshot.child("notificarSuscripcion"),
          type: snapshot.child("type"),
          planId: snapshot.child("planId"),
          clubType: snapshot.child("clubType"),
          fotoPerfil: snapshot.child("fotoPerfil"),
          nombre: snapshot.child("nombre"),
          notificarCompletarInformacion: snapshot.child(
            "notificarCompletarInformacion"
          ),
          status: snapshot.child("status"),
          emailVerified: true,
          token: jsonwebtoken.sign(
            {
              uid: snapshot.child("uid"),
              email: snapshot.child("email"),
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          ),
        });
      });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findById,
  edit,
  newUsuario,
  login,
};
