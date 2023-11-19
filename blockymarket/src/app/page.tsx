import Image from 'next/image'
'use client';

export default function Home() {
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
      blockmarket
    </div>
    <div>
      <button type = "button" onClick={showNotification} >
         "Accept" 

        </button>
    </div>
  </main>

  )
}
