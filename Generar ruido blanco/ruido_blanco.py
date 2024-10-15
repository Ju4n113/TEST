import numpy as np
import soundfile as sf
from scipy.signal import butter, filtfilt

# Parámetros
duracion = 300  # segundos
frecuencia_muestreo = 44100  # Hz (frecuencia de muestreo común para audio)
amplitud = 0.5  # amplitud entre -1 y 1
canales = 1  # Mono
frecuencia_baja = 20  # Hz (frecuencia mínima del filtro)
frecuencia_alta = 20000  # Hz (frecuencia máxima del filtro)

# Generar ruido blanco con distribución normal
numero_muestras = duracion * frecuencia_muestreo
ruido_blanco = np.random.normal(0, amplitud, (numero_muestras, canales))

# Función para aplicar un filtro de paso banda usando scipy
def aplicar_filtro_paso_banda(data, fs, lowcut, highcut):
    # Diseño del filtro de paso banda Butterworth
    nyquist = 0.5 * fs  # Frecuencia de Nyquist (la mitad de la frecuencia de muestreo)
    low = lowcut / nyquist  # Escalar la frecuencia baja
    high = highcut / nyquist  # Escalar la frecuencia alta
    b, a = butter(4, [low, high], btype='band')  # Filtro de 4º orden
    filtrado = filtfilt(b, a, data, axis=0)  # Filtrado del ruido
    return filtrado

# Aplicar el filtro para mantener solo las frecuencias entre 20 Hz y 20 kHz
ruido_filtrado = aplicar_filtro_paso_banda(ruido_blanco, frecuencia_muestreo, frecuencia_baja, frecuencia_alta)

# Guardar el ruido filtrado en un archivo WAV
sf.write('ruido_blanco_20Hz_20kHz.wav', ruido_filtrado, frecuencia_muestreo)
