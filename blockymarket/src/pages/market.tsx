import Image from 'next/image'
'use client';
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
