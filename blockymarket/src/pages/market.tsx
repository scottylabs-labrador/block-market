import { useState } from 'react';

import Image from 'next/image'
import client from 'braintree-web/client';
import * as braintree from 'braintree-web';
import Link from 'next/link';
import { useRouter } from "next/router";

const orders = [
      {price:5.5, quantity: 3},
      {price:6.0, quantity:2},
      {price:7.5, quantity:4},
  ];
const OrderList = () => {
  return (
    <div style={orderListStyle}>
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li style={orderItemStyle}>
            <p>Price: ${order.price}</p>
            <p>Quantity: {order.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const orderListStyle = {
  marginTop: '10px',
  padding: '280px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const orderItemStyle = {
  borderBottom: '1px solid #ddd',
  padding: '10px',
};

export default function Home() {
  const numberOfSellOrders = 5;
  const router = useRouter()

  const showNotification = () => {
    // Check if the browser supports notifications
    if ('Notification' in window) {
      // Request permission to show notifications
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          // Create a notification
          var notification = new Notification('Hello!', {
            body: 'This is a notification from your button click.',
            icon: 'next.svg', // Replace this with the path to your own icon
          });

          // Automatically close the notification after a few seconds (optional)
          setTimeout(function () {
            notification.close();
          }, 5000);
        }
      });
    }
  };
  return (
    <main>
    <VenmoButton />
    <div>
      <h1>Welcome to the Order Page</h1>
      <Link href= "/seller"> 
      <button>
      <h2> View Sellers </h2>
      </button>
      </Link>
      Number of sell orders = {numberOfSellOrders}
      <OrderList />
      </div>
    <div>
      <button type = "button" onClick={showNotification} >
         Accept Order! 
        </button>
    </div>
  </main>

  )
}

function VenmoButton () {
  let appVenmoInstance: braintree.Venmo | null = null;
  let appClientInstance: braintree.Client | null = null;

  // Create a client.
  braintree.client.create({
    authorization: "sandbox_5rfwqnbv_2264yv3cxmxzr866"	
  }, function (clientErr, clientInstance) {
    // Stop if there was a problem creating the client.
    // This could happen if there is a network error or if the authorization
    // is invalid.
    if (clientErr) {
      console.error('Error creating client:', clientErr);
      return;
    }

    // set clientInstance for later use
    appClientInstance = clientInstance

    braintree.dataCollector.create({
        client: clientInstance,
        paypal: true
      }, function (dataCollectorErr, dataCollectorInstance) {
        if (dataCollectorErr) {
        // Handle error in creation of data collector.
        return;
      }

      // At this point, you should access the deviceData value and provide it
      // to your server, e.g. by injecting it into your form as a hidden input.
      console.log('Got device data:', dataCollectorInstance?.deviceData);
    });

    braintree.venmo.create({
        client: clientInstance,
        allowDesktop: true,
        paymentMethodUsage: 'multi_use', // available in v3.77.0+
        // Add allowNewBrowserTab: false if your checkout page does not support
        // relaunching in a new tab when returning from the Venmo app. This can
        // be omitted otherwise.
        // allowNewBrowserTab: false
      }, function (venmoErr, venmoInstance) {
        if (venmoErr) {
          console.error('Error creating Venmo:', venmoErr);
          return;
        }
      
        // Verify browser support before proceeding.
        if (!venmoInstance?.isBrowserSupported()) {
          console.log('Browser does not support Venmo');
          return;
        }
    
        // TODO: Change this logic
        appVenmoInstance = venmoInstance;

        // Check if tokenization results already exist. This occurs when your
        // checkout page is relaunched in a new tab. This step can be omitted
        // if allowNewBrowserTab is false.
        if (venmoInstance.hasTokenizationResult()) {
          venmoInstance.tokenize().then(function (payload) {
              handleVenmoSuccess(payload);
            }
          ).catch(function (err) {
            handleVenmoError(err);
          });

          return;
        }
    });
  });

  function handleVenmoButtonClick (e: React.MouseEvent<HTMLElement>) {
    if (appVenmoInstance === null) {
      return
    }
    (e.target as HTMLButtonElement).disabled = true
  
    appVenmoInstance.tokenize().then(function (payload) {
      (e.target as HTMLButtonElement).disabled = false;
      handleVenmoSuccess(payload);
    }).catch(function (err) {
      handleVenmoError(err);
    });
  }

  function makeVenmoPayment (e: React.MouseEvent<HTMLElement>) {
    if (appVenmoInstance === null || appClientInstance === null) {
      return
    }


    /*
    braintree.venmo.create({
      client: appClientInstance,
      paymentMethodUsage: 'multi_use',
      totalAmount: '10.00',
      subTotalAmount: '8.00',
      taxAmount: '1.00',
      discountAmount: '1.00',
      shippingAmount: '2.00',
      lineItems: [
        {
          name; 'item-name',
          quantity: 2,
          unitAmount: '5.00',
          type: 'DEBIT'
        },
        {
          name; 'credited-item-name',
          quantity: 1,
          unitAmount: '2.00',
          type: 'CREDIT'
        }
      ]
    }, function (venmoErr, venmoInstance) {
      // ...
    });
    */
  }
      
  function handleVenmoError(err: any) {
    if (err.code === 'VENMO_CANCELED') {
      console.log('App is not available or user aborted payment flow');
    } else if (err.code === 'VENMO_APP_CANCELED') {
      console.log('User canceled payment flow');
    } else {
      console.error('An error occurred:', err.message);
    }
  }
      
  function handleVenmoSuccess(payload: any) {
    // Send the payment method nonce to your server, e.g. by injecting
    // it into your form as a hidden input.
    console.log('Got a payment method nonce:', payload.nonce);
    // Display the Venmo username in your checkout UI.
    console.log('Venmo user:', payload.details.username);
  }

  return (
    <div>
      <button disabled={false} className={`display-${appVenmoInstance === null ? "none" : "block"}`} onClick={handleVenmoButtonClick}>
        Enable Venmo
      </button>

      <button disabled={true} onClick={makeVenmoPayment}>
        Make Venmo Payment
      </button>
    </div>
  )
  }