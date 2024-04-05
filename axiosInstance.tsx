import axios from 'axios';

const baseURL = "https://capstone-server-zo6byxq2h-mohammad-anwaruddins-projects.vercel.app/"; // Assuming you have BASE_URL in your .env file

const axiosInstance = axios.create({
baseURL ,
  
        headers: {
          'Content-Type': 'application/json',
        }
    
});

export default axiosInstance;


// import axios from 'axios';

// const baseURL = process.env.BASE_URL;

// const axiosInstance = axios.create({
//   baseURL,
// });

// export default axiosInstance;