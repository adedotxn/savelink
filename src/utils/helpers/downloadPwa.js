   
// useEffect(() => {
//         window.addEventListener("beforeinstallprompt", (e) => {
//         // Prevent the mini-infobar from appearing on mobile
//         e.preventDefault();
//         // Stash the event so it can be triggered later.
//         deferredPrompt = e;
//         // Update UI notify the user they can install the PWA
//         });
//         console.log("effect", deferredPrompt)

//         window.addEventListener('appinstalled', () => {
//         // Log install to analytics
//         console.log('INSTALL: Success');
//         });
//     }, []);

//   const handleInstallClick = async (e) => {
//       // Hide the app provided install promotion
//       // Show the install prompt

//       if(deferredPrompt) {
//        await deferredPrompt.prompt();
//       }
//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the install prompt');
//         } else {
//           console.log('User dismissed the install prompt');
//         }
//       })
//     // }
//   };