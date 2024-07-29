import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const passwordref = useRef();
  const [passwordArray, setpasswordArray] = useState([]);
  const [form, setForm] = useState({ site: "", username: "", password: "", id: "" });
  const ref = useRef();

  // Fetch passwords from the server
  const getPasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      if (!req.ok) throw new Error("Network response was not ok");
      let passwords = await req.json();
      setpasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      toast("Failed to fetch passwords", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Toggle password visibility
  const showpassword = () => {
    if (passwordref.current.type === "password") {
      passwordref.current.type = "text";
      ref.current.src = "/externalcontent/eyecross.png";
    } else {
      passwordref.current.type = "password";
      ref.current.src = "/externalcontent/eye.png";
    }
  };

  // Copy text to clipboard and show toast
  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  // Save or update a password
  const savepassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      try {
        if (form.id) {
          // Delete existing password
          await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: form.id }),
          });

          // Save updated password
          const updatedPassword = { ...form, id: uuidv4() };

          await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPassword),
          });

          setpasswordArray(passwordArray.map(p => p.id === form.id ? updatedPassword : p));
          toast("Password Updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Save new password
          const newPassword = { ...form, id: uuidv4() };

          await fetch("http://localhost:3000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassword),
          });

          setpasswordArray([...passwordArray, newPassword]);
          toast("Password Saved!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

        // Reset form
        setForm({ site: "", username: "", password: "", id: "" });
      } catch (error) {
        console.error("Error saving password:", error);
        toast("Failed to save password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast("Error: Please fill in all fields correctly!");
    }
  };

  // Delete a password by id
  const deletepassword = async (id) => {
    if (window.confirm("Do you want to delete the password!")) {
      try {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        setpasswordArray(passwordArray.filter(item => item.id !== id));
        toast("Password Deleted Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("Error deleting password:", error);
        toast("Failed to delete password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  // Set form data for editing
  const editpassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id);
    if (passwordToEdit) {
      setForm({ ...passwordToEdit });
    }
  };

  // Handle form input change
  const handelchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <div className=" mx-auto mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-400">&lt;</span>
          <span>Trust</span>
          <span className="text-green-400">/Security&gt;</span>
        </h1>
        <p className="text-green-700 text-lgs">
          Your saftest Password Managers
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handelchange}
            className="rounded-full border border-green-400 w-full p-4 py-1"
            type="text"
            placeholder="Enter website url"
            name="site"
            id=""
          />
          <div className="flex w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handelchange}
              className="rounded-full border border-green-400 w-full p-4 py-1"
              type="text"
              placeholder="Enter username"
              name="username"
              id=""
            />
            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                className="rounded-full border border-green-400 w-full p-4 py-1"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handelchange}
                id=""
              />
              <span className="absolute right-[1px] top-[1px]">
                <img
                  ref={ref}
                  className="p-1 cursor-pointer"
                  width={30}
                  src="public\externalcontent\eye.png"
                  onClick={showpassword}
                  alt=""
                  srcset=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            onChange={handelchange}
            className=" border border-green-800 flex gap-2 bg-green-400 justify-center items-center hover:bg-slate-300 rounded-full px-5 py-1 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl">Your Secret Password</h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length !== 0 && (
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2">Site</th>
                  <th class="px-4 py-2">Username</th>
                  <th class="px-4 py-2">Password</th>
                  <th class="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item) => (
                  <tr key={item.index}>
                    <td class="border px-4 py-2 items-center ">
                      <div className=" flex justify-center items-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="size cursor-pointer "
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{ width: "25px", height: "25px" }}
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className="border px-4 py-2 text-center border-white">
                      <div className="flex justify-between items-center">
                        <span>{item.username}</span>
                        <div className="flex justify-center items-center">
                          <div
                            className="size cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-between items-center">
                        <span>{item.password}</span>
                        <div className="flex justify-center items-center">
                          <div
                            className="size cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-center border-white">
                      <div className="flex justify-between items-center">
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            editpassword(item.id);
                          }}
                        >
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            deletepassword(item.id);
                          }}
                        >
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <script src="https://cdn.lordicon.com/lordicon.js"></script>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="morph"
                            stroke="bold"
                            state="morph-trash-out"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
