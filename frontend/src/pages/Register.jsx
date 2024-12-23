import { useState } from "react";
import {useNavigate} from "react-router-dom";

import  {useAuth} from "../store/Auth"

const URL = "http://localhost:4000/api/v1/register";

 const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
 const navigate = useNavigate("/login");

 const {storeTokenInLS} = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), // Convert user data to JSON
        });
        if(response.ok){

          const res_data = await response.json();
          console.log("res_data from server " ,res_data)
          // store token in local host 
          storeTokenInLS(res_data.token);
          // localStorage.setItem("token" , res_data);

          setUser({username : "" , email : "" , phone : "" , password : ""});
          navigate("/login")
        }
        console.log(response);

      } catch (error) {
        console.log("register" , error)
      }
  };

  return (
    <>
      <section className="bg-slate-600  flex justify-center items-center h-screen ">
        <main className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image section */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="./register.png"
                alt="a nurse with a cute look"
                className="w-64 h-auto"
              />
            </div>

            {/* Registration Form */}
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
                Registration Form
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="UserName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700">
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;