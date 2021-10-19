const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");
const { json } = require("express");
const utilsModel = require("./utilsModel");

async function newPost(post, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    let childRef = await db
      .collection("posts")
      .doc(emailEdited)
      .collection("postsCol")
      .add(post);
    //Edito el dato y le agrego el id como propiedad
    await db
      .collection("posts")
      .doc(emailEdited)
      .collection("postsCol")
      .doc(childRef.id)
      .update({ uid: childRef.id, userEmail: email });

    return childRef.id;
  } catch (error) {
    console.log("newPost" + error);
    throw error;
  }
}

async function editPost(post, email) {
  console.log(
    "editPost value a BD ----> : " +
      email +
      "     +     " +
      JSON.stringify(post)
  );
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    await db
      .collection("posts")
      .doc(emailEdited)
      .collection("postsCol")
      .doc(post.uid)
      .update({ ...post });

    return "OK";
  } catch (error) {
    console.log("editPost" + error);
    throw error;
  }
}

async function findPostById(uid) {
  console.log("findPostById  : " + uid);
  try {
    let db = admin.firestore();
    let result = await db

      .collectionGroup("postsCol")
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
    console.log("findPostById" + error);
    throw error;
  }
}

async function findPosts(email) {
  console.log("findPosts  : " + email);
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let result = await db
      .collection("posts")
      .doc(emailEdited)
      .collection("postsCol")
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
    console.log("findPosts" + error);
    throw error;
  }
}

async function deletePost(email, uid) {
  console.log("deletePost  : " + email);
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db
      .collection("posts")
      .doc(emailEdited)
      .collection("postsCol")
      .doc(uid)
      .delete();

    return "OK";
  } catch (error) {
    console.log("deletePost" + error);
    throw error;
  }
}

async function commentPost(email, comment) {
  try {
    console.log("commentPost  : " + email);
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    let childRef = await db
      .collection("posts")
      .doc(emailEdited)
      .collection("commentsPostsCol")
      .doc(comment.uidParent)
      .collection("commentsPost")
      .add(comment);

    await db
      .collection("posts")
      .doc(emailEdited)
      .collection("commentsPostsCol")
      .doc(comment.uidParent)
      .collection("commentsPost")
      .doc(childRef.id)
      .update({ uid: childRef.id });

    return childRef.id;
  } catch (error) {
    console.log("commentPost" + error);
    throw error;
  }
}

async function getCommentPostById(uid) {
  console.log("getCommentPostById  : " + uid);
  try {
    let db = admin.firestore();
    let result = await db
      .collectionGroup("commentsPost")
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
    console.log("getCommentPostById" + error);
    throw error;
  }
}

async function getListCommentsPost(uid) {
  console.log("getListCommentsPost  : " + uid);
  try {
    let db = admin.firestore();

    let listaComments = await db
      .collectionGroup("commentsPost")
      .where("uidPost", "==", uid)
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
    console.log("getListCommentsPost" + error);
    throw error;
  }
}

module.exports = {
  newPost,
  editPost,
  findPostById,
  findPosts,
  deletePost,
  commentPost,
  getCommentPostById,
  getListCommentsPost,
};
