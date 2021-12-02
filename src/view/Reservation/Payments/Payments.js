import { useState } from "react";

function Payments() {
  const classes = useStyles();
  //state
  const [email, setEmail] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (e) => {
    if(!stripe || !elements) {
      //Stripe.js has not yet loaded.
      // make sure to disable form submission until Stripe.js has loaded
      return;
    }

    const res = await.post('http://localhost:3000/pay', {email: email});

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Money is in the bank!');
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
        label='Email'
        id='outline-email-imput'
        helperText={`Email you'll receive updates and receipts on` }
        margin='normal'
        variant='outlined'
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fulWidth
        >
          <CardInput />
          <div className={classes.div}>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>Pay</Button>
            <Button variant="contained" color="primary" className={classes.button}>Subscription</Button>
          </div>
        </TextField>
      </CardContent>
    </Card>
  );
}

export default Payments;