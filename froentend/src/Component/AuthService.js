import axios from 'axios';


const AuthService = {
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/login', credentials);
      const { token } = response.data;
    const data =   localStorage.setItem('token', token);
      return  ;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      await axios.post('/api/register', userData);
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
   
    else return true
  },
};

export default AuthService;