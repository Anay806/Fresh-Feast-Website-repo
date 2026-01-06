import React, { useState } from "react";

const Loginpopup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login", formData);
     let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    console.log("signup", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
  };

  return (
    <div className="h-[400px ]   flex items-center justify-center bg-gray-100">
      <div className="bg-gray-300 my-20 w-[500px] rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">{state}</h2>
        <form onSubmit={signup} className="space-y-4">
          {state === "Signup" ? (
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder="Enter username"
                className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          ) : (
            <></>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="text"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={changeHandler}
              type="text"
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Continue
          </button>
          {state === "Signup" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setState("Login");
                }}
                className="text-orange-500 font-semibold cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create An Account{" "}
              <span
                onClick={() => {
                  setState("Signup");
                }}
                className="text-orange-500 font-semibold cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}

          <div className="flex gap-1 ">
            <input type="checkbox" className="cursor-pointer" />
            <p>By countinuing i agree to the terms of use & privacy policy</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpopup;
