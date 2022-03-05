import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

// import firebase sdk
// install firebase react-firebae hooks
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  // your config
  apiKey: "AIzaSyA_8qtj_XbY2jwD1n-NVlZXi4iYggHs-II",
  authDomain: "watch-movies-42cb9.firebaseapp.com",
  projectId: "watch-movies-42cb9",
  storageBucket: "watch-movies-42cb9.appspot.com",
  messagingSenderId: "247948017732",
  appId: "1:247948017732:web:9c62bd45e69bbe9d4b3c11",
  measurementId: "G-4R798697SB",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const API_URL = "https://www.omdbapi.com?apikey=b177d325";

function App() {
  const [user] = useAuthState(auth);

  // b177d325
  const serachMovies = async (title) => {
    if (title == "") title = "Spider";
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search);
    setMovies(data.Search);
  };

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    serachMovies("Batman");
  }, []);

  // useEffect(() => {
  //   serachMovies(movies);
  // }, [movies]);
  useEffect(() => {
    serachMovies(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      {user && (
        <div className="app">
          <h1>Movie World</h1>
          <div className="search">
            <input
              placeholder="search for movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img src={logo} />
          </div>
          <SignOut />
          {movies?.length > 0 ? (
            <div className="container">
              {/* <MovieCard movie1={movie1} /> */}
              {movies?.map((movie) => (
                <MovieCard key={movie.imdbID} movie1={movie} />
              ))}
            </div>
          ) : (
            <div>
              <h2>No Movies Found</h2>
            </div>
          )}
        </div>
      )}
      {!user && <SignIn />}
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

function SignOut() {
  return (
    <div>
      {auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      )}
    </div>
  );
}

export default App;
