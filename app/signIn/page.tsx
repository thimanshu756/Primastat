
// "use client"
// import {authenticateSSOUser, authenticateUser} from '@/services/authService';
// import { signIn, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import React, { FC, useEffect, useState } from 'react'
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { AuthToken, RefreshToken } from '@/app/recoilContextProvider';
// import './signIn.css'
// import ShineBorder from '@/components/magicui/shine-border';
// import Link from 'next/link';
// import Image from 'next/image';
// import googleImg from "@/public/google.svg"
// import { LinearProgress } from '@mui/material';
// import { ScaleLoader } from 'react-spinners';
// const page = () => {
//   const setAuthToken = useSetRecoilState(AuthToken);
//   const setRefreshToken = useSetRecoilState(RefreshToken);
//   const [password,setPassword]=useState<string>();
//   const [loadingg,setLoadingg]=useState<boolean>(false);
//   const { data: session, status } = useSession();
//   console.log("session isss -->",session);

//   const router = useRouter();
//   const authToken =useRecoilValue(AuthToken);
//   const [loading,setLoading]=useState(true);
//   useEffect(() => {
//     setLoading(true);
//     // Redirect to login page if no authToken
//     if (authToken || authToken != 'null') {
//       router.push('/dashboard'); // Adjust the path as necessary
//       setLoading(false);
//     } 
// },[authToken, router])
//   useEffect(() => {
//     if (session) {
//       console.log('Access Token:', session.accessToken);
//       console.log("session is -->",session);
//       const { user } = session;
//       const UID = session.UID;
//       console.log("UID ->>",UID);
//       const ssoData = {
//         displayName: user.name,
//         email: user.email,
//         refreshToken: 'string', // Replace with actual refresh token if necessary
//         uid: UID, // Or another unique identifier
//       };
//       setLoadingg(true);
//       authenticateSSOUser(ssoData,setAuthToken,setRefreshToken)
//         .then(data => {
//           console.log('SSO Auth Response:', data);
//           router.push('/dashboard');
//           setLoadingg(false)
//         })
//         .catch(error => {
//           console.error('SSO Auth Error: ', error);
//           setLoadingg(false)
//      });
//     }
//   }, [session]);
//     const [email,setEmail]=useState<string>();
//     const handleSubmit= async(e:any)=>{
//             e.preventDefault();
//             setLoadingg(true);
//             const payload ={
//                 username:email,
//                 password:password
//               }
//               try {
//                 const success = await authenticateUser(payload ,setAuthToken,setRefreshToken);
//                 if (success) {
//                   router.push('/dashboard');
//                   setLoadingg(false);
//                 }
//               } catch (error) {
//                 console.error('Authentication error: ', error);
//                 alert('Failed to login');
//                 setLoadingg(false);
//               }
//     }
//    const handleOauth=async(e:any)=>{
//   setLoadingg(true)
//     e.preventDefault();
//    await signIn('google')
//    setLoadingg(false);
//     }

//     return (
//         <>
//         {
//           loading ?(<div className='flex items-center justify-center h-[1000px] w-full '>
//             <ScaleLoader />
//             </div>):(
//             <div>
      
//             {loadingg && (
//              <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center z-10">
//                  <LinearProgress className="w-full" />
//              </div>
//          )}
// <div className=' containerr h-[100vh] flex flex-col items-center justify-center'>
// <p className=' text-center text-white text-3xl mt-[150px]'>Login to your account</p>
// <ShineBorder
//  className="bg-black bg-opacity-50 w-[350px] h-[500px] mx-auto my-auto flex items-center overflow-hidden rounded-3xl bg-background md:shadow-xl"
//  color={["#B71FFF", "#8636FF00", "#4952FF"]}
// >
//  <form 
//    className="bg-black bg-opacity-50 w-full h-full p-4 text-white space-y-6 mx-auto flex flex-col justify-center items-center rounded-3xl" 
//    onSubmit={handleSubmit}
//  >
//    <div className='flex flex-col'>
//      <label htmlFor="email">Email</label>
//      <input 
//        type="text" 
//        className='bg-white bg-opacity-10 border border-slate-500 w-[250px] rounded-3xl p-2' 
//        name='email' 
//        placeholder='email' 
//        onChange={(e)=>setEmail(e.target.value)}
//      />
//    </div>
//    <div className='flex flex-col'>
//      <label htmlFor="password">Password</label>
//      <input 
//        type="password"  
//        className='bg-white bg-opacity-10 border border-slate-500 w-[250px] rounded-3xl p-2'  
//        name='password' 
//        placeholder='password' 
//        onChange={(e)=>setPassword(e.target.value)}  
//      />
//    </div>
//    <button 
//      type='submit' 
//      className='bg-gradient-to-r from-[#B71FFF] to-[#4952FF] p-2 w-[250px] rounded-3xl text-white'
//    >
//      {loadingg ? "loading..." : "Login"}
//    </button>
//    <Link href='/' className='text-slate-300 underline'>
//      Forgot Your Password?
//    </Link>
   
//    {/* Separator */}
//    <div className="flex items-center w-full my-4">
//      <hr className="w-full border-t border-gray-300" />
//      <span className="px-2 text-gray-400">or</span>
//      <hr className="w-full border-t border-gray-300" />
//    </div>
   
//    <button 
//      onClick={handleOauth} 
//      className='flex items-center justify-center bg-white bg-opacity-10 border border-slate-500 p-2 w-[250px] rounded-3xl text-white space-x-2'
//    >
//      <Image 
//        src={googleImg}
//        alt="Google Logo" 
//        width={30} 
//        height={30} 
//      />
//      <span>Sign in with Google</span>
//    </button>
//  </form>
// </ShineBorder>
// </div>
//       </div>
//           )
//         }
        
//         </>
    
   
//     );
// }


// export default page

"use client";
import { authenticateSSOUser, authenticateUser } from "@/services/authService";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AuthToken, RefreshToken } from "@/app/recoilContextProvider";
import "./signIn.css";
import ShineBorder from "@/components/magicui/shine-border";
import Link from "next/link";
import Image from "next/image";
import googleImg from "@/public/google.svg";
import { LinearProgress } from "@mui/material";
import { ScaleLoader } from "react-spinners";

const Page = () => {
  const setAuthToken = useSetRecoilState(AuthToken);
  const setRefreshToken = useSetRecoilState(RefreshToken);
  const [password, setPassword] = useState<string>();
  const [loadingg, setLoadingg] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const authToken = useRecoilValue(AuthToken);
  const [loading, setLoading] = useState(true);

  // Optimize the useEffect for handling authToken check
  useEffect(() => {
    if (authToken && authToken !== "null") {
      router.push("/dashboard"); // Redirect if authToken is valid
    } else {
      setLoading(false); // Stop loading if no authToken
    }
  }, [authToken, router]);

  // Optimize session handling
  useEffect(() => {
    if (session?.accessToken) {
      const { user, UID } = session;
      const ssoData = {
        displayName: user.name,
        email: user.email,
        refreshToken: "string", // Replace with actual refresh token if necessary
        uid: UID, // Or another unique identifier
      };
      setLoadingg(true);
      authenticateSSOUser(ssoData, setAuthToken, setRefreshToken)
        .then(() => {
          router.push("/dashboard");
        })
        .catch((error) => {
          console.error("SSO Auth Error: ", error);
        })
        .finally(() => setLoadingg(false)); // Ensure loading state is reset
    }
  }, [session, setAuthToken, setRefreshToken, router]);

  const [email, setEmail] = useState<string>();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingg(true);
    const payload = {
      username: email,
      password: password,
    };
    try {
      const success = await authenticateUser(payload, setAuthToken, setRefreshToken);
      if (success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Authentication error: ", error);
      alert("Failed to login");
    } finally {
      setLoadingg(false); // Ensure loading state is reset
    }
  };

  const handleOauth = async (e: any) => {
    e.preventDefault();
    setLoadingg(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("OAuth sign-in error: ", error);
    } finally {
      setLoadingg(false); // Ensure loading state is reset
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[1000px] w-full">
          <ScaleLoader />
        </div>
      ) : (
        <div>
          {loadingg && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center z-10">
              <LinearProgress className="w-full" />
            </div>
          )}
          <div className="containerr h-[100vh] flex flex-col items-center justify-center">
            <p className="text-center text-white text-3xl sm:mt-[150px]">Login to your account</p>
            <ShineBorder
              className="bg-black bg-opacity-50 sm:w-[350px] h-[500px] mx-auto my-auto flex items-center overflow-hidden rounded-3xl bg-background md:shadow-xl"
              color={["#B71FFF", "#8636FF00", "#4952FF"]}
            >
              <form
                className="bg-black bg-opacity-50 w-full h-full p-4 text-white space-y-6 mx-auto flex flex-col justify-center items-center rounded-3xl"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="bg-white bg-opacity-10 border border-slate-500 w-[250px] rounded-3xl p-2"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="bg-white bg-opacity-10 border border-slate-500 w-[250px] rounded-3xl p-2"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#B71FFF] to-[#4952FF] p-2 w-[250px] rounded-3xl text-white"
                >
                  {loadingg ? "loading..." : "Login"}
                </button>
                <Link href="/" className="text-slate-300 underline">
                  Forgot Your Password?
                </Link>

                {/* Separator */}
                <div className="flex items-center w-full my-4">
                  <hr className="w-full border-t border-gray-300" />
                  <span className="px-2 text-gray-400">or</span>
                  <hr className="w-full border-t border-gray-300" />
                </div>

                <button
                  onClick={handleOauth}
                  className="flex items-center justify-center bg-white bg-opacity-10 border border-slate-500 p-2 w-[250px] rounded-3xl text-white space-x-2"
                >
                  <Image src={googleImg} alt="Google Logo" width={30} height={30} />
                  <span>Sign in with Google</span>
                </button>
              </form>
            </ShineBorder>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;



  
