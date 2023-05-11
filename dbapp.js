const express = require('express');
const app = express();
const db = require('./db');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, '')); // Set the views directory to the "wsa" folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create tables and insert initial data
db.execute(`CREATE TABLE IF NOT EXISTS animals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255)
)`);

db.execute(`CREATE TABLE IF NOT EXISTS donations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  donor_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

db.execute(`CREATE TABLE IF NOT EXISTS contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

db.execute(`CREATE TABLE IF NOT EXISTS subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);



// ...

// Insert initial data
const insertInitialData = async () => {
  // Insert animals data
  const animals = [
    {
      name: 'Lion',
      species: 'Panthera leo',
      description: 'The lion is a large felid of the genus Panthera native to Africa.',
      image_url: 'lion.jpg'
    },
    {
      name: 'Elephant',
      species: 'Loxodonta africana',
      description: 'The African bush elephant is the largest living terrestrial animal.',
      image_url: 'elephant.jpg'
    },
    // Add more animals here...
  ];

  for (const animal of animals) {
    const checkAnimalQuery = 'SELECT id FROM animals WHERE name = ?';
    const [rows] = await db.execute(checkAnimalQuery, [animal.name]);

    if (rows.length === 0) {
      const insertAnimalQuery = 'INSERT INTO animals (name, species, description, image_url) VALUES (?, ?, ?, ?)';
      await db.execute(insertAnimalQuery, [animal.name, animal.species, animal.description, animal.image_url]);
    }
  }

  // Insert donations data
  const donations = [
    {
      donor_name: 'John Doe',
      email: 'john.doe@example.com',
      amount: 100.0
    },
    {
      donor_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      amount: 50.0
    },
    // Add more donations here...
  ];

  for (const donation of donations) {
    const checkDonationQuery = 'SELECT id FROM donations WHERE email = ?';
    const [rows] = await db.execute(checkDonationQuery, [donation.email]);

    if (rows.length === 0) {
      const insertDonationQuery = 'INSERT INTO donations (donor_name, email, amount) VALUES (?, ?, ?)';
      await db.execute(insertDonationQuery, [donation.donor_name, donation.email, donation.amount]);
    }
  }

  // Insert contacts data

  const contacts = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      message: 'I have a question about your organization.'
    },
    {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      message: 'I want to volunteer for your NGO.'
    }
    // Add more contacts here...
  ];

  for (const contact of contacts) {
    const checkContactQuery = 'SELECT id FROM contacts WHERE email = ?';
    const [rows] = await db.execute(checkContactQuery, [contact.email]);

    if (rows.length === 0) {
      const insertContactQuery = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
      await db.execute(insertContactQuery, [contact.name, contact.email, contact.message]);
    }
  }
};


// Set up routes
app.get('/', (req, res) => {
  const getAnimalsQuery = 'SELECT * FROM animals';
  const getDonationsQuery = 'SELECT * FROM donations';
  const getContactsQuery = 'SELECT * FROM contacts';

  Promise.all([
    db.execute(getAnimalsQuery),
    db.execute(getDonationsQuery),
    db.execute(getContactsQuery)
  ])
    .then(([animalsRows, donationsRows, contactsRows]) => {
      const animals = animalsRows[0];
      const donations = donationsRows[0];
      const contacts = contactsRows[0];

      res.render('AnimalsDonationsContacts.ejs', { animals, donations, contacts });
    })
    .catch(err => {
      console.error('Error retrieving data:', err);
      res.send('An error occurred while retrieving data');
    });
});

// ...

// Handle form submission
// Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const insertContactQuery = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  
  db.execute(insertContactQuery, [name, email, message])
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.error('Error inserting contact:', err);
      res.send('An error occurred while storing the contact details');
    });
});
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  const insertSubscriberQuery = `INSERT INTO subscribers (email) VALUES (?)`;
  connection.query(insertSubscriberQuery, [email], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Failed to subscribe. Please try again later.' });
    }
    return res.status(200).json({ message: 'Successfully subscribed to email updates.' });
  });
});

app.post('/donate', (req, res) => {
  const { donor_name, email, amount } = req.body;

  // Insert the donation data into the donations table
  const insertDonationQuery = `INSERT INTO donations (donor_name, email, amount) VALUES (?, ?, ?)`;
  db.query(insertDonationQuery, [donor_name, email, amount], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error submitting donation');
    }

    // Redirect the user to a thank you page or a success message
    res.redirect('/thankyou.html');
  });
});

// ...



// ...


// ...

// Start the server after inserting initial data
insertInitialData()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch(err => {
    console.error('Error inserting initial data:', err);
    console.log('Server starting without initial data');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  });

