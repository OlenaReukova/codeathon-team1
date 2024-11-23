import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const style = {"layout":"horizontal"};

const ButtonWrapper = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
      <>
          { isPending && <div className="spinner">...Loading</div> }
          <PayPalButtons
              fundingSource="paypal"
              style={{"layout":"vertical","label":"donate"}}
              disabled={false}
              forceReRender={[style]}
          />
      </>
  );
}

const Donate = () => {
  return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider options={{ clientId: "AYz52W3GMorfkRnXkXERQm-nS3XvHX_XHYIBtrGkJ2wWBH_GD3JKfrPyHjTN28TmTPnKK0eJucKd22Dq", components: "buttons", currency: "USD" }}>
              <ButtonWrapper/>
          </PayPalScriptProvider>
      </div>
  );
}

export default Donate;