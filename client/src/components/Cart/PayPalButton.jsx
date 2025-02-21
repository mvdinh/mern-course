import{PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"
const PayPalButton = (amount, onSuccess, onError) => {
  return (
    <PayPalScriptProvider options={{"client-id":
    "AXa4HyEVf9Tj_jTyDV7WmPjF2N0DxQWSfLya3xPaIulXHSqG2hlckxjm1ZHIRVozS4F6JEVb_BY0jVsx"}}>
        <PayPalButtons
            style={{layout:"vertical"}}
            createOrder={(data, actions)=>{
                return actions.order.create({
                    purchase_units:[{
                        amount:{
                            value:amount
                        }
                    }]
                })
            }}
            onApprove={(data, actions)=>{
                return actions.order.capture().then(onSuccess)
            }}
            onError={onError}
        >

        </PayPalButtons>
    </PayPalScriptProvider>
  )
}

export default PayPalButton
