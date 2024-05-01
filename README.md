[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/V1F4A3D5)


## Setup Instructions

 **Clone the repository**:
   ```bash
   git clone https://github.com/sliitcsse/se3040-assignment02-IT21204302.git
```

   **Install Dependencies**: Navigate into the project directory and install the dependencies using npm:
```
cd se3040-assignment02-IT21204302
```
```
npm install
```

**To Run the Application**: Execute the following command:
```
npm start
```
# API Documentation

## NASA APOD API

The NASA Astronomy Picture of the Day (APOD) API is used to fetch the daily astronomy picture along with its explanation.

### Endpoint
```bash
GET https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual API key obtained from NASA.


## NASA Earth Imagery API

The NASA Earth Imagery API is used to fetch satellite imagery of specific locations on Earth.

### Endpoint
```bash
GET https://api.nasa.gov/planetary/earth/imagery?lon={longitude}&lat={latitude}&date={date}&dim={dimension}&api_key=YOUR_API_KEY

```

Replace `YOUR_API_KEY` with your actual API key obtained from NASA.


## Mars Rover Photos

The MarsHomePage component fetches and displays photos captured by the Mars rovers, specifically focusing on the Curiosity rover. It utilizes the NASA Mars Rover Photos API to fetch the latest photos taken by the Curiosity rover on Mars.

### Endpoint
```bash
GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000?api_key=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual API key obtained from NASA.

## Tech Transfer

 This provides users with information about patents related to NASA's technology transfer initiatives.


### Endpoint
```
GET https://api.nasa.gov/planetary/apod/apod?api_key=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual API key obtained from NASA.
