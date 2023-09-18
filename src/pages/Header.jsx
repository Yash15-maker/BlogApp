import React from "react";
import "./css/Home.css";
// import { Link } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "space-around",
      }}
      className="shadow-lg"
    >
      <div>
        <img
          src="./logo.png"
          alt="...Icon"
          style={{ wdith: "20px", height: "40px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      {user !== null ? (
        <>
          <span className="pe-4">{user.displayName || user.email}</span>
          {/* <button className="btn btn-primary btn-sm me-3"
              
              >Logout</button> */}
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-right mt-1"
              viewBox="0 0 16 16"
              onClick={() => {
                signOut(auth);
              }}
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </div>
        </>
      ) : (
        <div>
          <div className="xl:text-2xl lg:text-xl text-base cursor-pointer">
            <Link to="/signin">Hey Please,Sign In</Link>
          </div>
        </div>
      )}

      {/*  */}
    </div>
  );
}
