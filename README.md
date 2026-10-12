# Challenge 2 — Análisis de IRA y neumonía en menores de 5 años en el Perú

**Entrega académica | Fundamentos de IA y Búsqueda**

Este paquete reúne el informe en Markdown, los gráficos y el código para reproducir las visualizaciones del caso.

## Contenido
- `challenge_ira_neumonia_peru.md`: desarrollo del caso y explicación de los dos bloques.
- `assets/grafico_episodios_ira.png`: evolución de episodios de IRA (2023–2025).
- `assets/grafico_defunciones_neumonia.png`: evolución de defunciones por neumonía (2023–2025).
- `assets/grafico_regresion_ira.png`: tendencia lineal ilustrativa de las defunciones.
- `scripts/generar_graficos.py`: código para volver a generar los gráficos.
- `requirements.txt`: dependencias necesarias.

## Cómo revisar
1. Abra `challenge_ira_neumonia_peru.md` para leer el desarrollo.
2. Las imágenes se encuentran dentro de `assets/` y se muestran dentro del Markdown mediante rutas relativas.
3. Para regenerar las gráficas, instale las dependencias y ejecute:
   ```bash
   python scripts/generar_graficos.py
   ```

## Nota sobre los datos
Los valores incluidos corresponden a los que aparecen en el afiche compartido para 2023–2025. La puntuación de alternativas y la proyección lineal son recursos didácticos ilustrativos, no una evaluación causal ni una predicción oficial. Para decisiones sanitarias reales se requiere validar los datos con fuentes oficiales y especialistas.
