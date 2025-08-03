import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './server/models/Admin.js';
import News from './server/models/News.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(proccess.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Admin.deleteMany({});
    await News.deleteMany({});
    console.log('Cleared existing data');
    
    // Create admin user
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@newsapp.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'super_admin'
    });
    
    await admin.save();
    console.log('Super Admin user created');
    
    // Create a regular admin user
    const regularAdmin = new Admin({
      username: 'editor',
      email: 'editor@newsapp.com',
      password: 'editor123',
      role: 'admin',
      createdBy: admin._id
    });
    
    await regularAdmin.save();
    console.log('Regular Admin user created');
    
    // Create sample news articles
    const sampleArticles = [
      {
        title: 'Revolutionary AI Technology Transforms Healthcare Industry',
        content: 'A groundbreaking AI system has been developed that can analyze medical images with 99% accuracy, significantly outperforming traditional diagnostic methods. This technology is expected to reduce misdiagnosis rates and improve patient outcomes across healthcare facilities worldwide. The system uses advanced machine learning algorithms trained on millions of medical images to detect patterns invisible to the human eye. Early trials have shown remarkable success in identifying various conditions including cancer, heart disease, and neurological disorders. Medical professionals are optimistic about the potential impact of this technology on global healthcare delivery.',
        author: 'Dr. Sarah Johnson',
        category: 'Technology',
        image: 'https://images.pexels.com/photos/3846080/pexels-photo-3846080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        summary: 'New AI system achieves 99% accuracy in medical image analysis, promising to revolutionize healthcare diagnostics.',
        tags: ['ai', 'healthcare', 'technology', 'medical']
      },
      {
        title: 'Global Climate Summit Reaches Historic Agreement',
        content: 'In a landmark decision at the Global Climate Summit, representatives from 195 countries have agreed to ambitious new targets for reducing greenhouse gas emissions. The agreement includes binding commitments to transition to renewable energy sources, implement carbon pricing mechanisms, and invest in green technology infrastructure. This historic accord represents the most comprehensive climate action plan ever adopted internationally. The summit addressed critical issues including deforestation, ocean conservation, and sustainable agriculture practices. Environmental scientists praise the agreement as a crucial step toward limiting global temperature rise to 1.5 degrees Celsius.',
        author: 'Michael Chen',
        category: 'Politics',
        image: 'https://images.pexels.com/photos/3039036/pexels-photo-3039036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        summary: 'Historic climate agreement reached by 195 countries with binding commitments to reduce emissions.',
        tags: ['climate', 'environment', 'politics', 'sustainability']
      },
      {
        title: 'Major Sports Championship Draws Record Viewership',
        content: 'Last nights championship final attracted an unprecedented global audience of over 1.2 billion viewers across traditional television and digital streaming platforms. The thrilling match went into overtime, keeping fans on the edge of their seats until the final moments. This viewership milestone demonstrates the growing global appeal of the sport and the effectiveness of multi-platform broadcasting strategies. Social media engagement reached record levels with over 50 million interactions during the event. The championship also featured innovative broadcast technology including 360-degree camera angles and real-time performance analytics that enhanced the viewing experience for fans worldwide.',
        author: 'Emma Rodriguez',
        category: 'Sports',
        image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        summary: 'Championship final breaks viewership records with 1.2 billion global viewers.',
        tags: ['sports', 'championship', 'viewership', 'broadcasting']
      },
      {
        title: 'Breakthrough in Renewable Energy Storage',
        content: 'Scientists have developed a new battery technology that can store renewable energy for weeks at a time, solving one of the biggest challenges in sustainable energy adoption. This breakthrough could revolutionize how we power our cities and reduce dependence on fossil fuels. The new storage system uses advanced materials that maintain energy density over extended periods without significant degradation. Initial tests show the technology can store solar and wind energy during peak production periods and release it during high-demand times. Energy experts believe this innovation could accelerate the global transition to renewable energy sources.',
        author: 'Dr. James Wilson',
        category: 'Technology',
        image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        summary: 'New battery technology enables weeks-long renewable energy storage, addressing key sustainability challenge.',
        tags: ['renewable energy', 'battery', 'technology', 'sustainability']
      },
      {
        title: 'Blockbuster Film Breaks Box Office Records',
        content: 'The latest installment in the beloved franchise has shattered box office records with a stunning $350 million global opening weekend. The film combines cutting-edge visual effects with compelling storytelling, creating an immersive experience that has captivated audiences worldwide. Critics praise the movies innovative use of technology and its emotional depth, calling it a masterpiece of modern cinema. The production featured groundbreaking filming techniques and an all-star cast that delivered exceptional performances. Industry analysts predict the film will continue its success throughout the coming weeks, potentially becoming one of the highest-grossing films of all time.',
        author: 'Lisa Park',
        category: 'Entertainment',
        image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        summary: 'Franchise sequel breaks box office records with $350 million opening weekend.',
        tags: ['movies', 'box office', 'entertainment', 'cinema']
      }
    ];
    
    await News.insertMany(sampleArticles);
    console.log('Sample articles created');
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
