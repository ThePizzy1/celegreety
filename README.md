CROATIAN

Celegreety - Vue 3 Project

Opis:
   Ovo je front-end projekt napravljen s Vue 3, Vite, TailwindCSS, Pinia, Axios i SweetAlert2. Sadr�i login/register forme, prikaz i ure?ivanje cijena (Pricing) te povijest promjena.
Preduvjeti:
* Node.js (preporu?eno: 20.19.0 ili >=22.12.0)
* npm (dolazi s Node.js) ili yarn
Instalacija:
1. Otvori terminal ili command prompt.
2. Provjeri da si u root direktoriju projekta (gdje se nalazi package.json). Vrlo je va�no da si u ispravnoj mapi ina?e instalacija ne?e raditi.
3. Instaliraj sve dependencies pomo?u naredbe:
o npm install
o ili ako koristi� yarn: yarn
Pokretanje u razvoju:
1. Pokreni development server pomo?u naredbe:
o npm run dev
o ili yarn dev
2. Otvori browser i idi na adresu koju Vite prikazuje u terminalu (obi?no http://localhost:5173).
Struktura projekta (bitni folderi):
* src/ - glavni Vue kod
o components/ - Vue komponente
o views/ - stranice
o router/ - rute
* package.json - dependencies i skripte
* vite.config.ts - konfiguracija Vite
Napomene:
* Backend API mora biti pokrenut na http://localhost:5080 kako bi login, register i pricing funkcionalnosti radile.
* Cijene se prikazuju u centima (backend) ? frontend dijeli s 100 za prikaz u �.
* Forme su responsive i prilagodljive veli?ini ekrana.
Iva Vozab

ENG

Celegreety – Vue 3 Project

Description:
This is a front-end project built with Vue 3, Vite, TailwindCSS, Pinia, Axios, and SweetAlert2. It includes login/register forms, displaying and editing prices (Pricing), and change history.

Prerequisites:
 •	Node.js (recommended: 20.19.0 or >=22.12.0)
 •	npm (comes with Node.js) or yarn
 
Installation:
1.	Open a terminal or command prompt.
2.	Make sure you are in the root directory of the project (where package.json is located). It’s very important to be in the correct folder; otherwise, installation will not work.
3.	Install all dependencies using:
o	npm install
o	or, if using yarn: yarn
Running in Development:
1.	Start the development server using:
o	npm run dev
o	or yarn dev
2.	Open your browser and go to the address Vite shows in the terminal (usually http://localhost:5173).
Project Structure (important folders):
•	src/ – main Vue code
o	components/ – Vue components
o	views/ – pages
o	router/ – routes
•	package.json – dependencies and scripts
•	vite.config.ts – Vite configuration
Notes:
•	The backend API must be running at http://localhost:5080 for login, register, and pricing features to work.
•	Prices are displayed in cents (backend) – the frontend divides by 100 to show in €.
•	Forms are responsive and adapt to screen size.
Iva Vozab
