import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import axios from "axios";

const LoginPage = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=Mr6Zg5PpdI6ZBJEO2ee0Un9jcP14u9xlK5aGxxR2"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch APOD data");
        }
        const data = await response.json();
        const urlWithSpacesReplaced = data.url.replace(/ /g, '%20');
        data.url = urlWithSpacesReplaced;
        setApodData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApodData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      window.location.replace("/apod");
      
    } catch (error) {
      setError(error.request.response);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    alert(error);
    window.location.replace("/");
  }

  return (
    <>
      <div
        className="flex min-h-screen w-screen flex-col justify-center px-6 py-12 lg:px-8 text-white"
        style={{
          backgroundImage: `url(${apodData.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div  >
          <div className="bg-transparent backdrop-filter backdrop-blur-lg shadow sm:mx-auto sm:w-full sm:max-w-sm p-10">
            <h2 className="bg-transparent backdrop-filter backdrop-blur-lg shadow mt-10 text-center text-2xl font-bold leading-9 tracking-tight mb-10">
              Sign in to your account
            </h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-lg font-medium leading-6">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full h-12 bg-transparent border-b-2 border-gray-200 placeholder-gray-100 text-gray-100 focus:outline-none focus:border-indigo-500"
                    />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-lg font-medium leading-6">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 bg-transparent border-b-2 border-gray-200 placeholder-gray-100 text-gray-100 focus:outline-none focus:border-indigo-500"
                    />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
