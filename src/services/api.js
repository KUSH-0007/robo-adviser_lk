 import axios from 'axios';

const API_URL ='http://localhost:8000/api';
export const getPortfolioRecommendations =async(investmentData)=>{
    try{
        const response =await axios.post(`${API_URL}/portfolio-recommendations`,investmentData);
        return response.data;
    }catch(error){
        console.error('Error fetching portfolio recommendations:',error);
        throw error;    
    }
};