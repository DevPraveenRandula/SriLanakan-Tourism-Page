// require("dotenv").config();
// const mongoose = require("mongoose");
// const Product = require("./models/product.model");

// // Connect to MongoDB
// mongoose
// .connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 30000,
//   })
//   .then(() => console.log("MongoDB connection established."))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });

// // Seed data
// const seedProducts = [
//   {
//     name: "Traditional Handicraft",
//     image: "/images/img-1.png",
//     price: 20.99,
//     rating: 4.5,
//     isNew: true,
//     category: "Masks",
//   },
//   {
//     name: "Ceylon Tea Pack",
//     image: "/images/img-2.png",
//     price: 15.99,
//     rating: 5,
//     isNew: true,
//     category: "Spices",
//   },
//   {
//     name: "Wooden Elephant Sculpture",
//     image: "/images/img-3.png",
//     price: 45.99,
//     rating: 4.8,
//     isNew: false,
//     category: "Food",
//   },
// ];

// // Seed function
// const seedDB = async () => {
//     try {
//       await Product.deleteMany({});
//       console.log("Old product data removed.");
  
//       await Product.insertMany(seedProducts);
//       console.log("Product database seeded successfully!");
//     } catch (error) {
//       console.error("Seeding error:", error);
//     } finally {
//       try {
//         await mongoose.connection.close(); // Close connection as a promise
//         console.log("MongoDB connection closed.");
//       } catch (closeError) {
//         console.error("Error closing MongoDB connection:", closeError);
//       }
//     }
//   };
  

// // Execute the seeding
// seedDB();
