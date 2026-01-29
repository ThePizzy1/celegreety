Celegreety - Vue 3 Project

Opis:
   Ovo je front-end projekt napravljen s Vue 3, Vite, TailwindCSS, Pinia, Axios i SweetAlert2. Sadrži login/register forme, prikaz i ure?ivanje cijena (Pricing) te povijest promjena.
Preduvjeti:
* Node.js (preporu?eno: 20.19.0 ili >=22.12.0)
* npm (dolazi s Node.js) ili yarn
Instalacija:
1. Otvori terminal ili command prompt.
2. Provjeri da si u root direktoriju projekta (gdje se nalazi package.json). Vrlo je važno da si u ispravnoj mapi ina?e instalacija ne?e raditi.
3. Instaliraj sve dependencies pomo?u naredbe:
o npm install
o ili ako koristiš yarn: yarn
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
* Cijene se prikazuju u centima (backend) ? frontend dijeli s 100 za prikaz u €.
* Forme su responsive i prilagodljive veli?ini ekrana.
Iva Vozab 

