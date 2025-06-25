// // // SSOlOGIN.JSX
// // import React from 'react'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { loginWithSSO } from '../../redux/slices/authSlices'
// // import ErrorMessage from '../ui/ErrorMessage'
// // import LoadingSpinner from '../ui/LoadingSpinner'

// // const SSOLogin = () => {
// //   const dispatch = useDispatch()
// //   const { isLoading, error } = useSelector(state => state.auth)

// //   const handleSSOLogin = (provider) => {
// //     dispatch(loginWithSSO(provider))
// //   }

// //   const ssoProviders = [
// //     {
// //       name: 'Google',
// //       icon: (
// //         <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
// //           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
// //           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
// //           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
// //           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
// //         </svg>
// //       ),
// //       bgColor: 'bg-white',
// //       textColor: 'text-gray-700',
// //       hoverColor: 'hover:bg-gray-50',
// //       borderColor: 'border-gray-300'
// //     },
// //     {
// //       name: 'Microsoft',
// //       icon: (
// //         <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
// //           <path fill="#f25022" d="M1 1h10v10H1z"/>
// //           <path fill="#00a4ef" d="M13 1h10v10H13z"/>
// //           <path fill="#7fba00" d="M1 13h10v10H1z"/>
// //           <path fill="#ffb900" d="M13 13h10v10H13z"/>
// //         </svg>
// //       ),
// //       bgColor: 'bg-white',
// //       textColor: 'text-gray-700',
// //       hoverColor: 'hover:bg-gray-50',
// //       borderColor: 'border-gray-300'
// //     },
// //     {
// //       name: 'Apple',
// //       icon: (
// //         <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
// //           <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
// //           <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
// //         </svg>
// //       ),
// //       bgColor: 'bg-black',
// //       textColor: 'text-white',
// //       hoverColor: 'hover:bg-gray-800',
// //       borderColor: 'border-black'
// //     },
// //     {
// //       name: 'GitHub',
// //       icon: (
// //         <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
// //           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
// //         </svg>
// //       ),
// //       bgColor: 'bg-gray-900',
// //       textColor: 'text-white',
// //       hoverColor: 'hover:bg-gray-800',
// //       borderColor: 'border-gray-900'
// //     },
// //     {
// //       name: 'LinkedIn',
// //       icon: (
// //         <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
// //           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
// //         </svg>
// //       ),
// //       bgColor: 'bg-blue-600',
// //       textColor: 'text-white',
// //       hoverColor: 'hover:bg-blue-700',
// //       borderColor: 'border-blue-600'
// //     }
// //   ]

// //   return (
// //     <div className="space-y-4">
// //       {/* Error Message */}
// //       {error && <ErrorMessage message={error} />}
      
// //       {/* SSO Provider Buttons */}
// //       {ssoProviders.map((provider) => (
// //         <button
// //           key={provider.name}
// //           onClick={() => handleSSOLogin(provider.name)}
// //           disabled={isLoading}
// //           className={`w-full flex items-center justify-center px-4 py-3 border ${provider.borderColor} rounded-xl shadow-sm ${provider.bgColor} ${provider.textColor} ${provider.hoverColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium`}
// //         >
// //           {isLoading ? (
// //             <LoadingSpinner size="small" color={provider.name === 'Google' || provider.name === 'Microsoft' ? 'gray' : 'white'} />
// //           ) : (
// //             <>
// //               {provider.icon}
// //               Continue with {provider.name}
// //             </>
// //           )}
// //         </button>
// //       ))}
      
// //       {/* Divider */}
// //       <div className="relative my-6">
// //         <div className="absolute inset-0 flex items-center">
// //           <div className="w-full border-t border-gray-300" />
// //         </div>
// //         <div className="relative flex justify-center text-sm">
// //           <span className="px-2 bg-white text-gray-500">Or continue with email</span>
// //         </div>
// //       </div>
      
// //       {/* Email Login Option */}
// //       <button
// //         onClick={() => {/* Add email login logic */}}
// //         disabled={isLoading}
// //         className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
// //       >
// //         <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //         </svg>
// //         Continue with Email
// //       </button>
      
// //       {/* Help Text */}
// //       <p className="mt-6 text-xs text-gray-500 text-center">
// //         Choose your preferred sign-in method. All methods are secure and encrypted.
// //       </p>
// //     </div>
// //   )
// // }

// // export default SSOLogin


// // import React from 'react'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { loginWithSSO } from '../../redux/slices/authSlices'
// // import ErrorMessage from '../ui/ErrorMessage'
// // import LoadingSpinner from '../ui/LoadingSpinner'

// // const SSOLogin = () => {
// //   const dispatch = useDispatch()
// //   const { isLoading, error } = useSelector(state => state.auth)

// //   const handleSSOLogin = (provider) => {
// //     dispatch(loginWithSSO(provider))
// //   }

// //   const ssoProviders = [
// //     {
// //       name: 'Google',
// //       description: 'Sign in with your Google account',
// //       icon: (
// //         <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
// //           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
// //           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
// //           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
// //           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
// //         </svg>
// //       ),
// //       color: '#4285F4',
// //       bgColor: '#ffffff',
// //       textColor: '#333'
// //     },

// //   ]

// //   return (
// //     <div style={{
// //       fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
// //       color: '#333'
// //     }}>
// //       {/* Header Section */}
// //       <div style={{
// //         textAlign: 'center',
// //         marginBottom: '32px'
// //       }}>
// //         <div style={{
// //           width: '48px',
// //           height: '48px',
// //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //           borderRadius: '50%',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           margin: '0 auto 16px',
// //           boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
// //         }}>
// //           <span style={{ fontSize: '20px' }}>🔐</span>
// //         </div>
// //         <h3 style={{
// //           fontSize: '20px',
// //           fontWeight: '500',
// //           color: '#333',
// //           margin: '0 0 8px 0'
// //         }}>
// //           Choose your sign-in method
// //         </h3>
// //         <p style={{
// //           fontSize: '14px',
// //           color: '#666',
// //           margin: '0',
// //           lineHeight: '1.5'
// //         }}>
// //           Select your preferred way to access your account
// //         </p>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div style={{ marginBottom: '24px' }}>
// //           <ErrorMessage message={error} />
// //         </div>
// //       )}
      
// //       {/* SSO Provider Buttons */}
// //       <div style={{ marginBottom: '24px' }}>
// //         {ssoProviders.map((provider, index) => (
// //           <button
// //             key={provider.name}
// //             onClick={() => handleSSOLogin(provider.name)}
// //             disabled={isLoading}
// //             style={{
// //               width: '100%',
// //               display: 'flex',
// //               alignItems: 'center',
// //               padding: '16px 20px',
// //               margin: index > 0 ? '12px 0 0 0' : '0',
// //               background: provider.bgColor,
// //               color: provider.textColor,
// //               border: `2px solid ${provider.name === 'Apple' ? '#000' : '#e0e0e0'}`,
// //               borderRadius: '12px',
// //               fontSize: '16px',
// //               fontWeight: '500',
// //               fontFamily: 'inherit',
// //               cursor: isLoading ? 'not-allowed' : 'pointer',
// //               transition: 'all 0.2s ease',
// //               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
// //               opacity: isLoading ? 0.7 : 1,
// //               outline: 'none',
// //               position: 'relative',
// //               overflow: 'hidden'
// //             }}
// //             onMouseOver={(e) => {
// //               if (!isLoading) {
// //                 e.target.style.transform = 'translateY(-2px)'
// //                 e.target.style.boxShadow = `0 4px 16px rgba(${provider.name === 'Google' ? '66, 133, 244' : provider.name === 'Microsoft' ? '0, 164, 239' : '0, 0, 0'}, 0.2)`
// //                 e.target.style.borderColor = provider.color
// //               }
// //             }}
// //             onMouseOut={(e) => {
// //               e.target.style.transform = 'translateY(0)'
// //               e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
// //               e.target.style.borderColor = provider.name === 'Apple' ? '#000' : '#e0e0e0'
// //             }}
// //             onFocus={(e) => {
// //               e.target.style.borderColor = provider.color
// //               e.target.style.boxShadow = `0 0 0 3px ${provider.color}20`
// //             }}
// //             onBlur={(e) => {
// //               e.target.style.borderColor = provider.name === 'Apple' ? '#000' : '#e0e0e0'
// //               e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
// //             }}
// //           >
// //             {/* Icon */}
// //             <div style={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               width: '32px',
// //               height: '32px',
// //               marginRight: '16px',
// //               borderRadius: '8px',
// //               background: provider.name === 'Apple' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
// //             }}>
// //               {isLoading ? (
// //                 <LoadingSpinner size="small" color={provider.textColor} />
// //               ) : (
// //                 provider.icon
// //               )}
// //             </div>
            
// //             {/* Content */}
// //             <div style={{
// //               flex: 1,
// //               textAlign: 'left'
// //             }}>
// //               <div style={{
// //                 fontSize: '16px',
// //                 fontWeight: '500',
// //                 marginBottom: '2px',
// //               }}>
// //                 Continue with {provider.name}
// //               </div>
// //               <div style={{
// //                 fontSize: '12px',
// //                 opacity: 0.7
// //               }}>
// //                 {/* {provider.description} */}
// //               </div>
// //             </div>

// //             {/* Arrow */}
// //             {!isLoading && (
// //               <div style={{
// //                 marginLeft: '12px',
// //                 opacity: 0.6,
// //                 transition: 'transform 0.2s ease'
// //               }}>
// //                 →
// //               </div>
// //             )}
// //           </button>
// //         ))}
// //       </div>
      
// //       {/* Divider */}
// //       <div style={{
// //         display: 'flex',
// //         alignItems: 'center',
// //         margin: '32px 0',
// //         gap: '16px'
// //       }}>
// //         <div style={{
// //           flex: 1,
// //           height: '1px',
// //           background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)'
// //         }}></div>
// //         <span style={{
// //           fontSize: '12px',
// //           color: '#999',
// //           fontWeight: '500',
// //           padding: '0 16px',
// //           background: 'white',
// //           whiteSpace: 'nowrap'
// //         }}>
// //           Or continue with email
// //         </span>
// //         <div style={{
// //           flex: 1,
// //           height: '1px',
// //           background: 'linear-gradient(to left, transparent, #e0e0e0, transparent)'
// //         }}></div>
// //       </div>
      
// //       {/* Email Login Option */}
// //       <button
// //         onClick={() => {/* Add email login logic */}}
// //         disabled={isLoading}
// //         style={{
// //           width: '100%',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           padding: '14px 20px',
// //           background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
// //           color: '#495057',
// //           border: '2px solid #dee2e6',
// //           borderRadius: '12px',
// //           fontSize: '15px',
// //           fontWeight: '500',
// //           fontFamily: 'inherit',
// //           cursor: isLoading ? 'not-allowed' : 'pointer',
// //           transition: 'all 0.2s ease',
// //           boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
// //           opacity: isLoading ? 0.7 : 1,
// //           outline: 'none'
// //         }}
// //         onMouseOver={(e) => {
// //           if (!isLoading) {
// //             e.target.style.background = 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)'
// //             e.target.style.transform = 'translateY(-1px)'
// //             e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
// //           }
// //         }}
// //         onMouseOut={(e) => {
// //           e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
// //           e.target.style.transform = 'translateY(0)'
// //           e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'
// //         }}
// //       >
// //         <svg style={{ width: '20px', height: '20px', marginRight: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //         </svg>
// //         <span>Continue with Email</span>
// //       </button>
      
// //       {/* Security & Trust Section */}
// //       <div style={{
// //         marginTop: '32px',
// //         padding: '20px',
// //         background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
// //         borderRadius: '12px',
// //         border: '1px solid #e3f2fd'
// //       }}>
// //         <div style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           marginBottom: '12px'
// //         }}>
// //           <div style={{
// //             width: '32px',
// //             height: '32px',
// //             background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
// //             borderRadius: '50%',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             marginRight: '12px'
// //           }}>
// //             <span style={{ color: 'white', fontSize: '16px' }}>🛡️</span>
// //           </div>
// //           <h4 style={{
// //             fontSize: '16px',
// //             fontWeight: '500',
// //             color: '#333',
// //             margin: '0'
// //           }}>
// //             Secure Authentication
// //           </h4>
// //         </div>
// //         <p style={{
// //           fontSize: '14px',
// //           color: '#666',
// //           margin: '0 0 16px 0',
// //           lineHeight: '1.5'
// //         }}>
// //           Your data is protected with enterprise-grade security. We never store your social media passwords.
// //         </p>
        
// //         {/* Security Features */}
// //         <div style={{
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
// //           gap: '12px'
// //         }}>
// //           {[
// //             { icon: '🔒', text: '256-bit SSL', color: '#4caf50' },
// //             { icon: '🛡️', text: 'OAuth 2.0', color: '#2196f3' },
// //             { icon: '✅', text: 'GDPR Ready', color: '#ff9800' },
// //             { icon: '🚀', text: 'Fast Login', color: '#9c27b0' }
// //           ].map((feature, index) => (
// //             <div key={index} style={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               padding: '8px 12px',
// //               background: 'rgba(255, 255, 255, 0.8)',
// //               borderRadius: '8px',
// //               border: `1px solid ${feature.color}20`
// //             }}>
// //               <span style={{ marginRight: '6px', fontSize: '14px' }}>{feature.icon}</span>
// //               <span style={{
// //                 fontSize: '12px',
// //                 fontWeight: '500',
// //                 color: feature.color
// //               }}>
// //                 {feature.text}
// //               </span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Help Text */}
// //       <p style={{
// //         marginTop: '24px',
// //         fontSize: '12px',
// //         color: '#999',
// //         textAlign: 'center',
// //         lineHeight: '1.5'
// //       }}>
// //         🔐 All sign-in methods are secure and encrypted<br />
// //         📱 Choose the one that's most convenient for you
// //       </p>
// //     </div>
// //   )
// // }

// // export default SSOLogin


// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { loginWithSSO } from '../../redux/slices/authSlices'
// import ErrorMessage from '../ui/ErrorMessage'
// import LoadingSpinner from '../ui/LoadingSpinner'

// const SSOLogin = () => {
//   const dispatch = useDispatch()
//   const { isLoading, error } = useSelector(state => state.auth)

//   const handleSSOLogin = (provider) => {
//     dispatch(loginWithSSO(provider))
//   }

//   const ssoProviders = [
//     {
//       name: 'Google',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24">
//           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//         </svg>
//       )
//     },
//     {
//       name: 'Microsoft',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24">
//           <path fill="#00BCF2" d="M0 0h11.377v11.372H0z"/>
//           <path fill="#00BCF2" d="M12.623 0H24v11.372H12.623z"/>
//           <path fill="#00BCF2" d="M0 12.623h11.377V24H0z"/>
//           <path fill="#00BCF2" d="M12.623 12.623H24V24H12.623z"/>
//         </svg>
//       )
//     },
//     {
//       name: 'Apple',
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
//         </svg>
//       )
//     }
//   ]

//   return (
//     <div style={{
//       maxWidth: '400px',
//       margin: '0 auto',
//       padding: '2rem',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     }}>
//       {/* Simple Header */}
//       <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//         <h2 style={{
//           fontSize: '1.5rem',
//           fontWeight: '600',
//           color: '#1a1a1a',
//           margin: '0 0 0.5rem 0'
//         }}>
//           Sign in to your account
//         </h2>
//         <p style={{
//           fontSize: '0.9rem',
//           color: '#666',
//           margin: '0'
//         }}>
//           Choose your preferred sign-in method
//         </p>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div style={{ marginBottom: '1.5rem' }}>
//           <ErrorMessage message={error} />
//         </div>
//       )}
      
//       {/* Clean SSO Buttons */}
//       <div style={{ marginBottom: '1.5rem' }}>
//         {ssoProviders.map((provider, index) => (
//           <button
//             key={provider.name}
//             onClick={() => handleSSOLogin(provider.name)}
//             disabled={isLoading}
//             style={{
//               width: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: '0.75rem',
//               padding: '0.875rem 1rem',
//               marginBottom: index < ssoProviders.length - 1 ? '0.75rem' : '0',
//               background: '#fff',
//               color: '#374151',
//               border: '1px solid #d1d5db',
//               borderRadius: '0.5rem',
//               fontSize: '0.95rem',
//               fontWeight: '500',
//               fontFamily: 'inherit',
//               cursor: isLoading ? 'not-allowed' : 'pointer',
//               transition: 'all 0.15s ease',
//               opacity: isLoading ? 0.6 : 1,
//               outline: 'none'
//             }}
//             onMouseEnter={(e) => {
//               if (!isLoading) {
//                 e.target.style.backgroundColor = '#f9fafb'
//                 e.target.style.borderColor = '#9ca3af'
//               }
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#fff'
//               e.target.style.borderColor = '#d1d5db'
//             }}
//             onFocus={(e) => {
//               e.target.style.borderColor = '#3b82f6'
//               e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
//             }}
//             onBlur={(e) => {
//               e.target.style.borderColor = '#d1d5db'
//               e.target.style.boxShadow = 'none'
//             }}
//           >
//             {isLoading ? (
//               <LoadingSpinner size="small" />
//             ) : (
//               provider.icon
//             )}
//             <span>Continue with {provider.name}</span>
//           </button>
//         ))}
//       </div>
      
//       {/* Clean Divider */}
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         margin: '1.5rem 0',
//         gap: '1rem'
//       }}>
//         <div style={{
//           flex: 1,
//           height: '1px',
//           backgroundColor: '#e5e7eb'
//         }}></div>
//         <span style={{
//           fontSize: '0.85rem',
//           color: '#6b7280',
//           fontWeight: '500'
//         }}>
//           or
//         </span>
//         <div style={{
//           flex: 1,
//           height: '1px',
//           backgroundColor: '#e5e7eb'
//         }}></div>
//       </div>
      
//       {/* Email Login Button */}
//       <button
//         onClick={() => {/* Add email login logic */}}
//         disabled={isLoading}
//         style={{
//           width: '100%',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '0.75rem',
//           padding: '0.875rem 1rem',
//           background: '#fff',
//           color: '#374151',
//           border: '1px solid #d1d5db',
//           borderRadius: '0.5rem',
//           fontSize: '0.95rem',
//           fontWeight: '500',
//           fontFamily: 'inherit',
//           cursor: isLoading ? 'not-allowed' : 'pointer',
//           transition: 'all 0.15s ease',
//           opacity: isLoading ? 0.6 : 1,
//           outline: 'none'
//         }}
//         onMouseEnter={(e) => {
//           if (!isLoading) {
//             e.target.style.backgroundColor = '#f9fafb'
//             e.target.style.borderColor = '#9ca3af'
//           }
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = '#fff'
//           e.target.style.borderColor = '#d1d5db'
//         }}
//         onFocus={(e) => {
//           e.target.style.borderColor = '#3b82f6'
//           e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
//         }}
//         onBlur={(e) => {
//           e.target.style.borderColor = '#d1d5db'
//           e.target.style.boxShadow = 'none'
//         }}
//       >
//         <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         </svg>
//         <span>Continue with Email</span>
//       </button>
      
//       {/* Simple Security Note */}
//       <div style={{
//         marginTop: '2rem',
//         padding: '1rem',
//         backgroundColor: '#f8fafc',
//         borderRadius: '0.5rem',
//         border: '1px solid #e2e8f0'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '0.5rem',
//           marginBottom: '0.5rem'
//         }}>
//           <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#10b981' }}>
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//           </svg>
//           <span style={{
//             fontSize: '0.875rem',
//             fontWeight: '500',
//             color: '#374151'
//           }}>
//             Secure & Private
//           </span>
//         </div>
//         <p style={{
//           fontSize: '0.8rem',
//           color: '#6b7280',
//           margin: '0',
//           lineHeight: '1.4'
//         }}>
//           Your login is protected with industry-standard security. We never store your social media passwords.
//         </p>
//       </div>
//     </div>
//   )
// }

// export default SSOLogin