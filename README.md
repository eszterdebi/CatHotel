# Magyar
## Leírás
A projektem célja egy cicapanzió weblapjának az elkészítése volt. Az 
oldalon be tudsz regisztrálni, ha van már regisztrált fiókod be tudsz az email 
cím – jelszó párossal jelentkezni és a bejelentkezést követően foglalást 
rögzíteni, megtekinteni a foglalásaidat, a profil adataidat, illetve módosítani 
a profil adatokat. Valamint a főoldalon számos információ megtekinthető a 
cicapanzióról.

Bejelentkezéshez használhatod az 'example@example.com' és 'qwepoi123' email cím - jelszó párost .

## Működés
A backed **Node.js** segítségével működik.
A szervert az __5506__ Porton futtatom, amennyiben ez foglalt át kell írni a 
Portot a __server.js__-ben és az Ajax kérésekben vagy felszabadítani a Portot.

A megfelelő működéshez elengedhetetlen a __server.js__ futtatása illetve a teljes projekt szerveren való futtatása, például VS Code LiveServer segítségével az __5501__-es porton.
Amennyiben a port foglalt a __server.js__-ben a ***CORS szabályt*** módosítani kell a backend és frontend közti kommunikáció engedélyezése érdekében.

# English
## Description
The goal of my project was to create a website for a cat hotel. On the site, you can register, log in with your email address and password,
and after logging in, you can record bookings, view your bookings, check your profile information, and modify your profile details.
Additionally, the homepage provides various information about the cat hotel.

To log in, you can use the email and password pair: 'example@example.com' and 'qwepoi123'.

## Functionality
The backend is powered by **Node.js**. The server runs on Port __5506__. If this port is occupied, you will need to either change the port in the __server.js__ file and in the Ajax requests, or free up the port.

For proper functionality, it is essential to run the __server.js__ and host the entire project on a server, for example, using VS Code LiveServer on port __5501__.
If the port is occupied, you will need to modify the ***CORS rule*** in __server.js__ to enable communication between the backend and frontend.
