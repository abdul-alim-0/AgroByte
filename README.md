# AgroByte - Global Agri-Social Platform with Marketplace & Learning

AgroByte is a comprehensive platform that connects farmers, buyers, agricultural experts, teachers, and general users worldwide. It combines social networking, marketplace functionality, educational resources, and AI-powered tools to create a complete ecosystem for the agricultural community.

## 🌟 Features

- **Social Platform**: Connect with the global agricultural community, share knowledge, post updates, and interact with experts.
- **Marketplace**: Buy and sell agricultural products, tools, and services with secure payment processing.
- **Learning Platform**: Access courses and educational resources on farming techniques, soil management, and more.
- **AI Tools**: Identify crop diseases, predict yields, and get personalized recommendations for your farm.
- **Real-time Messaging**: Communicate directly with other users, experts, and buyers.
- **Multilingual Support**: Available in English, Bangla, and Arabic with full RTL support.
- **Krishi Diary**: Track your farm's income and expenses with visual reports (for farmers).
- **Weather Integration**: Get location-based weather forecasts and agricultural recommendations.

## 🚀 Tech Stack

- **Frontend**: Next.js 13.5 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT-based auth with role management
- **File Storage**: Cloudinary
- **Payments**: Stripe
- **AI**: TensorFlow/PyTorch models for crop disease detection
- **Internationalization**: i18next for multilingual support
- **Testing**: Jest for unit and integration tests
- **Deployment**: Vercel (frontend), Render/Heroku (backend)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/agrobyte-platform.git
   cd agrobyte-platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Fill in your environment variables in the .env file
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### AI Module Setup

1. Navigate to the AI module directory
   ```bash
   cd ai-models/flask-api
   ```

2. Install Python dependencies
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask server
   ```bash
   python app.py
   ```

## 📦 Project Structure

```
agrobyte-platform/
├── app/                  # Next.js app directory
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Dashboard routes
│   ├── api/              # API routes
│   ├── marketplace/      # Marketplace routes
│   ├── learning/         # Learning platform routes
│   └── ai-tools/         # AI tools routes
├── components/           # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page components
│   ├── ui/               # UI components (shadcn/ui)
│   └── auth-provider.tsx # Authentication context
├── lib/                  # Utilities and libraries
├── public/               # Static assets
├── ai-models/            # AI models and API
│   └── flask-api/        # Flask API for disease detection
├── .env.example          # Example environment variables
├── README.md             # Project documentation
└── package.json          # Project dependencies
```

## 🔒 Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_APP_URL`: The URL of your frontend application
- `JWT_SECRET`: Secret key for JWT authentication
- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_*`: Cloudinary credentials for file uploads
- `STRIPE_*`: Stripe credentials for payment processing
- `WEATHER_API_KEY`: API key for weather data
- `AI_MODEL_ENDPOINT`: Endpoint for the AI model API

## 👥 User Roles

- **General User**: Browse content, buy products, enroll in courses
- **Farmer**: Sell products, track expenses, use AI tools
- **Buyer**: Purchase agricultural products
- **Expert**: Provide advice and sell services
- **Teacher**: Create and sell educational content
- **Weather Expert**: Provide weather insights
- **Admin**: Manage users, moderate content, view analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe](https://stripe.com/)
- [Cloudinary](https://cloudinary.com/)
- [TensorFlow](https://www.tensorflow.org/)