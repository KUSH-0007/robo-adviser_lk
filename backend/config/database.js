const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-finance', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await createIndexes();
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // User indexes
    await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.db.collection('users').createIndex({ 'portfolio.totalValue': -1 });
    await mongoose.connection.db.collection('users').createIndex({ 'financialHealthScore.score': -1 });
    
    // Portfolio indexes
    await mongoose.connection.db.collection('portfolios').createIndex({ userId: 1 });
    await mongoose.connection.db.collection('portfolios').createIndex({ 'assets.symbol': 1 });
    
    // Transaction indexes
    await mongoose.connection.db.collection('transactions').createIndex({ userId: 1 });
    await mongoose.connection.db.collection('transactions').createIndex({ date: -1 });
    await mongoose.connection.db.collection('transactions').createIndex({ symbol: 1 });
    
    // News indexes
    await mongoose.connection.db.collection('news').createIndex({ publishedAt: -1 });
    await mongoose.connection.db.collection('news').createIndex({ category: 1 });
    await mongoose.connection.db.collection('news').createIndex({ tags: 1 });
    
    // Crypto price indexes
    await mongoose.connection.db.collection('cryptoprices').createIndex({ symbol: 1, timestamp: -1 });
    await mongoose.connection.db.collection('cryptoprices').createIndex({ timestamp: -1 });
    
    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error.message);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('📊 MongoDB Disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
  }
};

module.exports = { connectDB, disconnectDB };


