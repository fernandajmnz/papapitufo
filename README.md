# papapitufo

Repo de Playwright Basic Exercises

## Están en el folder:

### g102-2026


- **Actividad 1 - GitHub Sign In**: automatiza el login en GitHub con credenciales inválidas y verifica que aparezca el mensaje de error.
- **Actividad 2 - Browsers & Browser context**: lanza un browser manualmente, crea un contexto y muestra cuántos contextos tiene el browser.
- **Actividad 3 - Multiple pages**: abre dos páginas distintas dentro del mismo contexto de browser.
- **Actividad 4 - Pages Methods**: toma un screenshot, navega a otra página y regresa al historial anterior.

## Cómo correr las pruebas

Entra a la carpeta del grupo:

```bash
cd g102-2026
```

Instala las dependencias:

```bash
npm install
npx playwright install
```

Corre todas las pruebas:

```bash
npx playwright test
```

Corre una actividad específica:

```bash
npx playwright test --grep "nombre de la actividad"
```

Ver el reporte con traces y screenshots:

```bash
npx playwright show-report
```
