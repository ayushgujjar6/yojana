// import React from 'react';
// import { useState } from 'react';
// import { UNSAFE_getPatchRoutesOnNavigationFunction, useNavigate } from 'react-router-dom';
// import Login from './Login';

// export default function Register() {

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [mobileno, setMobileno] = useState('');

//     const navigate = useNavigate();

//     const handleRegister = async(e) => {

//         e.preventDefault();
        
//         const response = await fetch('http://localhost:5000/api/register', {

//             method : 'POST',
//             headers :{'Content-Type' : 'application/json'},
//             body : JSON.stringify({name,email,password,mobileno})
//         });

//         const data = await response.json();
//         if(response.ok){
//             navigate.
//             alert("Regester Successfully !");
//         }else{
//             alert(data.error);
//         }
//     }
//   return (
//     <section className="h-screen flex items-center justify-center bg-white">
//       <div className="bg-blue-500 p-8 rounded-xl shadow-md w-full max-w-md ">
//         <h2 className="text-2xl  mb-6 text-center text-white font-bold">New User Rgister</h2>
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//           <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">
//             User Name
//             </label>
//             <input
//               type="name"
//               id="name"
//               className="w-full px-4 py-2 border bg-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 "
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">
//             Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-2 border bg-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 "
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">
//             Mobile Number
//             </label>
//             <input
//               type="mobileno"
//               id="mobileno"
//               className="w-full px-4 py-2 border bg-white rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 "
//               value={mobileno}
//               onChange={(e) => setMobileno(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2 text-white " htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="remember-me"
//                 className="h-4 w-4 text-white focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 text-sm text-white">
//                 Remember me
//               </label>
//             </div>
//             <a onClick= {() => navigate("/login")} className="text-sm text-white hover:underline">
//               Already Register
//             </a>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-white hover:font-bold hover:text-blue-500 transition duration-200"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </section>

//   )
// }



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileno, setMobileno] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, mobileno })
            });

            const data = await response.json();
            
            if (response.ok) {
                alert("Registered Successfully!");
                navigate("/login"); // ✅ Corrected Navigation
            } else {
                alert(data.error);
            }
        } catch (error) {
            alert("Failed to connect to server. Please try again later.");
            console.error("Register Error:", error);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center bg-white">
            <div className="bg-blue-500 p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl mb-6 text-center text-black font-bold">New User Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-black">User Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-black">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-black">Mobile Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-black">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                        <a onClick={() => navigate("/login")} className="text-sm text-black hover:underline cursor-pointer">
                            Already Registered? Login
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-black py-2 rounded-md hover:bg-white hover:font-bold hover:text-blue-500 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </section>
    );
}

