import axios from 'axios';

const baseURL = "https://server-one-sand.vercel.app"; // Assuming you have BASE_URL in your .env file

const axiosInstance = axios.create({
baseURL 
    
});

export default axiosInstance;


// import axiosInstance from 'axiosInstance';

// const baseURL = process.env.BASE_URL;

// const axiosInstanceInstance = axiosInstance.create({
//   baseURL,
// });

// export default axiosInstanceInstance;