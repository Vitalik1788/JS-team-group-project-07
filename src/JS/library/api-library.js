import axios from "axios";


const API_KEY = 'b67c8518c930f00572f5eefdd7a9d563';


async function getMoviById(id) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };
    return axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)

      
      .then(res => (res))
      
      .catch(error => {
        console.log('EROR');
      });

     
}
export default { getMoviById }