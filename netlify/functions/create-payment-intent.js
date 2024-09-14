require("dotenv").config();
const stripe =  require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

    try {
        console.log('inside netlify backend')
        const {amount} = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
            description: 'Payment for order #1234',
        })
        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        }

    } catch (error) {
        console.log({error})

        return{
            status: 400,
            body: JSON.stringify({error})
        }
    }
}