import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Input } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { GET_PLAN } from "../mutations/UtilsMutation";
import { DO_PAYMENT } from "../mutations/PaymentsMutation";
import { Context } from "../Context";
import { useInputValue } from "../hooks/useInputValue";
import { navigate } from "@reach/router";
import { NavBarInfo } from "../components/NavBarInfo";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Helmet } from "react-helmet";
import { id } from "date-fns/locale";

const stripePromise = loadStripe(
  "pk_test_51Hnq5UE7RfWspGLSevCDvioudXgxIRFo8oyJvgtnZcXlFC7gbFi15ZA6gCmK57LWpXCiwHlnCDSCgkOiBioCqIdt00TzJ0Hdj2"
);

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    letterSpacing: "3px",
    textAlign: "center",
    minHeight: "100vh",
  },
  buttonCard: {
    justifyContent: "center",
    fontSize: "0.7rem",
    backgroundColor: "#009688",
  },
  txtError: {
    color: "red",
    letterSpacing: 0.8,
    marginTop: 50,
  },
  label: {
    color: "#6b7c93",
    fontWeight: 250,
    letterSpacing: "0.025em",
    marginLeft: 4,
  },
  cardNumber: {
    display: "block",
    maxWidth: "450px",
    boxShadow: "rgba(50, 50, 93, 0.14902) 0px 1px 3px",
    border: 0,
    outline: 0,
    borderRadius: "4px",
    background: "white",
    fontSize: "12px",
    fontWeight: 500,
    margin: 3,
    padding: 3,
    fontSmoothing: "auto",
  },
  expCVC: {
    display: "block",
    maxWidth: "450px",
    fontSize: "12px",
    boxShadow: "rgba(50, 50, 93, 0.14902) 0px 1px 3px",
    border: 0,
    outline: 0,
    borderRadius: "4px",
    background: "white",
    margin: 3,
    padding: 3,
  },
  rootContent: {
    padding: 0,
  },
  root: {
    maxWidth: 300,
    textAlign: "left",
    flexGrow: 1,
    fontSize: "12px",
    margin: 3,
    padding: 3,
    marginTop: 90,
    display: "inline-grid",
  },
  actionsCard: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  grey: {
    height: 200,
    backgroundColor: "#80808033",
    padding: 0,
    margin: 0,
  },
  cardHeader: {
    letterSpacing: 1,
    fontSize: "1.5rem",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  cardBody1: {
    marginTop: 15,
    textAlign: "center",
    fontSize: "0.8rem",
  },
  cardBody2: {
    marginTop: 20,
    textAlign: "center",
    fontSize: "1rem",
  },
  cardBody3: {
    marginTop: 25,
    textAlign: "center",
    fontSize: "1.2rem",
  },
  margin: {
    marginTop: 10,
  },
  cardError: {
    color: "red",
    textAlign: "center",
    letterSpacing: "1px",
    width: "100%",
  },
  btnBack: {
    marginTop: 60,
  },
}));

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      width: "80%",
      color: "#32325d",
      fontWeight: 500,
      fontSmoothing: "auto",
      fontSize: "12px",
      background: "#e6e6e62e",
      fontWeight: 500,
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

// You can customize your Elements to give it the look and feel of your site.

const CheckoutForm = ({ id, clubType }) => {
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState();
  const [monto, setMonto] = useState();
  const [typeSuscription, setTypeSuscription] = useState("");
  const [typeSuscriptionID, setTypeSuscriptionID] = useState("");
  const [tipoPlan, setTipoPlan] = useState("");
  const [meses, setMeses] = useState("");
  const [entidad, setEntidad] = useState("");
  const [planKey, setPlanKey] = useState("");
  const [plan] = useMutation(GET_PLAN);
  const [payment] = useMutation(DO_PAYMENT);
  const { changeLang, user } = useContext(Context);
  let nombreTarjeta = useInputValue();

  useEffect(() => {
    async function fetchData() {
      const input = { id };
      const response = await plan({
        variables: { input },
      });
      if (response) {
        const { plan } = response.data;
        setMonto(plan.precio);
        setEntidad(plan.entidad);
        setPlanKey(plan.planKey);
        texto();
      } else {
        setError(true);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    texto();
  }, [changeLang]);

  const texto = () => {
    if ([1, 2, 3].indexOf(parseInt(id)) > -1) {
      setTypeSuscription(t("txt.club"));
      setTypeSuscriptionID("CLUB");
    } else if ([10, 11, 12].indexOf(parseInt(id)) > -1) {
      setTypeSuscription(t("txt.club"));
      setTypeSuscriptionID("CLUB");
    } else if ([4, 5, 6].indexOf(parseInt(id)) > -1) {
      setTypeSuscription(t("txt.agent"));
      setTypeSuscriptionID("AGENT");
    } else if ([7, 8, 9].indexOf(parseInt(id)) > -1) {
      setTypeSuscription(t("txt.player"));
      setTypeSuscriptionID("PLAYER");
    }
    if ([1, 4, 7, 10].indexOf(parseInt(id)) > -1) {
      setTipoPlan(t("txt.annual"));
      setMeses(12);
    } else if ([2, 5, 8, 11].indexOf(parseInt(id)) > -1) {
      setTipoPlan(t("txt.semester"));
      setMeses(6);
    } else if ([3, 6, 9, 12].indexOf(parseInt(id)) > -1) {
      setTipoPlan(t("txt.monthly"));
      setMeses(1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      card: elements.getElement(CardExpiryElement),
      card: elements.getElement(CardCvcElement),
      billing_details: {
        email: user.email,
        name: nombreTarjeta.value,
      },
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }

    if (!error) {
      const { id } = paymentMethod;
      const input = {
        id: user.uid,
        email: user.email,
        nombre: nombreTarjeta.value,
        idPayment: id,
        monto: "200000",
        descripcion: entidad,
        planKey,
        planID: typeSuscriptionID,
        clubType,
      };
      const { data } = await payment({
        variables: { input },
      });
      if (data && data.payment) {
        let response = data.payment;
        let codigo = response.slice(0, 3);
        if (codigo === "200") {
          let type = response.slice(4);
          switch (type) {
            case "PLAYER":
              navigate("/player/level");
              break;
            case "CLUB":
              navigate("/club/info");
              break;
          }
        } else if (codigo === "400") {
          setErrorMessage(data.payment);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Helmet>{<title>{t("txt.payment")} - RUGBY AGENTS </title>}</Helmet>
      <NavBarInfo />
      <form onSubmit={handleSubmit}>
        <br />

        {error && (
          <div className={classes.txtError}> {t("error.type.general")}</div>
        )}

        <Card className={classes.root}>
          <CardContent className={classes.rootContent}>
            <div>
              <Grid container spacing={1}>
                <Grid className={classes.grey} item xs={12}>
                  <Grid className={classes.cardHeader} item xs={12}>
                    {t("txt.suscription")} {typeSuscription.toUpperCase()}{" "}
                    {clubType}
                  </Grid>
                  <Grid className={classes.cardBody1} item xs={12}>
                    {user.email}
                  </Grid>
                  <Grid className={classes.cardBody2} item xs={12}>
                    {meses} {meses === 1 ? t("txt.month") : t("txt.months")}
                  </Grid>
                  <Grid className={classes.cardBody3} item xs={12}>
                    {t("txt.plan")} {tipoPlan} €{monto}
                  </Grid>
                </Grid>

                {errorMessage && (
                  <div className={classes.cardError}> {errorMessage}</div>
                )}

                <Grid className={classes.margin} item xs={12}>
                  <label className={classes.label}>
                    {" "}
                    {t("payment.cardName")}
                  </label>
                  <Input
                    disabled={loading}
                    placeholder="John Doe"
                    required
                    disableUnderline
                    className={classes.cardNumber}
                    {...nombreTarjeta}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label className={classes.label}>
                    {t("payment.cardNumber")}
                    <CardNumberElement
                      disabled={loading}
                      className={classes.cardNumber}
                      options={CARD_ELEMENT_OPTIONS}
                    />
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <label className={classes.label}>
                    {t("payment.exp")}
                    <CardExpiryElement
                      disabled={loading}
                      className={classes.expCVC}
                      options={CARD_ELEMENT_OPTIONS}
                    />
                  </label>
                </Grid>
                <Grid item xs={6}>
                  <label className={classes.label}>
                    CVC
                    <CardCvcElement
                      disabled={loading}
                      className={classes.expCVC}
                      options={CARD_ELEMENT_OPTIONS}
                    />
                  </label>
                </Grid>
              </Grid>
            </div>
          </CardContent>

          <CardActions className={classes.actionsCard}>
            <Button
              disabled={!stripe}
              className={classes.buttonCard}
              variant="outlined"
              color="primary"
              type="submit"
            >
              {loading ? (
                <div>
                  {t("txt.makingPayment")}
                  <LinearProgress />
                </div>
              ) : (
                t("payment.pay") + " €" + monto
              )}
            </Button>
          </CardActions>
        </Card>
      </form>
      <div className={classes.btnBack}>
        {!loading && (
          <Button
            size="small"
            onClick={() => {
              navigate("/plans");
            }}
          >
            {t("button.back")}
          </Button>
        )}
      </div>
    </>
  );
};

export const Payment = ({ id, clubType }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.body}>
        <Elements stripe={stripePromise}>
          <CheckoutForm id={id} clubType={clubType} />
        </Elements>
      </div>
    </>
  );
};
