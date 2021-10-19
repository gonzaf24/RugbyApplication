const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");
const { json } = require("express");
const utilsModel = require("./utilsModel");

async function newMatchResult(match, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    let childRef = await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("matchsResultsCol")
      .add(match);
    //Edito el dato y le agrego el id como propiedad
    await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("matchsResultsCol")
      .doc(childRef.id)
      .update({ uid: childRef.id, userEmail: email });

    return childRef.id;
  } catch (error) {
    console.log("newMatchResult" + error);
    throw error;
  }
}

async function editMatchResult(match, email) {
  console.log(
    "editmatch value a BD ----> : " +
      email +
      "     +     " +
      JSON.stringify(match)
  );
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("matchsResultsCol")
      .doc(match.uid)
      .update({ ...match });

    return "OK";
  } catch (error) {
    console.log("editMatchResult" + error);
    throw error;
  }
}

async function findMatchResultById(uid) {
  console.log("findMatchResultById  : " + uid);
  try {
    let db = admin.firestore();
    let result = await db
      .collectionGroup("matchsResultsCol")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        let salida;
        querySnapshot.forEach((doc) => {
          salida = doc.data();
        });
        return salida;
      });
    return result;
  } catch (error) {
    console.log("findMatchResultById" + error);
    throw error;
  }
}

async function findMatchsResults(email) {
  console.log("findMatchsResults  : " + email);
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let result = await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("matchsResultsCol")
      .orderBy("fechaCreacion", "desc")
      .get()
      .then((querySnapshot) => {
        let salida = [];
        querySnapshot.forEach((doc) => {
          salida.push(doc.data());
        });
        return salida;
      });
    return result;
  } catch (error) {
    console.log("findMatchsResults" + error);
    throw error;
  }
}

async function deleteMatchResult(email, uid) {
  console.log("deleteMatchResult  : " + email);
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("matchsResultsCol")
      .doc(uid)
      .delete();

    return "OK";
  } catch (error) {
    console.log("deleteMatchResult" + error);
    throw error;
  }
}

async function commentMatchResult(email, comment) {
  try {
    console.log("commentMatchResult  : " + email);
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let childRef = await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("commentsMatchsResultsCol")
      .doc(comment.uidParent)
      .collection("commentsMatchResult")
      .add(comment);

    await db
      .collection("matchsResults")
      .doc(emailEdited)
      .collection("commentsMatchsResultsCol")
      .doc(comment.uidParent)
      .collection("commentsMatchResult")
      .doc(childRef.id)
      .update({ uid: childRef.id });

    return childRef.id;
  } catch (error) {
    console.log("commentMatchResult" + error);
    throw error;
  }
}

async function getCommentMatchResultById(uid) {
  console.log("getCommentMatchResultById  : " + uid);
  try {
    let db = admin.firestore();
    let result = await db
      .collectionGroup("commentsMatchResult")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        let salida;
        querySnapshot.forEach((doc) => {
          salida = doc.data();
        });
        return salida;
      });
    return result;
  } catch (error) {
    console.log("getCommentMatchResultById" + error);
    throw error;
  }
}

async function getListCommentsMatchsResults(uid) {
  console.log("getListCommentsMatchsResults  : " + uid);
  try {
    let db = admin.firestore();

    let listaComments = await db
      .collectionGroup("commentsMatchResult")
      .where("uidParent", "==", uid)
      .orderBy("fechaCreacion", "desc")
      .get()
      .then((querySnapshot) => {
        let auxOut = [];
        querySnapshot.forEach((doc) => {
          auxOut.push(doc.data());
        });
        return auxOut;
      });

    let salida = [];

    await listaComments.reduce(async (promise, elemento) => {
      await promise;

      let aux = {
        ...elemento,
        ...(await utilsModel.getFotoPerfilYNombre(
          elemento.userType,
          elemento.userEmail
        )),
      };
      salida.push(aux);
      return Promise.resolve();
    }, Promise.resolve());

    return salida;
  } catch (error) {
    console.log("getListCommentsMatchsResults" + error);
    throw error;
  }
}

module.exports = {
  newMatchResult,
  editMatchResult,
  findMatchResultById,
  findMatchsResults,
  deleteMatchResult,
  commentMatchResult,
  getCommentMatchResultById,
  getListCommentsMatchsResults,
};
