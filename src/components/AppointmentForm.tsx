import { authApiService } from '../services/authApi';
import { specialtiesApiService } from '../services/specialtiesApi';

const [doctors, setDoctors] = useState<User[]>([]);
const [specialties, setSpecialties] = useState<string[]>([]);
const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadInitialData();
}, []);

useEffect(() => {
  if (selectedSpecialty) {
    loadDoctorsBySpecialty(selectedSpecialty);
  } else {
    loadAllDoctors();
  }
}, [selectedSpecialty]);

const loadInitialData = async () => {
  try {
    setLoading(true);
    const [specialtiesData] = await Promise.all([
      specialtiesApiService.getAllSpecialties(),
    ]);
    setSpecialties(specialtiesData);
    await loadAllDoctors();
  } catch (error) {
    console.error('Erro ao carregar dados iniciais:', error);
  } finally {
    setLoading(false);
  }
};

const loadAllDoctors = async () => {
  try {
    const doctorsData = await authApiService.getAllDoctors();
    setDoctors(doctorsData);
  } catch (error) {
    console.error('Erro ao carregar médicos:', error);
  }
};

const loadDoctorsBySpecialty = async (specialty: string) => {
  try {
    const doctorsData = await authApiService.getDoctorsBySpecialty(specialty);
    setDoctors(doctorsData);
  } catch (error) {
    console.error('Erro ao carregar médicos por especialidade:', error);
  }
};