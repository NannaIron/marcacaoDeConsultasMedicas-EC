import { authApiService } from '../services/authApi';
import { apiClient } from '../services/api';

const loadStoredUser = async () => {
  try {
    const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    
    if (storedToken && storedUser) {
      apiClient.setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  } catch (error) {
    console.error('Erro ao carregar usuário:', error);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
  } finally {
    setLoading(false);
  }
};

const signIn = async (credentials: LoginCredentials) => {
  try {
    const response = await authApiService.signIn(credentials);
    setUser(response.user);
    
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
  } catch (error) {
    throw error;
  }
};