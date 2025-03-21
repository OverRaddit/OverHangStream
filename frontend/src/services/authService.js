import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const authService = {
  kakaoLogin: () => {
    window.location.href = `${API_BASE_URL}/auth/kakao`;
  },
  handleKakaoCallback: async (code) => {
    const response = await axios.post(`${API_BASE_URL}/auth/kakao/callback`, {
      code,
    });
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  },
};

export default authService;
