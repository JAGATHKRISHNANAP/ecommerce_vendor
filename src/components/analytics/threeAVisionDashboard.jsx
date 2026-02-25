// // import React, { useState, useEffect, useCallback } from 'react';

// // const VisionDashboard = () => {
// //   const [iframeSrc, setIframeSrc] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Configuration Constants
// //   const SECRET_KEY = "4608545fc18c8ed7ef90cb3838c014bb5362b73bfa14f9d539651b8d08470e2a";
// //   const EMPLOYEE_EMAIL = "raree@gmail.com";

// //   const autoLogin = useCallback(async () => {
// //     try {
// //       setLoading(true);

// //       const response = await fetch("http://localhost:5000/api/third-party-login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           secret_key: SECRET_KEY,
// //           email: EMPLOYEE_EMAIL
// //         })
// //       });

// //       const data = await response.json();

// //       if (response.ok && data.status === "success") {
// //         const userParam = encodeURIComponent(JSON.stringify(data.user || {}));
// //         const ssoUrl = `http://localhost:3000/sso-auth?token=${data.access_token}&user=${userParam}&redirect=/dashboard_view`;

// //         setIframeSrc(ssoUrl);
// //       } else {
// //         setError(data.error || "Login Failed");
// //       }
// //     } catch (err) {
// //       console.error("Network Error:", err);
// //       setError("Could not connect to 3Avision servers.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   // Run the login logic immediately on page load
// //   useEffect(() => {
// //     autoLogin();
// //   }, [autoLogin]);

// //   return (
// //     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
// //       {/* <h2>3Avision Dashboard</h2>
// //       <hr /> */}

// //       {/* Show Loading Spinner or Text */}
// //       {loading && (
// //         <div style={{ textAlign: 'center', padding: '50px' }}>
// //           <p>Authenticating with 3Avision... Please wait.</p>
// //         </div>
// //       )}

// //       {/* Show Error Message if it fails */}
// //       {error && (
// //         <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
// //           <strong>Error:</strong> {error}
// //           <button onClick={autoLogin} style={{ marginLeft: '10px' }}>Retry</button>
// //         </div>
// //       )}

// //       {/* Render Iframe only when we have the URL */}
// //       {!loading && iframeSrc && (
// //         <iframe
// //           id="vision-container"
// //           title="3Avision Dashboard"
// //           src={iframeSrc}
// //           frameBorder="0"
// //           allowFullScreen
// //           style={{
// //             marginTop: '20px',
// //             width: '100%',
// //             height: '800px',
// //             border: '1px solid #ccc',
// //             borderRadius: '8px'
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default VisionDashboard;



// import React, { useState, useEffect, useCallback } from 'react';

// const VisionDashboard = () => {
//   const [iframeSrc, setIframeSrc] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const SECRET_KEY = "4608545fc18c8ed7ef90cb3838c014bb5362b73bfa14f9d539651b8d08470e2a";

//   const autoLogin = useCallback(async () => {
//     try {
//       setLoading(true);

//       // 1. Get the user object from Local Storage
//       const storedUser = localStorage.getItem('user');

//       if (!storedUser) {
//         throw new Error("No user found in local storage. Please log in first.");
//       }

//       // 2. Parse the JSON string into an object
//       const userObj = JSON.parse(storedUser);

//       // 3. Extract the email (based on your screenshot)
//       const employeeEmail = userObj.email;

//       if (!employeeEmail) {
//         throw new Error("User object found, but it does not contain an email.");
//       }

//       // 4. Proceed with the API call
//       const response = await fetch("http://localhost:5000/api/third-party-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           secret_key: SECRET_KEY,
//           email: employeeEmail // Dynamic email from storage
//         })
//       });

//       const data = await response.json();

//       if (response.ok && data.status === "success") {
//         const userParam = encodeURIComponent(JSON.stringify(data.user || {}));
//         const ssoUrl = `http://localhost:3000/sso-auth?token=${data.access_token}&user=${userParam}&redirect=/dashboard_view`;

//         setIframeSrc(ssoUrl);
//       } else {
//         setError(data.error || "Login Failed");
//       }
//     } catch (err) {
//       console.error("Authentication Error:", err);
//       setError(err.message || "Could not connect to 3Avision servers.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     autoLogin();
//   }, [autoLogin]);

//   return (
//     <div style={{ padding: '5px' }}>
//       {loading && <p>Syncing session... Please wait.</p>}

//       {error && (
//         <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
//           <strong>Sync Error:</strong> {error}
//         </div>
//       )}

//       {!loading && iframeSrc && (
//         <iframe
//           title="3Avision Dashboard"
//           src={iframeSrc}
//           frameBorder="0"
//           allowFullScreen
//           style={{
//             width: '100%',
//             height: '800px',
//             border: '1px solid #ccc',
//             marginTop: '20px'
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default VisionDashboard;


import React, { useState, useEffect, useCallback } from 'react';

const VisionDashboard = () => {
  const [iframeSrc, setIframeSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const autoLogin = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Get user from local storage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error("Please log in first.");

      const { email } = JSON.parse(storedUser);

      // 2. Call YOUR OWN backend endpoint (e.g., /api/get-vison-url)
      // Your backend will attach the SECRET_KEY and call 3Avision
      const response = await fetch("http://localhost:8000/api/analytics/get-vison-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.ssoUrl) {
        setIframeSrc(data.ssoUrl);
      } else {
        setError(data.error || "Failed to generate dashboard link.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { autoLogin(); }, [autoLogin]);

  return (
    <div style={{ padding: '5px' }}>
      {loading && <p>Loading Dashboard...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && iframeSrc && (
        <iframe
          title="3Avision Dashboard"
          src={iframeSrc}
          frameBorder="0"
          allowFullScreen
          style={{ width: '100%', height: '800px', border: 'none' }}
        />
      )}
    </div>
  );
};

export default VisionDashboard;