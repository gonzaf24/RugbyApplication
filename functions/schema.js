const agentModel = require("./models/agentModel");
const userModel = require("./models/userModel");
const clubModel = require("./models/clubModel");
const searchModel = require("./models/searchModel");
const chatsModel = require("./models/chatsModel");
const bookModel = require("./models/bookModel");
const postModel = require("./models/postModel");
const matchResultModel = require("./models/matchResult");

const playerModel = require("./models/playerModel");
const agentPlayerModel = require("./models/agentPlayerModel");
const suscripcionModel = require("./models/suscripcionModel");
const utilsModel = require("./models/utilsModel");
const firebaseAuth = require("firebase");
let firebaseApp = require("firebase/app");
const { gql } = require("apollo-server-express");
let uniqid = require("uniqid");
const jsonwebtoken = require("jsonwebtoken");

require("firebase/database");
require("firebase/storage");
require("firebase/firestore");
require("firebase/auth");
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

firebaseApp.initializeApp(firebaseConfig);

const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51Hnq5UE7RfWspGLS5keav9obif2q8HHe65WLPAde1flhaFksKM7NMk7e5CrIeRAxmS14ArXqW2LjLgSNquozIifw00Dh0iPKgs"
);

const admin = require("firebase-admin");

admin.initializeApp();

const typeDefs = gql`
  type UsuarioLogued {
    uid: ID
    token: String
    email: String
    fechaCreacion: String
    notificarSuscripcion: Boolean
    notificarCompletarInformacion: Boolean
    status: String
    emailVerified: Boolean
    type: String
    planId: String
    nivel: String
    clubType: String
    fotoPerfil: String
    nombre: String
    player: PlayerOut
    club: ClubOut
  }

  type PlanOut {
    id: ID
    entidad: String
    precio: String
    tipo: String
    planKey: String
  }

  type SuscriptionOut {
    id: String
    fechaInicio: String
    fechaFin: String
    plan: String
    planId: String
    monto: String
    stripeCustomerId: String
    userId: String
    clubType: String
  }

  type UsuarioOut {
    uid: String
    token: String
    email: String
    fechaCreacion: String
    notificarSuscripcion: Boolean
    notificarCompletarInformacion: Boolean
    status: String
    emailVerified: Boolean
    type: String
    planId: String
    nivel: String
    clubType: String
    userEmail: String
  }

  type typeLinkOut {
    uid: String
    nombre: String
    link: String
  }

  type historyInternacionalOut {
    uid: String
    pais: String
    categoria: String
    torneo: String
    fecha: String
  }

  type historyClubOut {
    uid: String
    club: String
    pais: String
    liga: String
    fdesde: String
    fhasta: String
  }

  type BookedOut {
    players: [PlayerOut]
    clubs: [ClubOut]
  }

  type PlayerOut {
    uid: String
    nombre: String
    apellido: String
    fechaNacimiento: String
    paisNacimiento: String
    nacionalidades: [String]
    puesto: String
    puestoAlt: String
    pateador: String
    altura: Int
    peso: Int
    equipoActual: String
    paisEquipoActual: String
    categoriaEquipoActual: String
    descripcion: String
    historialClubs: [historyClubOut]
    fotoPerfil: String
    documentos: [typeLinkOut]
    videosHighlights: [typeLinkOut]
    videosMatchs: [typeLinkOut]
    agentNombre: String
    agentFotoPerfil: String
    agentUID: String
    nivel: String
    userEmail: String
    idiomas: [String]
    dispLaboral: Boolean
    dispEntrMenores: Boolean
    jugadorInternacional: Boolean
    historialInternacional: [historyInternacionalOut]
    booked: [BookOut]
  }

  type PostsOut {
    posts: [PostOut]
  }

  type MatchsResultsOut {
    matchsResults: [MatchResultOut]
  }

  type ClubOut {
    uid: String
    nombre: String
    direccion: String
    pais: String
    estadoCiudad: String
    cp: String
    categorias: [String]
    presidente: String
    responsableContrataciones: String
    telefonoResponsable: String
    emailResponsable: String
    fotoPerfil: String
    documentos: [typeLinkOut]
    videos: [typeLinkOut]
    clubType: String
    userEmail: String
    idiomas: [String]
    web: String
    booked: [BookOut]
  }

  type AgentOut {
    uid: String
    nombre: String
    inicioActividad: String
    idiomas: [String]
    agencia: String
    paisAgencia: String
    paisesOpera: [String]
    telefono: String
    email: String
    fotoPerfil: String
    documentos: [typeLinkOut]
    agentPlayers: [PlayerOut]
    userEmail: String
  }

  type PostOut {
    uid: String
    userType: String
    userUid: String
    userEmail: String
    urlFotoPost: String
    visibilidad: String
    contenidoPost: String
    fechaCreacion: String
    nombreUsuario: String
    likes: [String]
    comments: [CommentOut]
  }

  type MatchResultOut {
    uid: String
    userType: String
    userUid: String
    userEmail: String
    matchType: String
    stadium: String
    category: String
    matchDate: String
    matchVideoLink: String
    team1: String
    team2: String
    scoreTeam1: String
    scoreTeam2: String
    paisMatch: String
    estadoCiudadMatch: String
    descripcion: String
    paisSelectionTeam1: String
    paisSelectionTeam2: String
    urlFotoMatchResult: String
    visibilidad: String
    fechaCreacion: String
    nombreUsuario: String
    likes: [String]
    comments: [CommentOut]
  }

  type CommentOut {
    uid: String
    uidParent: String
    userUID: String
    text: String
    userEmail: String
    userType: String
    fotoPerfil: String
    fechaCreacion: String
    nombreUsuario: String
  }

  type ChatsOut {
    uid: String
    nombre: String
    avatar: String
    timestamp: String
    message: String
    horaPrev: String
    seen: Boolean
    email: String
  }

  type BookOut {
    idBook: String
    userBook: String
    tipo: String
    fechaCreacion: String
  }

  input UserCredentials {
    email: String!
    password: String!
  }

  input Payment {
    id: ID
    email: String
    nombre: String
    idPayment: String
    monto: String
    descripcion: String
    planKey: String
    planID: String
    type: String
    clubType: String
  }

  input Email {
    email: String!
  }

  input Id {
    id: String!
  }

  input historyInternacional {
    uid: String
    pais: String
    categoria: String
    torneo: String
    fecha: String
  }

  input historyClub {
    uid: String
    club: String
    pais: String
    liga: String
    fdesde: String
    fhasta: String
  }

  input typeLink {
    uid: String
    nombre: String
    link: String
  }

  input FilterClubIn {
    nombre: String
    categoria: String
    pais: String
    estadoCiudad: String
    clubType: String
  }

  input FilterAgentIn {
    pais: String
  }

  input FilterPlayersIn {
    nivel: String
    nacionalidad: String
    puesto: String
    puestoAlt: String
    pateador: String
    altura: [Int]
    peso: [Int]
    edad: [Int]
  }

  input BookIn {
    tipo: String
    idBook: String
    userBook: String
  }

  input PlayerIn {
    nombre: String
    apellido: String
    fechaNacimiento: String
    paisNacimiento: String
    nacionalidades: [String]
    puesto: String
    puestoAlt: String
    pateador: String
    altura: Int
    peso: Int
    equipoActual: String
    paisEquipoActual: String
    categoriaEquipoActual: String
    descripcion: String
    historialClubs: [historyClub]
    fotoPerfil: String
    documentos: [typeLink]
    videosHighlights: [typeLink]
    videosMatchs: [typeLink]
    uid: String
    nivel: String
    agentUID: String
    idiomas: [String]
    dispLaboral: Boolean
    dispEntrMenores: Boolean
    jugadorInternacional: Boolean
    historialInternacional: [historyInternacional]
  }

  input PostIn {
    uid: String
    emailUser: String
    urlFotoPost: String
    visibilidad: String
    contenidoPost: String
  }

  input MatchResultIn {
    uid: String
    emailUser: String
    matchType: String
    visibilidad: String
    matchDate: String
    paisMatch: String
    estadoCiudadMatch: String
    stadium: String
    category: String
    paisSelectionTeam1: String
    paisSelectionTeam2: String
    team1: String
    team2: String
    scoreTeam1: String
    scoreTeam2: String
    descripcion: String
    matchVideoLink: String
    urlFotoMatchResult: String
  }

  input ClubIn {
    nombre: String
    direccion: String
    pais: String
    estadoCiudad: String
    cp: String
    categorias: [String]
    presidente: String
    responsableContrataciones: String
    telefonoResponsable: String
    emailResponsable: String
    fotoPerfil: String
    documentos: [typeLink]
    videos: [typeLink]
    clubType: String
    idiomas: [String]
    web: String
  }

  input AgentIn {
    nombre: String
    inicioActividad: String
    idiomas: [String]
    agencia: String
    paisAgencia: String
    paisesOpera: [String]
    telefono: String
    email: String
    fotoPerfil: String
    documentos: [typeLink]
  }

  input UsuarioIn {
    uid: String
    token: String
    email: String
    fechaCreacion: String
    notificarSuscripcion: Boolean
    notificarCompletarInformacion: Boolean
    status: String
    emailVerified: Boolean
    type: String
    planId: String
    nivel: String
    clubType: String
  }

  input CommentIn {
    uid: String
    text: String
  }

  input ChatsIn {
    uid: String
    email: String
  }

  input AgentPlayerIn {
    playerUID: String
    agentUID: String
  }

  type Query {
    searchClubs(input: FilterClubIn): [ClubOut]
  }

  type Mutation {
    recoverPassword(input: Email!): String
    login(input: UserCredentials!): UsuarioLogued
    signup(input: UserCredentials!): String
    plan(input: Id!): PlanOut
    payment(input: Payment!): String

    user(input: Id!): UsuarioLogued
    agentPlayer(input: AgentPlayerIn!): PlayerOut
    agent(input: Id!): AgentOut
    player(input: Id!): PlayerOut
    club(input: Id!): ClubOut

    suscription(input: Id!): SuscriptionOut

    newPlayer(input: PlayerIn!): PlayerOut
    newClub(input: ClubIn!): ClubOut
    newAgent(input: AgentIn!): AgentOut
    newAgentPlayer(input: PlayerIn!): PlayerOut
    newPost(input: PostIn!): PostOut
    newMatchResult(input: MatchResultIn!): MatchResultOut

    editUser(input: UsuarioIn!): UsuarioOut
    editPlayer(input: PlayerIn!): PlayerOut
    editClub(input: ClubIn!): ClubOut
    editAgent(input: AgentIn!): AgentOut
    editAgentPlayer(input: PlayerIn!): PlayerOut
    editPost(input: PostIn!): PostOut
    editMatchResult(input: MatchResultIn!): MatchResultOut

    deleteAgentPlayer(input: AgentPlayerIn!): String
    deletePost(input: PostIn!): String
    deleteMatchResult(input: MatchResultIn!): String

    searchClubs(input: FilterClubIn): [ClubOut]
    searchAgents(input: FilterAgentIn): [AgentOut]
    searchPlayersAgents(input: FilterPlayersIn): [PlayerOut]
    searchPlayers(input: FilterPlayersIn): [PlayerOut]

    obtenerChatsUser(input: ChatsIn): [ChatsOut]

    book(input: BookIn!): String
    obtenerBooked(input: BookIn!): BookedOut

    obtenerAdmPosts(input: Id!): PostsOut
    obtenerCommentsPost(input: Id!): [CommentOut]
    commentPost(input: CommentIn!): CommentOut
    likePost(input: PostIn!): PostOut

    obtenerAdmMatchsResults(input: Id!): MatchsResultsOut
    obtenerCommentsMatchResult(input: Id!): [CommentOut]
    commentMatchResult(input: CommentIn!): CommentOut
    likeMatchResult(input: MatchResultIn!): MatchResultOut
  }
`;

async function checkIsUserLogged(context) {
  try {
    const { email, uid } = context;
    // chquequeo si el usuario esta en contexto
    if (!uid) throw new Error("404-User context");
    // voy a buscar al usario si es que existe registrado en la BD
    const user = await userModel.findById(uid);
    console.log(" user in context is : " + user.email);
    // si el User no existe, entonces envio un error
    if (!user || !user.uid) throw new Error("404-User context");
    if (user.email !== email) throw new Error("404-User context");
    return user;
  } catch (e) {
    console.log(" error is : " + e);
    throw e;
  }
}

const resolvers = {
  Mutation: {
    async recoverPassword(_, { input }) {
      console.log("#####---###### ---> entre al metodo API : recoverPassword");
      const { email } = input;
      const auth = firebaseAuth.auth();
      const response = await auth
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log("hay 200");
          return "200";
        })
        .catch((error) => {
          console.log("hay 400-" + error);
          return "404-" + error;
        });
      console.log(JSON.stringify(response));
      return response;
    },
    async login(_, { input }) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : Login : " +
            JSON.stringify(input)
        );
        const { email, password } = input;
        const data = await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (data) => {
            return data;
          })
          .catch((error) => {
            throw error;
          });
        console.log("entro1");
        let booked = await bookModel.getBook(data.user.email);
        //console.log("entro2 _ " + JSON.stringify(booked));
        if (data && data.user && data.user.emailVerified) {
          //console.log("entro3");
          let userOut = await userModel.login(data.user.uid);
          userOut = {
            ...userOut,
            token: jsonwebtoken.sign(
              {
                uid: data.user.uid,
                email: data.user.email,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            ),
          };
          //console.log("entro4");

          if (userOut && userOut.type && userOut.type.val() === "CLUB") {
            // console.log("entro5");
            let clubOut = await clubModel.findClubByEmail(data.user.email);
            userOut = await {
              ...userOut,
              club: { ...clubOut, booked },
            };
          } else if (
            userOut &&
            userOut.type &&
            userOut.type.val() === "PLAYER"
          ) {
            //console.log("entro6");
            let playerOut = await playerModel.findPlayerByEmail(
              data.user.email
            );
            userOut = await {
              ...userOut,
              player: { ...playerOut, booked },
            };
          } else {
            //console.log("entro7");
            userOut = await {
              ...userOut,
              club: {},
              player: {},
              type: "",
              planId: "",
              fotoPerfil: "",
              nombre: "",
            };
          }
          console.log(" Out login : " + JSON.stringify(userOut));
          return userOut;
        } else {
          await firebaseAuth
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {});
          const currentUser = await firebaseAuth.auth().currentUser;
          await currentUser
            .sendEmailVerification()
            .then()
            .catch((error) => {
              throw error;
            });
          firebaseAuth
            .auth()
            .signOut()
            .then()
            .catch((error) => {
              throw error;
            });
          return (respuesta = {
            emailVerified: false,
          });
        }
      } catch (error) {
        console.log("Login error ----- > : " + error);
        return error;
      }
    },
    async signup(_, { input }) {
      console.log(
        "#####---###### ---> entre al metodo API : : RegistroUsuario : " +
          JSON.stringify(input)
      );
      try {
        const { email, password } = input;
        const user = await firebaseAuth
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (data) => {
            return data.user;
          })
          .catch((error) => {
            throw error;
          });
        if (user) {
          const usuario = {
            uid: user.uid,
            email: email,
            fechaCreacion: new Date(
              new Date().toISOString().replace("Z", "-02:00")
            )
              .toISOString()
              .replace(".000", ""),
            notificarSuscripcion: true,
            notificarCompletarInformacion: true,
            status: "offline",
            type: "",
            planId: "",
            clubType: "",
            fotoPerfil: "",
            nombre: "",
          };
          const confirmado = await userModel.newUsuario(usuario);
          if (confirmado) {
            const currentUser = await firebaseAuth.auth().currentUser;
            const emailEnviado = await currentUser
              .sendEmailVerification()
              .then(() => {
                return true;
              })
              .catch((error) => {
                console.log(email + " -- " + error);
                throw error;
              });
            if (emailEnviado) {
              console.log("email verificacion enviado : " + currentUser.email);
              return "200-se ha creado con éxito el usuario";
            } else {
              return "400-error emailEnviado";
            }
          } else {
            return "400-error confirmado";
          }
        } else {
          return "400-error user";
        }
      } catch (error) {
        const { email } = input;
        console.log(
          " Error de Registro email :" + email + " - error : " + error
        );
        if (error.code === "auth/email-already-in-use") {
          return "401-" + error.message;
        } else if (error.code === "auth/weak-password") {
          return "402-" + error.message;
        } else {
          return "400-" + error.message;
        }
      }
    },
    async plan(_, { input }, context) {
      await checkIsUserLogged(context);
      console.log("###---> entre al metodo API : : plan por ID : " + input);
      try {
        let salida = await utilsModel.getPlanById(input.id);
        return { ...salida, id: input.id };
      } catch (error) {
        throw new Error("404-plan" + error);
      }
    },
    async payment(_, { input }, context) {
      console.log("###---> entre al metodo API : : payment  : " + input);
      const {
        id,
        email,
        nombre,
        idPayment,
        monto,
        descripcion,
        planKey,
        planID,
        clubType,
      } = input;
      try {
        await checkIsUserLogged(context);

        // console.log(" email a comparar con context: " + email);
        // console.log("Datos de entrada : " + JSON.stringify(input));
        const customer = await stripe.customers.create({
          payment_method: idPayment,
          email: email,
          name: nombre,
          description: descripcion,
          invoice_settings: {
            default_payment_method: idPayment,
          },
        });
        if (customer) {
          const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: planKey }],
            expand: ["latest_invoice.payment_intent"],
          });
          if (subscription) {
            console.log(" Nueva Suscripcion" + JSON.stringify(subscription));
            let amount =
              parseInt(subscription["latest_invoice"]["amount_paid"]) / 100;
            let tipoMoneda = subscription["latest_invoice"]["currency"];
            let customerId = subscription["latest_invoice"]["customer"];
            let suscriptionItemId = subscription["items"]["data"][0]["id"];
            let suscriptionId = subscription["id"];
            let facturaPDF = subscription["latest_invoice"]["invoice_pdf"];
            let perI = new Date(subscription.current_period_start * 1000);
            let perF = new Date(subscription.current_period_end * 1000);
            const uidStore = id + "|" + uniqid();

            const suscripcion = {
              uid: uidStore,
              tipoMoneda: tipoMoneda,
              stripeCustomerId: customerId,
              stripeSuscriptionItemId: suscriptionItemId,
              stripeSuscriptionId: suscriptionId,
              stripeFacturaPDF: facturaPDF,
              stripeNombre: nombre,
              fechaInicio: new Date(perI.toISOString().replace("Z", "-02:00"))
                .toISOString()
                .replace(".000", ""),
              fechaFin: new Date(perF.toISOString().replace("Z", "-02:00"))
                .toISOString()
                .replace(".000", ""),
              activo: true,
              monto: amount,
              plan: descripcion,
              planId: planID,
            };
            const newSuscripcion = await suscripcionModel.newSuscripcion(
              suscripcion,
              email
            );
            console.log("newSuscripcion : " + JSON.stringify(newSuscripcion));
            if (newSuscripcion) {
              const user = await userModel.findById(id);
              const usuario = await {
                ...user,
                planId: planID,
                notificarSuscripcion: false,
                stripeSuscriptionId: suscriptionId,
                type: planID,
                clubType: clubType ? clubType : "",
              };
              const editado = await userModel.edit(usuario);
              if (editado) {
                console.log("Usuario editado  : " + JSON.stringify(usuario));
                return "200-" + planID;
              } else {
                console.log("400-Suscripcion-editado");
                return "400-Suscripcion-editado";
              }
            } else {
              console.log("400-Suscripcion-newSuscripcion");
              return "400-Suscripcion-newSuscripcion";
            }
          } else {
            console.log("400-Suscripcion-subscription");
            return "400-Suscripcion-subscription";
          }
        } else {
          console.log("400-Suscripcion-customer");
          return "400-Suscripcion-customer";
        }
      } catch (error) {
        console.log("Error de suscripcion email : " + email + " -- " + error);
        return "400 - " + error.message;
      }
    },
    async user(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : : user por ID : " +
            JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let userOut = await userModel.findById(input.id);
        //console.log(" email a comparar con context: " + userOut.email);
        const type = userOut.type;

        switch (type) {
          case "PLAYER":
            userOut = await {
              ...userOut,
              player: await playerModel.findPlayerByEmail(userOut.email),
            };
            return userOut;
          case "AGENT":
            agentPlayers = await agentPlayerModel.getAgentPlayers(
              userOut.email
            );
            agentOut = await agentModel.findAgentByEmail(userOut.email);
            userOut = await {
              ...userOut,
              agent: { ...agentOut, agentPlayers },
            };
            return userOut;
          case "CLUB":
            userOut = await {
              ...userOut,
              club: await clubModel.findClubByEmail(userOut.email),
            };
            return userOut;
          default:
            return userOut;
        }
      } catch (error) {
        throw new Error("404-user" + error);
      }
    },
    async agentPlayer(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : : agentPlayer por ID : " +
            JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let userOut = await userModel.findById(input.agentUID);
        console.log(" userOUT : " + JSON.stringify(userOut));
        let agent = await agentModel.findAgentByEmail(userOut.email);
        console.log(" agent : " + JSON.stringify(agent));
        const response = await agentPlayerModel.findAgentPlayerById(
          userOut.email,
          input.playerUID
        );
        console.log(" response : " + JSON.stringify(response));
        return {
          ...response,
          agentNombre: agent.nombre,
          agentFotoPerfil: agent.fotoPerfil,
          agentUID: userOut.uid,
        };
      } catch (error) {
        throw new Error("404-agentPlayer" + error);
      }
    },
    async agent(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : : agent por ID : " +
            JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let userOut = await userModel.findById(input.id);
        let agentPlayers = await agentPlayerModel.getAgentPlayers(
          userOut.email
        );
        let agentOut = await agentModel.findAgentByEmail(userOut.email);
        let response = await { ...agentOut, agentPlayers };
        return response;
      } catch (error) {
        throw new Error("404-agent" + error);
      }
    },
    async player(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : : player por ID : " +
            JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let userOut = await userModel.findById(input.id);
        let response = await playerModel.findPlayerByEmail(userOut.email);
        return response;
      } catch (error) {
        throw new Error("404-agent" + error);
      }
    },
    async club(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : : club por ID : " +
            JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let userOut = await userModel.findById(input.id);
        let response = await clubModel.findClubByEmail(userOut.email);
        return response;
      } catch (error) {
        throw new Error("404-agent" + error);
      }
    },
    async suscription(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : : suscription por ID : " +
            JSON.stringify(input)
        );
        let userContext = await checkIsUserLogged(context);
        let suscripcionBD = await suscripcionModel.findSuscripcionesByEmail(
          userContext.email
        );

        await suscripcionBD.sort((a, b) => {
          return new Date(b.fechaFin) - new Date(a.fechaFin);
        });

        console.log("suscripcionBD : " + new Date(suscripcionBD[0].fechaFin));

        const salida = await stripe.subscriptions.retrieve(
          suscripcionBD[0].stripeSuscriptionId
        );

        if (salida) {
          let out = {
            id: suscripcionBD[0].uid,
            fechaInicio: new Date(salida.current_period_start * 1000),
            fechaFin: new Date(salida.current_period_end * 1000),
            plan: suscripcionBD[0].plan,
            planId: suscripcionBD[0].planId,
            monto: suscripcionBD[0].monto,
            stripeCustomerId: suscripcionBD[0].stripeCustomerId,
            userId: userContext.uid,
            clubType: userContext.clubType ? userContext.clubType : "",
          };
          return out;
        } else {
          throw new Error("404-suscription" + error);
        }

        //primero obtengo el ID de la suscripcion del Usuario

        //luego con el Id Suscripcion voy a stripe y obtengo la suscripcion real
      } catch (error) {
        throw new Error("404-suscription" + error);
      }
    },
    async newPlayer(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : newPlayer : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let email = user.email;
        player = await { ...input, fechaCreacion: fechaHoy, uid: user.uid };
        await playerModel.newPlayer(player, email);
        const userPersist = {
          ...user,
          notificarCompletarInformacion: false,
          nivel: input.nivel,
        };
        await userModel.edit(userPersist);
        const response = await playerModel.findPlayerByEmail(user.email);
        return response;
      } catch (error) {
        throw new Error("404-newPlayer ->" + error);
      }
    },
    async newClub(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : newClub : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let club = { ...input, fechaCreacion: fechaHoy, uid: user.uid };
        console.log(" club : " + JSON.stringify(club));
        await clubModel.newClub(club, user.email);
        const userPersist = { ...user, notificarCompletarInformacion: false };
        await userModel.edit(userPersist);
        const response = await clubModel.findClubByEmail(user.email);
        return response;
      } catch (error) {
        throw new Error("404-newClub->" + error);
      }
    },
    async newAgent(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : newAgent : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let email = user.email;
        let agent = await { ...input, fechaCreacion: fechaHoy, uid: user.uid };
        console.log(" agent : " + JSON.stringify(agent));
        await agentModel.newAgent(agent, email);
        const userPersist = { ...user, notificarCompletarInformacion: false };
        await userModel.edit(userPersist);
        const response = await agentModel.findAgentByEmail(user.email);
        return response;
      } catch (error) {
        throw new Error("404-newAgent ->" + error);
      }
    },
    async newAgentPlayer(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : newAgentPlayer : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let email = user.email;
        player = await { ...input, fechaCreacion: fechaHoy };
        let uidAgentPlayer = await agentPlayerModel.newAgentPlayer(
          player,
          email
        );
        const response = await agentPlayerModel.findAgentPlayerById(
          email,
          uidAgentPlayer
        );
        return response;
      } catch (error) {
        throw new Error("404-newAgentPlayer ->" + error);
      }
    },
    async newPost(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : newPost : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let post = await {
          ...input,
          fechaCreacion: fechaHoy,
          userUid: user.uid,
          userEmail: user.email,
          userType: user.type,
          likes: [],
        };
        let uidPost = await postModel.newPost(post, user.email);
        const response = await postModel.findPostById(uidPost);
        return response;
      } catch (error) {
        throw new Error("404-newPost->" + error);
      }
    },
    async newMatchResult(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : newMatchResult : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let matchResult = await {
          ...input,
          fechaCreacion: fechaHoy,
          userUid: user.uid,
          userEmail: user.email,
          userType: user.type,
          likes: [],
        };
        let uidMatchResult = await matchResultModel.newMatchResult(
          matchResult,
          user.email
        );
        const response = await matchResultModel.findMatchResultById(
          uidMatchResult
        );
        return response;
      } catch (error) {
        throw new Error("404-newMatchResult->" + error);
      }
    },
    async editUser(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editUser : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        const userPersist = { ...user, ...input };
        userModel.edit(userPersist);
        const result = userModel.findById(userPersist.uid);
        return result;
      } catch (error) {
        throw new Error("404-editUser" + error);
      }
    },
    async editClub(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editClub : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let clubAux = await clubModel.findClubByEmail(user.email);
        let club = { ...clubAux, ...input };
        await clubModel.editClub(user.email, club);
        const response = await clubModel.findClubByEmail(user.email);
        return response;
      } catch (error) {
        throw new Error("404-editClub->" + error);
      }
    },
    async editPlayer(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editPlayer : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        const playerAux = await playerModel.findPlayerByEmail(user.email);
        player = await { ...playerAux, ...input };
        await playerModel.editPlayer(user.email, player);
        const response = await playerModel.findPlayerByEmail(user.email);
        return response;
      } catch (error) {
        throw new Error("404-editPlayer ->" + error);
      }
    },
    async editAgent(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editAgent : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        const agentAux = await agentModel.findAgentByEmail(user.email);
        let agent = await { ...agentAux, ...input };
        await agentModel.newAgent(agent, user.email);
        const response = await agentModel.findAgentByEmail(user.email);
        return response;
      } catch (error) {
        throw new Error("404-editAgent ->" + error);
      }
    },
    async editAgentPlayer(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editAgentPlayer : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let email = user.email;
        let playerAgentAux = await agentPlayerModel.findAgentPlayerById(
          email,
          input.uid
        );
        const playerAgent = await { ...playerAgentAux, ...input };
        await agentPlayerModel.editAgentPlayer(email, playerAgent);
        const response = await agentPlayerModel.findAgentPlayerById(
          email,
          input.uid
        );
        return response;
      } catch (error) {
        throw new Error("404-editAgentPlayer -> " + error);
      }
    },
    async editPost(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editPost : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let post = await {
          ...input,
        };
        let respuesta = await postModel.editPost(post, user.email);
        const response = await postModel.findPostById(post.uid);
        return response;
      } catch (error) {
        throw new Error("404-editPost ->" + error);
      }
    },
    async editMatchResult(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : editMatchResult : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let matchResult = await {
          ...input,
        };
        let respuesta = await matchResultModel.editMatchResult(
          matchResult,
          user.email
        );
        const response = await matchResultModel.findMatchResultById(
          matchResult.uid
        );
        return response;
      } catch (error) {
        throw new Error("404-editMatchResult ->" + error);
      }
    },
    async deleteAgentPlayer(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : deleteAgentPlayer : " +
            JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let userOut = await userModel.findById(input.agentUID);
        await agentPlayerModel.deleteAgentPlayer(
          userOut.email,
          input.playerUID
        );
        return "200";
      } catch (error) {
        throw new Error("404-editAgentPlayer -> " + error);
      }
    },
    async deletePost(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : deletePost : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        await postModel.deletePost(user.email, input.uid);
        return "200";
      } catch (error) {
        throw new Error("404-deletePost -> " + error);
      }
    },
    async deleteMatchResult(_, { input }, context) {
      try {
        console.log(
          "#####---###### ---> entre al metodo API : : deleteMatchResult : " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        await matchResultModel.deleteMatchResult(user.email, input.uid);
        return "200";
      } catch (error) {
        throw new Error("404-deleteMatchResult -> " + error);
      }
    },
    async searchClubs(_, { input }, context) {
      try {
        console.log(
          " ##### ---- ##### - searchClubs --> " + JSON.stringify(input)
        );
        let userContext = await checkIsUserLogged(context);
        const { nombre, categoria, pais, estadoCiudad, clubType } = input;

        let result = await searchModel.searchClubs(
          nombre,
          categoria,
          pais,
          estadoCiudad,
          clubType
        );

        console.log(" Salgo  de searchClubs : " + JSON.stringify(result));
        if (result) {
          return result;
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
    },
    async searchAgents(_, { input }, context) {
      try {
        console.log(
          " ##### ---- ##### - searchAgents --> " + JSON.stringify(input)
        );
        let userContext = await checkIsUserLogged(context);
        const { pais } = input;

        let result = await searchModel.searchAgents(pais);

        console.log(" Salgo de searchAgents : " + JSON.stringify(result));
        if (result) {
          return result;
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
    },
    async searchPlayersAgents(_, { input }, context) {
      try {
        console.log(
          " ##### ---- ##### - searchPlayersAgents --> " + JSON.stringify(input)
        );
        let userContext = await checkIsUserLogged(context);
        const {
          nivel,
          nacionalidad,
          puesto,
          puestoAlt,
          pateador,
          altura,
          peso,
          edad,
        } = input;
        let result = await searchModel.searchPlayersAgents(
          nivel,
          nacionalidad,
          puesto,
          puestoAlt,
          pateador,
          altura,
          peso,
          edad
        );

        if (result) {
          return result;
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
    },
    async searchPlayers(_, { input }, context) {
      try {
        console.log(
          " ##### ---- ##### - searchPlayers --> " + JSON.stringify(input)
        );
        let userContext = await checkIsUserLogged(context);
        const {
          nivel,
          nacionalidad,
          puesto,
          puestoAlt,
          pateador,
          altura,
          peso,
          edad,
        } = input;

        let result = await searchModel.searchPlayers(
          nivel,
          nacionalidad,
          puesto,
          puestoAlt,
          pateador,
          altura,
          peso,
          edad
        );

        console.log(" Salgo de searchAgents : " + JSON.stringify(result));
        if (result) {
          return result;
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
    },
    async obtenerChatsUser(_, { input }, context) {
      try {
        console.log(
          " ##### ---- ##### - obtenerChatsUser --> " + JSON.stringify(input)
        );
        await checkIsUserLogged(context);
        let listaChat = await chatsModel.getChats(input.email);
        let salida = [];
        await listaChat.reduce(async (promise, elemento) => {
          await promise;
          let userResponse = await userModel.findById(elemento.uid);
          let nameVal;
          let surnameVal;
          let fotoPerfil;
          switch (userResponse.type) {
            case "PLAYER":
              userResponse = await {
                ...userResponse,
                player: await playerModel.findPlayerByEmail(userResponse.email),
              };
              break;
            case "CLUB":
              userResponse = await {
                ...userResponse,
                club: await clubModel.findClubByEmail(userResponse.email),
              };
              break;
          }

          switch (userResponse.type) {
            case "PLAYER":
              nameVal = userResponse.player.nombre;
              surnameVal = userResponse.player.apellido;
              fotoPerfil = userResponse.player.fotoPerfil;
              break;
            case "CLUB":
              nameVal = userResponse.club.nombre;
              fotoPerfil = userResponse.club.fotoPerfil;
              break;
          }
          const conversationKey = [elemento.uid, input.uid].sort().join("|");
          let lastMessage = await chatsModel.obtenerUltimaConversationsOnce(
            conversationKey
          );
          const dateObject = new Date(Number(elemento.timestamp));
          let fecha = "";
          let timeString = "";
          fecha = format(dateObject, "dd/MM/yyyy", { locale: es });
          timeString = `${fecha}-${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;

          if (lastMessage !== null) {
            lastMessage.forEach((msg) => {
              let chat = {
                timestamp: elemento.timestamp,
                nombre: nameVal,
                apellido: surnameVal,
                uid: userResponse.uid,
                avatar: fotoPerfil,
                message: msg.val().message,
                horaPrev: timeString,
                seen: elemento.seen,
                email: userResponse.email,
              };
              salida.push(chat);
            });
          }
          return Promise.resolve();
        }, Promise.resolve());

        salida.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });

        if (salida) {
          return salida;
        } else {
          return [];
        }
      } catch (error) {
        console.log(" error : " + JSON.stringify(error));
        throw new Error("404-obtenerChatsUser -> " + error);
      }
    },
    async book(_, { input }, context) {
      try {
        console.log(" ##### ---- ##### - book --> " + JSON.stringify(input));

        let user = await checkIsUserLogged(context);
        await bookModel.book(
          user.email,
          input.idBook,
          input.tipo,
          input.userBook
        );
        return "OK - booked";
      } catch (error) {
        console.log(" error : " + JSON.stringify(error));
        throw new Error("404-book -> " + error);
      }
    },
    async obtenerBooked(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : obtenerBooked por ID --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        const salida = await bookModel.getBooked(user.email, input.tipo);
        return salida;
      } catch (error) {
        console.log(" error : " + JSON.stringify(error));
        throw new Error("404-obtenerBooked -> " + error);
      }
    },
    async obtenerAdmPosts(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : obtenerAdmPosts por ID --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let posts = await postModel.findPosts(user.email);
        let salida = [];
        await posts.reduce(async (promise, elemento) => {
          await promise;
          let comments = await postModel.getListCommentsPost(elemento.uid);
          salida.push({ ...elemento, comments: comments ? comments : [] });
          return Promise.resolve();
        }, Promise.resolve());
        return { posts: salida };
      } catch (error) {
        throw new Error("404-obtenerAdmPosts -> " + error);
      }
    },
    async obtenerCommentsPost(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : obtenerCommentsPost --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let salida = await postModel.getListCommentsPost(input.id);

        return salida;
      } catch (error) {
        throw new Error("404-obtenerCommentsPost -> " + error);
      }
    },
    async commentPost(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : commentPost --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let postData = await postModel.findPostById(input.uid);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let commentPersist = {
          uidParent: input.uid,
          text: input.text,
          userUID: user.uid,
          userEmail: user.email,
          userType: user.type,
          fechaCreacion: fechaHoy,
        };
        let refIDpost = await postModel.commentPost(
          postData.userEmail,
          commentPersist
        );
        let postPersisted = await postModel.getCommentPostById(refIDpost);
        let dataUsuario = await utilsModel.getFotoPerfilYNombre(
          postPersisted.userType,
          postPersisted.userEmail
        );

        postPersisted = { ...postPersisted, ...dataUsuario };
        return postPersisted;
      } catch (error) {
        throw new Error("404-commentPost -> " + error);
      }
    },
    async likePost(_, { input }, context) {
      console.log("#####---###### ---> entre al metodo API : : likePost");
      try {
        const user = await checkIsUserLogged(context);
        const post = await postModel.findPostById(input.uid);
        if (post.likes && post.likes.includes(user.uid)) {
          post.likes.splice(post.likes.indexOf(user.uid), 1);
          await postModel.editPost(post, input.emailUser);
        } else {
          post.likes ? post.likes.push(user.uid) : (post.likes = [user.uid]);
          await postModel.editPost(post, input.emailUser);
        }
        return post;
      } catch (error) {
        throw new Error("404-likePost -> " + error);
      }
    },
    async obtenerAdmMatchsResults(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : obtenerAdmMatchsResults por ID --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let matchsResults = await matchResultModel.findMatchsResults(
          user.email
        );
        let salida = [];
        await matchsResults.reduce(async (promise, elemento) => {
          await promise;
          let comments = await matchResultModel.getListCommentsMatchsResults(
            elemento.uid
          );
          salida.push({ ...elemento, comments: comments ? comments : [] });
          return Promise.resolve();
        }, Promise.resolve());
        return { matchsResults: salida };
      } catch (error) {
        throw new Error("404-obtenerAdmMatchsResults -> " + error);
      }
    },
    async obtenerCommentsMatchResult(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : obtenerCommentsMatchResult --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let salida = await matchResultModel.getListCommentsMatchsResults(
          input.id
        );

        return salida;
      } catch (error) {
        throw new Error("404-obtenerCommentsMatchResult -> " + error);
      }
    },
    async commentMatchResult(_, { input }, context) {
      try {
        console.log(
          "###---> entre al metodo API : commentMatchResult --> " +
            JSON.stringify(input)
        );
        let user = await checkIsUserLogged(context);
        let postData = await matchResultModel.findMatchResultById(input.uid);
        let hoy = new Date();
        const fechaHoy = new Date(hoy.toISOString().replace("Z", "-02:00"))
          .toISOString()
          .replace(".000", "");
        let commentPersist = {
          uidParent: input.uid,
          text: input.text,
          userUID: user.uid,
          userEmail: user.email,
          userType: user.type,
          fechaCreacion: fechaHoy,
        };
        let refIDpost = await matchResultModel.commentMatchResult(
          postData.userEmail,
          commentPersist
        );
        let postPersisted = await matchResultModel.getCommentMatchResultById(
          refIDpost
        );
        let dataUsuario = await utilsModel.getFotoPerfilYNombre(
          postPersisted.userType,
          postPersisted.userEmail
        );

        postPersisted = { ...postPersisted, ...dataUsuario };
        return postPersisted;
      } catch (error) {
        throw new Error("404-commentMatchResult -> " + error);
      }
    },
    async likeMatchResult(_, { input }, context) {
      console.log(
        "#####---###### ---> entre al metodo API : : likeMatchResult"
      );
      try {
        const user = await checkIsUserLogged(context);
        const matchResult = await matchResultModel.findMatchResultById(
          input.uid
        );
        if (matchResult.likes && matchResult.likes.includes(user.uid)) {
          matchResult.likes.splice(matchResult.likes.indexOf(user.uid), 1);
          await matchResultModel.editMatchResult(matchResult, input.emailUser);
        } else {
          matchResult.likes
            ? matchResult.likes.push(user.uid)
            : (matchResult.likes = [user.uid]);
          await matchResultModel.editMatchResult(matchResult, input.emailUser);
        }
        return matchResult;
      } catch (error) {
        throw new Error("404-likeMatchResult -> " + error);
      }
    },
  },

  Query: {
    async searchClubs(_, { input }, context) {
      try {
        console.log(
          " ##### Query ##### - searchClubs --> " + JSON.stringify(input)
        );
        let userContext = await checkIsUserLogged(context);
        const { nombre, categoria, pais, estadoCiudad, clubType } = input;

        return user;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
