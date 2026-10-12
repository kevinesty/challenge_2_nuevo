from pathlib import Path
import matplotlib.pyplot as plt
import numpy as np
from sklearn.linear_model import LinearRegression

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
ASSETS.mkdir(exist_ok=True)

years = [2023, 2024, 2025]
episodes_ira = [1003178, 883959, 824978]
deaths = [113, 82, 51]

plt.figure(figsize=(8.5, 4.8))
plt.plot(years, episodes_ira, marker="o", linewidth=2, label="Episodios de IRA observados")
plt.title("Episodios de IRA en menores de 5 años, 2023–2025")
plt.xlabel("Año"); plt.ylabel("Número de episodios")
plt.xticks(years); plt.grid(True, alpha=0.3); plt.legend(); plt.tight_layout()
plt.savefig(ASSETS / "grafico_episodios_ira.png", dpi=180); plt.close()

plt.figure(figsize=(8.5, 4.8))
plt.plot(years, deaths, marker="o", linewidth=2, label="Defunciones observadas")
plt.title("Defunciones por neumonía en menores de 5 años, 2023–2025")
plt.xlabel("Año"); plt.ylabel("Defunciones")
plt.xticks(years); plt.grid(True, alpha=0.3); plt.legend(); plt.tight_layout()
plt.savefig(ASSETS / "grafico_defunciones_neumonia.png", dpi=180); plt.close()

X = np.array(years).reshape(-1, 1)
model = LinearRegression().fit(X, np.array(deaths))
future = np.array([2023, 2024, 2025, 2026, 2027]).reshape(-1, 1)
pred = model.predict(future)

plt.figure(figsize=(8.5, 4.8))
plt.plot(years, deaths, marker="o", linewidth=2, label="Defunciones observadas")
plt.plot(future.ravel(), pred, marker="x", linestyle="--", label="Tendencia lineal ilustrativa")
plt.title("Tendencia descriptiva de defunciones por neumonía")
plt.xlabel("Año"); plt.ylabel("Defunciones")
plt.xticks(future.ravel()); plt.grid(True, alpha=0.3); plt.legend(); plt.tight_layout()
plt.savefig(ASSETS / "grafico_regresion_ira.png", dpi=180); plt.close()
print("Gráficos guardados en:", ASSETS)
