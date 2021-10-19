const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");
const { JsonWebTokenError } = require("jsonwebtoken");
const playerModel = require("../models/playerModel");
const clubModel = require("../models/clubModel");

async function book(email, idBook, tipo, userBook) {
  try {
    const emailEdited = email.split(".").join(",");
    const eva = await exist(email, idBook, userBook);
    if (eva) {
      await firebaseApp
        .database()
        .ref("booked/" + emailEdited)
        .child(idBook)
        .remove();
    } else {
      await firebaseApp
        .database()
        .ref("booked/" + emailEdited)
        .child(idBook)
        .set({
          idBook,
          tipo,
          userBook,
          fechaCreacion: new Date(
            new Date().toISOString().replace("Z", "-02:00")
          )
            .toISOString()
            .replace(".000", ""),
        })
        .then(() => {
          return true;
        });
    }
  } catch (error) {
    throw error;
  }
}

async function exist(email, idBook) {
  try {
    const emailEdited = email.split(".").join(",");
    return await firebaseApp
      .database()
      .ref("booked/" + emailEdited + "/" + idBook)
      .once("value")
      .then(async (snapshot) => {
        if (snapshot.val() && snapshot.val().idBook) {
          return true;
        } else {
          return false;
        }
      });
  } catch (error) {
    throw error;
  }
}

async function getBook(email) {
  try {
    const emailEdited = email.split(".").join(",");

    let salidaBooked = [];

    await firebaseApp
      .database()
      .ref("booked/" + emailEdited)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          salidaBooked.push({
            fechaCreacion: childSnapshot.val().fechaCreacion,
            idBook: childSnapshot.val().idBook,
            tipo: childSnapshot.val().tipo,
            userBook: childSnapshot.val().userBook,
          });
        });
      });

    return salidaBooked;
  } catch (error) {
    console.log("getBook" + error);
    throw error;
  }
}

async function getBooked(email, tipo) {
  try {
    const emailEdited = email.split(".").join(",");
    let salidaBooked = [];
    await firebaseApp
      .database()
      .ref("booked/" + emailEdited)
      .orderByChild("tipo")
      .equalTo(tipo)
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          salidaBooked.push({
            fechaCreacion: childSnapshot.val().fechaCreacion,
            idBook: childSnapshot.val().idBook,
            tipo: childSnapshot.val().tipo,
            userBook: childSnapshot.val().userBook,
          });
        });
      });

    const players = [];
    const clubs = [];
    await salidaBooked.reduce(async (promise, elemento) => {
      await promise;
      switch (elemento.tipo) {
        case "PLAYER":
          players.push(await playerModel.findPlayerByEmail(elemento.userBook));
          break;

        case "CLUB":
          clubs.push(await clubModel.findClubByEmail(elemento.userBook));
          break;
      }
      return Promise.resolve();
    }, Promise.resolve());
    return { players, clubs };
  } catch (error) {
    console.log("getBook" + error);
    throw error;
  }
}

async function editBook(email, tipo, idBook) {
  try {
    return await firebaseApp
      .database()
      .ref("booked/" + email)
      .set(usuario)
      .then(() => {
        return true;
      });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  book,
  getBook,
  getBooked,
  editBook,
};
