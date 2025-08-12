import mongoose from 'mongoose';

// URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true, trim: true },
  shortCode: { type: String, required: true, unique: true, trim: true },
  shortUrl: { type: String, required: true, trim: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export async function getServerSideProps(context) {
  const { shortCode } = context.params;

  console.log('🔍 Redirect request for shortCode:', shortCode);

  try {
    await connectDB();

    const url = await Url.findOne({ shortCode });

    if (!url) {
      console.log('❌ Short code not found:', shortCode);
      return {
        notFound: true,
      };
    }

    console.log('✅ Found URL:', url.longUrl);
    console.log('📊 Current clicks:', url.clicks);

    // Increment click count
    url.clicks += 1;
    await url.save();

    console.log('🔄 Redirecting to:', url.longUrl);

    return {
      redirect: {
        destination: url.longUrl,
        permanent: false,
      },
    };
  } catch (error) {
    console.error('❌ Redirect error:', error);
    return {
      notFound: true,
    };
  }
}

export default function RedirectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
