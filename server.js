// node server.js ----- Ezzel indítjuk el a szervert

import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 5506;

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const username = req.body.userId;
  
      if (!username || username.trim() === '') {
        cb(null, 'default.jpg');
      } else {

        const filename = username.trim().toLowerCase() + '.jpg';
        cb(null, filename);
      }
    }
  });

  const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res) {

    console.log('File uploaded:', req.file);
    res.sendStatus(200); 
});

app.post('/checkfileexistence', async (req, res) => {
  try {
    const fileName = req.body.pic;
    console.log(fileName);

    const folder = 'uploads';

    const teljesElérésiÚt = path.join(folder, fileName);

    try {
      await fs.access(teljesElérésiÚt, fs.constants.F_OK);
      console.log(`${fileName} megtalálva.`);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(`${fileName} nem található.`);
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).json({ success: false, error: 'Failed to check file existence.' });
  }
});

app.post('/registerhandler', async (req, res) => {
    const userData = req.body;

    try {
        const usersData = await fs.readFile('data/users.json', 'utf8');
        const users = JSON.parse(usersData);
        var validEmail = true;


        users.forEach(user => {
            if(userData.email === user.email){
                validEmail = false;
            }
        });

        if(validEmail == true){
            users.push(userData);
            await fs.writeFile('data/users.json', JSON.stringify(users, null, 2));
            res.status(200).send('User registered successfully.');
        }else{
            console.log("FAILED : AZ EMAIL CÍM FOGLALT");
            res.status(401).send('fail');
        }
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to register user.');
    }
});

app.post('/loginhandler', async (req, res) => {
    const loginData = req.body;
    
    try{
     const usersData = await fs.readFile('data/users.json', 'utf-8');
     const users = JSON.parse(usersData);
     var successLogin = false;
     var loginUser = {
        userId : '',
        email : '',
        fullName : ''
     };
 
     users.forEach(user => {
         console.log(`Email: ${user.email}, Password: ${user.password}`);
         
         if(loginData.email === user.email && loginData.password === user.password){
             successLogin = true;
             loginUser.userId = user.id;
             loginUser.email = user.email;
             loginUser.fullName = user.fullName;
         }
     });
 
     if(successLogin == true){
         console.log("SIKERES BEJELNTKEZÉS");
         res.status(200).json({ code: "success", userId: loginUser.userId, email: loginUser.email, fullName: loginUser.fullName });
     }else{
         console.log("FAILED : NEM SIKERÜLT A BEJELENTKEZÉS");
         res.status(401).send('fail');
     }
 

    }catch (error) {
     console.error('Error: ', error);
     res.status(500).send('Failed to login user.');
    }
 });

 app.post('/profiledatahandler', async (req, res) => {
    const profileData = req.body;
    
    try{
     const usersData = await fs.readFile('data/users.json', 'utf-8');
     const users = JSON.parse(usersData);

     var profileUser = {
        id: '',
        fullName: '',
        birthDate: {
            year: '',
            month: '',
            day: ''
        },
        phone: '',
        email: '',
        address: '',
        address2: '',
        country: '',
        zip: '',
        city: ''
     };
 
     users.forEach(user => {
        if(parseInt(profileData.id) === user.id){
             profileUser.id = user.id;
             profileUser.fullName = user.fullName;
             profileUser.birthDate.year = user.birthDate.year;
             profileUser.birthDate.month = user.birthDate.month;
             profileUser.birthDate.day = user.birthDate.day;
             profileUser.phone = user.phone;
             profileUser.email = user.email;
             profileUser.address = user.address;
             profileUser.address2 = user.address2;
             profileUser.country = user.country;
             profileUser.zip = user.zip;
             profileUser.city = user.city;
         }
     });

         res.status(200).json({ code: "success", profileUser });

    }catch (error) {
     console.error('Error: ', error);
     res.status(500).send('Failed to find user.');
    }
 });

 app.post('/profilechangehandler', async (req, res) => {
    const profileData = req.body;
    
    try{
     const usersData = await fs.readFile('data/users.json', 'utf-8');
     let users = JSON.parse(usersData);
     var successModify = false;
     var validEmail = true;

     users.forEach(user => {
        if(profileData.email === user.email){
            validEmail = false;
        }
     });

     var profileUser = {
        id: '',
        fullName: '',
        birthDate: {
            year: '',
            month: '',
            day: ''
        },
        phone: '',
        email: '',
        password: '',
        address: '',
        address2: '',
        country: '',
        zip: '',
        city: ''
     };
 
     users.forEach(user => {
        if(parseInt(profileData.id) === user.id) {
            if(profileData.oldPassword === user.password) {
                successModify = true;
            
                profileUser.id = user.id;
                if(profileData.fullName === '') {
                    profileUser.fullName = user.fullName;
                } else {
                    profileUser.fullName = profileData.fullName;
                }
                if(profileData.birthDate.year === 'Év') {
                    profileUser.birthDate.year = user.birthDate.year;
                } else {
                    profileUser.birthDate.year = profileData.birthDate.year;
                }
                if(profileData.birthDate.month === 'Hónap') {
                    profileUser.birthDate.month = user.birthDate.month;
                } else {
                    profileUser.birthDate.month = profileData.birthDate.month;
                }
                if(profileData.birthDate.day === 'Nap') {
                    profileUser.birthDate.day = user.birthDate.day;
                } else {
                    profileUser.birthDate.day = profileData.birthDate.day;
                }
                if(profileData.phone === '') {
                    profileUser.phone = user.phone;
                } else {
                    profileUser.phone = profileData.phone;
                }
                if(profileData.email === '') {
                    profileUser.email = user.email;
                } else {
                    profileUser.email = profileData.email;
                }
                if(profileData.password === '') {
                    profileUser.password = user.password;
                } else {
                    profileUser.password = profileData.password;
                }
                if(profileData.address === '') {
                    profileUser.address = user.address;
                } else {
                    profileUser.address = profileData.address;
                }
                if(profileData.address2 === '') {
                    profileUser.address2 = user.address2;
                } else {
                    profileUser.address2 = profileData.address2;
                }
                if(profileData.country === '') {
                    profileUser.country = user.country;
                } else {
                    profileUser.country = profileData.country;
                }
                if(profileData.zip === '') {
                    profileUser.zip = user.zip;
                } else {
                    profileUser.zip = profileData.zip;
                }
                if(profileData.city === '') {
                    profileUser.city = user.city;
                } else {
                    profileUser.city = profileData.city;
                }
            }
         }
     });

     if(successModify == true) {
        if(validEmail == true) {
            console.log("SIKERES MÓDOSÍTÁS");
            
            let newUsers = users.filter(user => parseInt(profileData.id) !== user.id);
            newUsers.push(profileUser);
            await fs.writeFile('data/users.json', JSON.stringify(newUsers, null, 2), 'utf-8');
            
            res.status(200).json({ code: "success", fullName: profileUser.fullName });
        } else {
            console.log("FAILED : AZ EMAIL CÍM FOGLALT");
            res.status(400).send('fail');
        }
     } else {
        console.log("FAILED : NEM SIKERÜLT A MÓDOSÍTÁS");
        res.status(401).send('fail');
     }

    }catch (error) {
     console.error('Error: ', error);
     res.status(500).send('Failed to modify user.');
    }
 });

 app.post('/bookinghandler', async (req, res) => {
    const bookingData = req.body;

    try {
        const bookingsData = await fs.readFile('data/bookings.json', 'utf8');
        const bookings = JSON.parse(bookingsData);

        bookings.push(bookingData);

        await fs.writeFile('data/bookings.json', JSON.stringify(bookings, null, 2));

        res.status(200).send('Booked successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to book.');
    }
 });

 app.post('/bookingdatahandler', async (req, res) => {
    const bookingData = req.body;

    try{
     const bookingsData = await fs.readFile('data/bookings.json', 'utf-8');
     const bookings = JSON.parse(bookingsData);
     
     var bookingList = [];
     
 
     bookings.forEach(booking => {
        var bookingItem = {
            userId: '',
            bookingId: '',
            arrivalDate: '',
            departureDate: '',
            catName: '',
            catBreed: '',
            catBirthDate: '',
            catGender: '',
            catNeutered: '',
            catExtraInfo: '',
            extraServices: [],
            amountToPay: ''
         };
        if(parseInt(bookingData.id) == booking.userId){
            bookingItem.userId = booking.userId;
            bookingItem.bookingId = booking.bookingId;
            bookingItem.arrivalDate = booking.arrivalDate;
            bookingItem.departureDate = booking.departureDate;
            bookingItem.catName = booking.catName;
            bookingItem.catBreed = booking.catBreed;
            bookingItem.catBirthDate = booking.catBirthDate;
            bookingItem.catGender = booking.catGender;
            bookingItem.catNeutered = booking.catNeutered;
            bookingItem.catExtraInfo = booking.catExtraInfo;
            bookingItem.extraServices = booking.extraServices;
            bookingItem.amountToPay = booking.amountToPay;

            bookingList.push(bookingItem);
         }
         console.log(bookingList);
     });

         res.status(200).json({ code: "success", bookingList });

    }catch (error) {
     console.error('Error: ', error);
     res.status(500).send('Failed to find booking.');
    }
 });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

