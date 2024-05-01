import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const APODHomePage = () => {

  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        window.location.replace('/');
        return;
      }

      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=Mr6Zg5PpdI6ZBJEO2ee0Un9jcP14u9xlK5aGxxR2');
        if (!response.ok) {
          throw new Error('Failed to fetch APOD data');
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} setError={setError} />;
  }

  return (
    <>
    <div className="min-h-full shadow " style={{ backgroundImage: `url(${apodData.url})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100vh' }}>
      
      <Header />

      <header className="bg-transparent backdrop-filter backdrop-blur-lg shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-300 text-center">{apodData.title}</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <div className="bg-transparent backdrop-filter backdrop-blur-2xl shadow flex flex-col items-center justify-center">
              <p className="text-lg text-gray-400 text-center text-white">{apodData.explanation}</p>
            </div>
        </div>
      </main>
    </div>
  </>

  );
};

export default APODHomePage;
