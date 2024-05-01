import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const MarsHomePage = () => {

  const [apodData, setApodData] = useState(null);
  const [roverData, setRoverData] = useState([]);
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

    const fetchRoverData  = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=Mr6Zg5PpdI6ZBJEO2ee0Un9jcP14u9xlK5aGxxR2');
        if (!response.ok) {
          throw new Error('Failed to fetch APOD data');
        }
        const data = await response.json();
        setRoverData(data.photos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApodData();
    fetchRoverData();
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
        <h1 className="text-3xl font-bold tracking-tight text-gray-300 text-center">Mars Rover Photos</h1>
        </div>
      </header>

      <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style={{ height: '400px' }}>
        <div className="bg-transparent backdrop-filter backdrop-blur-lg shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 space-y-12 lg:flex lg:justify-center lg:space-y-0 lg:gap-x-6 lg:space-x-6 lg:flex-wrap w-[800px] h-[300px] overflow-y-auto">
            {roverData.slice(0, 40).map((data) => (
              <div className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img key={data.id} src={data.img_src} alt={`Rover Photo ${data.id}`} className="h-full w-full object-cover object-center rounded-lg" />
                </div>
                <h3 className="mt-6 text-sm text-gray-100">
                  EARTH DATE : {data.earth_date}<br />
                  ROVER NAME : {data.rover.name}
                </h3>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  </>

  );
};

export default MarsHomePage;
