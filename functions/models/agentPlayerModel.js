const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");

async function findAgentPlayerById(email, uid) {
  console.log("findAgentPlayerById DD : " + email + "  " + uid);
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let result = await db
      /* .collection("agentsPlayers")
      .doc(emailEdited) */
      .collectionGroup("playersCol")
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
    /*  let ref = await firebaseApp.database().ref("agentsPlayers/" + emailEdited);
    return await ref
      .child(uid)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      }); */
  } catch (error) {
    console.log("findAgentPlayerById" + error);
    throw error;
  }
}

async function getAgentPlayers(email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let result = await db
      .collection("agentsPlayers")
      .doc(emailEdited)
      .collection("playersCol")
      .get()
      .then((querySnapshot) => {
        salida = [];
        querySnapshot.forEach((doc) => {
          salida.push(doc.data());
        });
        return salida;
      });
    return result;
    /*   let ref = await firebaseApp.database().ref("agentsPlayers/" + emailEdited);
    return await ref.once("value").then((snapshot) => {
      let returnArr = [];
      snapshot.forEach((childSnapshot) => {
        let item = childSnapshot.val();
        returnArr.push(item);
      });
      return returnArr;
    }); */
  } catch (error) {
    console.log("getAgentPlayers" + error);
    throw error;
  }
}

async function newAgentPlayer(player, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    let childRef = await db
      .collection("agentsPlayers")
      .doc(emailEdited)
      .collection("playersCol")
      .add(player);
    //Edito el dato y le agrego el id como propiedad
    await db
      .collection("agentsPlayers")
      .doc(emailEdited)
      .collection("playersCol")
      .doc(childRef.id)
      .update({ uid: childRef.id, userEmail: email });

    return childRef.id;

    /*  let result = await db
      .collectionGroup("players")
      .where("nivel", "==", "SEMI-PRO")
      .get()
      .then((querySnapshot) => {
        salida = [];
        querySnapshot.forEach((doc) => {
          salida.push(doc.data());
        });
        return salida;
      });

    console.log("resultado : " + JSON.stringify(result));

    let ref = await firebaseApp.database().ref("agentsPlayers/" + emailEdited);
    let newChildRef = await ref.push(player);
    await newChildRef.set({ ...player, uid: newChildRef.key });
    return newChildRef.key; */
  } catch (error) {
    console.log("newAgent" + error);
    throw error;
  }
}

async function editAgentPlayer(email, player) {
  try {
    const emailEdited = email.split(".").join(",");
    const playerAux = await findAgentPlayerById(email, player.uid);
    let db = admin.firestore();
    await db
      .collection("agentsPlayers")
      .doc(emailEdited)
      .collection("playersCol")
      .doc(player.uid)
      .update({ ...playerAux, ...player });
    return "200";
    /* 
    let ref = await firebaseApp.database().ref("agentsPlayers/" + emailEdited);
    await ref.child(player.uid).set({ ...playerAux, ...player }); */
  } catch (error) {
    console.log("editAgentPlayer  : " + error);
    throw error;
  }
}

async function deleteAgentPlayer(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db
      .collection("agentsPlayers")
      .doc(emailEdited)
      .collection("playersCol")
      .doc(uid)
      .delete();
    return "200";
    /*  let ref = await firebaseApp.database().ref("agentsPlayers/" + emailEdited);
    await ref.child(uid).remove(); */
  } catch (error) {
    console.log("deleteAgentPlayer" + error);
    throw error;
  }
}

module.exports = {
  findAgentPlayerById,
  deleteAgentPlayer,
  editAgentPlayer,
  newAgentPlayer,
  getAgentPlayers,
};
