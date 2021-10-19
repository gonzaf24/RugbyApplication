const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");

async function searchClubs(nombre, categoria, pais, estadoCiudad, clubType) {
  try {
    let db = admin.firestore();
    let clubsRef = db.collection("clubs");

    if (categoria) {
      clubsRef = clubsRef.where("categorias", "array-contains-any", [
        `${categoria}`,
      ]);
    }
    if (pais) {
      clubsRef = clubsRef.where("pais", "==", `${pais}`);
    }
    if (estadoCiudad) {
      clubsRef = clubsRef.where("estadoCiudad", "==", `${estadoCiudad}`);
    }
    /*  if (clubType) {
      clubsRef.where("clubType", "==",  `${clubType}`);
    } */
    if (nombre) {
      clubsRef = clubsRef
        .orderBy("nombre")
        .startAt(nombre)
        .endAt(nombre + "\uf8ff");
    }
    // console.log("voy a consultar ---------------> searchClubs : ");
    let result = await clubsRef.get().then((querySnapshot) => {
      let salida = [];
      querySnapshot.forEach((doc) => {
        //console.log("encontre ++");
        salida.push(doc.data());
      });
      return salida;
    });

    // console.log("hay salida searchClubs: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("searchClubsModel " + error);
    throw error;
  }
}

async function searchAgents(pais) {
  try {
    let db = admin.firestore();
    let agentsRef = db.collection("agents");
    if (pais) {
      //console.log("entro en pais " + JSON.stringify(pais));
      agentsRef = agentsRef.where("paisesOpera", "array-contains-any", [
        `${pais}`,
      ]);
    }
    // console.log("voy a consultar  ---------------> searchAgents : ");
    let result = await agentsRef.get().then((querySnapshot) => {
      let salida = [];
      querySnapshot.forEach((doc) => {
        //console.log("encontre ++ ");
        salida.push(doc.data());
      });
      return salida;
    });

    //console.log("hay salida searchAgents: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("searchAgentsModel " + error);
    throw error;
  }
}

async function searchPlayers(
  nivel,
  nacionalidad,
  puesto,
  puestoAlt,
  pateador,
  altura,
  peso,
  edad
) {
  try {
    let db = admin.firestore();
    let playersRef = db.collection("players");
    if (nivel) {
      playersRef = playersRef.where("nivel", "==", nivel);
    }
    if (nacionalidad) {
      playersRef = playersRef.where("nacionalidades", "array-contains-any", [
        nacionalidad,
      ]);
    }
    if (puesto) {
      playersRef = playersRef.where("puesto", "==", puesto);
    }
    if (puestoAlt) {
      playersRef = playersRef.where("puestoAlt", "==", puestoAlt);
    }
    if (pateador) {
      playersRef = playersRef.where("pateador", "==", pateador);
    }

    if (altura) {
      if (altura[1] !== 0) {
        playersRef = playersRef
          .where("altura", ">=", altura[0])
          .where("altura", "<=", altura[1]);
      } else if (peso) {
        if (peso[1] !== 0) {
          playersRef = playersRef
            .where("peso", ">=", peso[0])
            .where("peso", "<=", peso[1]);
        } else if (edad) {
          if (edad[1] !== 0) {
            let hasta = new Date();
            hasta.setFullYear(hasta.getFullYear() - edad[0]);
            let desde = new Date();
            desde.setFullYear(desde.getFullYear() - edad[1]);
            playersRef = playersRef
              .where("fechaNacimiento", ">=", desde.toISOString())
              .where("fechaNacimiento", "<=", hasta.toISOString());
          }
        }
      }
    }

    //console.log("voy a consultar  ---------------> searchPlayers : ");

    let result = await playersRef.get().then((querySnapshot) => {
      let salida = [];
      querySnapshot.forEach((doc) => {
        salida.push(doc.data());
      });
      if (altura[1] !== 0 && peso[1] !== 0) {
        salida = salida.filter(
          (item) => item.peso >= peso[0] && item.peso <= peso[1]
        );
      }
      if ((altura[1] !== 0 || peso[1] !== 0) && edad[1] !== 0) {
        let hasta = new Date();
        hasta.setFullYear(hasta.getFullYear() - edad[0]);
        let desde = new Date();
        desde.setFullYear(desde.getFullYear() - edad[1]);
        salida = salida.filter(
          (item) =>
            item.fechaNacimiento >= desde.toISOString() &&
            item.fechaNacimiento <= hasta.toISOString()
        );
      }

      return salida;
    });

    //console.log("hay salida searchPlayers: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("searchPlayersModel " + error);
    throw error;
  }
}

async function searchPlayersAgents(
  nivel,
  nacionalidad,
  puesto,
  puestoAlt,
  pateador,
  altura,
  peso,
  edad
) {
  try {
    let db = admin.firestore();
    let playersAgentRef = db.collectionGroup("playersCol");

    if (nivel) {
      playersAgentRef = playersAgentRef.where("nivel", "==", nivel);
    }
    if (nacionalidad) {
      playersAgentRef = playersAgentRef.where(
        "nacionalidades",
        "array-contains-any",
        [nacionalidad]
      );
    }
    if (puesto) {
      playersAgentRef = playersAgentRef.where("puesto", "==", puesto);
    }
    if (puestoAlt) {
      playersAgentRef = playersAgentRef.where("puestoAlt", "==", puestoAlt);
    }
    if (pateador) {
      playersAgentRef = playersAgentRef.where("pateador", "==", pateador);
    }

    if (altura) {
      if (altura[1] !== 0) {
        playersAgentRef = playersAgentRef
          .where("altura", ">=", altura[0])
          .where("altura", "<=", altura[1]);
      } else if (peso) {
        if (peso[1] !== 0) {
          playersAgentRef = playersAgentRef
            .where("peso", ">=", peso[0])
            .where("peso", "<=", peso[1]);
        } else if (edad) {
          if (edad[1] !== 0) {
            let hasta = new Date();
            hasta.setFullYear(hasta.getFullYear() - edad[0]);
            let desde = new Date();
            desde.setFullYear(desde.getFullYear() - edad[1]);
            playersAgentRef = playersAgentRef
              .where("fechaNacimiento", ">=", desde.toISOString())
              .where("fechaNacimiento", "<=", hasta.toISOString());
          }
        }
      }
    }

    //console.log("voy a consultar  ---------------> searchPlayers : ");

    let result = await playersAgentRef.get().then((querySnapshot) => {
      let salida = [];
      querySnapshot.forEach((doc) => {
        salida.push(doc.data());
      });
      if (altura[1] !== 0 && peso[1] !== 0) {
        salida = salida.filter(
          (item) => item.peso >= peso[0] && item.peso <= peso[1]
        );
      }
      if ((altura[1] !== 0 || peso[1] !== 0) && edad[1] !== 0) {
        let hasta = new Date();
        hasta.setFullYear(hasta.getFullYear() - edad[0]);
        let desde = new Date();
        desde.setFullYear(desde.getFullYear() - edad[1]);
        salida = salida.filter(
          (item) =>
            item.fechaNacimiento >= desde.toISOString() &&
            item.fechaNacimiento <= hasta.toISOString()
        );
      }

      return salida;
    });

    //"hay salida searchPlayers: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.log("searchPlayersModel " + error);
    throw error;
  }
}

module.exports = {
  searchClubs,
  searchAgents,
  searchPlayers,
  searchPlayersAgents,
};
