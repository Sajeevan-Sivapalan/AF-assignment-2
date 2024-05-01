import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const EarthHomePage = () => {
  const [apodData, setApodData] = useState(null);
  const [longitude, setLongitude] = useState('100');
  const [latitude, setLatitude] = useState('100');
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false); // State to control the visibility of the image modal

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2018-01-01&dim=0.15&api_key=Mr6Zg5PpdI6ZBJEO2ee0Un9jcP14u9xlK5aGxxR2`);
      if (!response.ok) {
        throw new Error('Failed to fetch Earth imagery data');
      }
      const data = await response;
      setImageData(data);
      setShowImageModal(true); // Show the image modal after successfully fetching the image
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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
            <h1 className="text-3xl font-bold tracking-tight text-gray-300 text-center">Earth Imagery</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style={{ height: '400px' }}>
            <form onSubmit={handleSubmit}>
              <div className="bg-transparent backdrop-filter backdrop-blur-lg shadow p-10">
                <h2 className="text-base font-semibold leading-7 text-lg text-white">Personal Information</h2>
                <p className="mt-1 leading-6 text-lg text-gray-200">Use a permanent address where you can receive mail.</p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="longitude" className="block text-lg font-medium leading-6 text-gray-100">Longitude</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="longitude"
                        className="w-36 h-12 bg-transparent border-b-2 border-gray-200 placeholder-gray-100 text-gray-100 focus:outline-none focus:border-indigo-500"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                      />                
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="latitude" className="block text-lg font-medium leading-6 text-gray-100">Latitude</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="latitude"
                        className="w-36 h-12 bg-transparent border-b-2 border-gray-200 placeholder-gray-100 text-gray-100 focus:outline-none focus:border-indigo-500"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 flex justify-center">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>View Image</button>
                  </div>
                </div>
              </div>
            </form>
            {showImageModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg relative">
                  <img src={imageData.url} alt="Earth Imagery" style={{ height: '300px', width: '400px' }} />
                  <button className="absolute top-2 right-2 text-gray-700 hover:text-gray-900" onClick={() => setShowImageModal(false)}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
};

export default EarthHomePage;
