# MalkarsMarketing.com - Advanced Course in Sales & Marketing

A professional learning management system for the Advanced Course in Sales & Marketing offered by Dr. Vinod R. Malkar.

## 🚀 Features

- **User Authentication**: Secure registration and login for students and professionals
- **Course Management**: Create, read, update, and delete courses with modules
- **Payment Integration**: Secure payment processing via Razorpay
- **Student Dashboard**: Track progress, view enrolled courses, and access materials
- **Admin Panel**: Manage users, courses, and content
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Razorpay
- **Deployment**: cPanel, Linux Hosting

## 📦 Project Structure

```
malkars-marketing/
├── config/            # Configuration files
│   └── db.js          # Database connection
├── controllers/       # Route controllers
├── middleware/        # Custom middleware
├── models/            # Database models
│   ├── User.js        # User model
│   ├── Course.js      # Course model
│   └── Order.js       # Order/Payment model
├── routes/            # API routes
│   ├── userRoutes.js  # User authentication routes
│   ├── courseRoutes.js # Course management routes
│   └── paymentRoutes.js # Payment processing routes
├── utils/             # Utility functions
│   └── jwt.js         # JWT authentication
├── public/            # Static files
│   ├── css/           # Stylesheets
│   ├── js/            # Client-side JavaScript
│   └── images/        # Image assets
├── .env               # Environment variables
├── server.js          # Main application file
└── package.json       # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd malkars-marketing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create a course (admin only)
- `PUT /api/courses/:id` - Update a course (admin only)
- `DELETE /api/courses/:id` - Delete a course (admin only)

### Payments
- `POST /api/payments/orders` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/history` - Get payment history (protected)

## 🔒 Environment Variables

Create a `.env` file in the root directory and add the following:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🚀 Deployment

### Prerequisites for Production
- Domain name (e.g., malkarsmarketing.com)
- Web hosting with Node.js support
- MongoDB Atlas account
- Razorpay business account

### Deployment Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Upload to server**
   - Compress all files (excluding `node_modules`)
   - Upload to your hosting provider
   - Extract files

3. **Install production dependencies**
   ```bash
   npm install --production
   ```

4. **Set up PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "malkars-marketing"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx (if needed)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For any queries or support, please contact:

- **Email**: info@malkarsmarketing.com
- **Phone**: +91 XXXXXXXXXX
- **Website**: [www.malkarsmarketing.com](https://www.malkarsmarketing.com)

## 🙏 Acknowledgments

- Dr. Vinod R. Malkar for the vision and guidance
- All contributors who have helped in developing this platform
- Open source community for the amazing tools and libraries
