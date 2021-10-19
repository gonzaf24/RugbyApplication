const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");

async function findAgentByEmail(email) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    let result = await db.collection("agents").doc(emailEdited).get();

    return result.data();

    /*  return await firebaseApp
      .database()
      .ref("/agents/" + emailEdited)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      }); */
  } catch (error) {
    console.log("findAgentByEmail" + error);
    throw error;
  }
}

async function newAgent(agent, email) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    //Agrego datos a firestore
    return await db
      .collection("agents")
      .doc(emailEdited)
      .set({ ...agent, userEmail: email });
    /* 

    return await firebaseApp
      .database()
      .ref("agents/" + emailEdited)
      .set(agent); */
  } catch (error) {
    console.log("newAgent" + error);
    throw error;
  }
}

async function editAgent(email, agent) {
  try {
    const emailEdited = email.split(".").join(",");
    const agentAux = await findAgentByEmail(email);
    const agentPersist = { ...agentAux, ...agent };

    let db = admin.firestore();
    return await db.collection("agents").doc(emailEdited).update(agentPersist);
    /* 

    return await firebaseApp
      .database()
      .ref("agents/" + emailEdited)
      .set(agentPersist); */
  } catch (error) {
    console.log("editAgent" + error);
    throw error;
  }
}

async function deleteAgent(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    await db.collection("agents").doc(emailEdited).delete();

    /* 
    await firebaseApp
      .database()
      .ref("agents/" + emailEdited)
      .remove(); */
  } catch (error) {
    console.log("deleteAgent" + error);
    throw error;
  }
  return "ok";
}

module.exports = {
  findAgentByEmail,
  newAgent,
  editAgent,
  deleteAgent,
};
