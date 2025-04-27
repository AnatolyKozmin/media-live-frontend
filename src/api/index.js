import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true,
});

// ---------------------------  АВТОРИЗАЦИЯ ----------------------------------------------------------------------------------------------------------------

// Получение типа участника 
export const login = async (credentials) => {
    try {
        const telegramUser = window.Telegram.WebApp.initDataUnsafe.user;
        const response = await api.post('/auth/login', { 
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            telegramUsername: telegramUser?.username || null,
            telegramId: telegramUser?.id || null,
        }); // Указать правильный путь

        return response.data;
    } catch (error) {
        console.error('Ошибка с получением данных пользователя', error);
        throw error;
    }
};

// Получение типа пользователя Admin True  или обычный пользваотель 
export const getUserRole = async () => {
    try {
        const response = await api.get('/auth/role');
        return response.data;
    } catch (error) {
        console.error('Появилась ошибка связанная с получнием типа пользователя', error)
        return null;
    }
};


// ------------------------------  ЛЕКЦИИ  ------------------------------------------------------------------------------------------------------------------

export const getLectures = async () => {
    try {
        const response = await api.get('/lectures');
        return response.data;
    } catch (error) {
        console.error('Возникла ошибка, кстати вот она: ', error);
        return [];
    }
};

// -----------------------  ПОЛЬЗОВАТЕЛИ  ---------------------------------------------------------------------------------------------------------------------

export const getUserProfile = async () => {
    try {
        const response = api.get('user/profile');
        return response.data;

    } catch (error){
        console.error('Возникала ошибка связанная с вот этой штукой: ', error);
        return null;
    }
};

export const updateUserProfile = async (profileData) => {
    try {
        const response = api.put('/user/profile', profileData);
        return response.data;

    } catch (error) {
        console.error('Возникла ошибка, связанная с этим: ', error);
        throw error;
    }
};

// -------------------------  TELEGRAM  -------------------------------------------------------------------------------------------------------------------

export const initTelegram = () => {
    const webApp = window.Telegram.WebApp;
    webApp.ready();
    webApp.expand();
    return WebApp;
};