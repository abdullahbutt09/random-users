import React, { useEffect, useState } from 'react'
import { Copy, Check, User, Mail, Phone, MapPin, Calendar, Globe } from 'lucide-react'

function App({count}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=${count}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        console.log('Fetch attempt completed');
      }
    }
    fetchData();
  }, [count]);

  const copyUserDetails = async (user, index) => {
    const userDetails = `
Name: ${user.name.title} ${user.name.first} ${user.name.last}
Email: ${user.email}
Gender: ${user.gender}
Age: ${user.dob.age} (Born: ${new Date(user.dob.date).toLocaleDateString()})
Phone: ${user.phone}
Cell: ${user.cell}
Nationality: ${user.nat}
Location: ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} - ${user.location.postcode}
    `.trim();

    try {
      await navigator.clipboard.writeText(userDetails);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Random Users
        </h1>
        <p className="text-slate-400">Generated {count} random user{count > 1 ? 's' : ''}</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          <p className="text-white ml-4 text-lg">Loading users...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-md mx-auto bg-red-900/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-red-400 text-center">Error: {error}</p>
        </div>
      )}

      {/* Users Grid */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {data.data.data.map((user, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15"
            >
              {/* User Number & Copy Button */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  User #{index + 1}
                </span>
                <button
                  onClick={() => copyUserDetails(user, index)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    copiedIndex === index 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title="Copy user details"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={user.picture.large} 
                    alt={`${user.name.first} ${user.name.last}`} 
                    className="w-16 h-16 rounded-full border-3 border-white/30 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white leading-tight">
                    {user.name.title} {user.name.first} {user.name.last}
                  </h2>
                  <p className="text-purple-200 text-sm flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/90">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    <span className="text-white/70">Gender:</span> {user.gender}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    <span className="text-white/70">Age:</span> {user.dob.age} years old
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/90">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    <span className="text-white/70">Phone:</span> {user.phone}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/90">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    <span className="text-white/70">Cell:</span> {user.cell}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/90">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">
                    <span className="text-white/70">Nationality:</span> {user.nat}
                  </span>
                </div>

                <div className="flex items-start gap-3 text-white/90">
                  <MapPin className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span className="text-sm flex-1">
                    <span className="text-white/70">Location:</span><br />
                    {user.location.street.number} {user.location.street.name},<br />
                    {user.location.city}, {user.location.state}<br />
                    {user.location.country} - {user.location.postcode}
                  </span>
                </div>
              </div>

              {/* Birth Date */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60 text-center">
                  Born: {new Date(user.dob.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Copy Success Indicator */}
              {copiedIndex === index && (
                <div className="mt-3 text-center">
                  <span className="text-green-400 text-xs font-medium">
                    ✓ User details copied to clipboard!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App