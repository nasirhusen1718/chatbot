import React, { useState } from 'react';
import { CAMPUS_LOCATIONS } from '../constants';

const MapInterface: React.FC = () => {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  const selectedLocation = CAMPUS_LOCATIONS.find(l => l.id === selectedLocationId);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="p-6 bg-white border-b border-slate-200 shadow-sm z-10">
        <h2 className="text-2xl font-bold text-slate-800">Campus Map</h2>
        <p className="text-slate-500 text-sm">Interactive guide to SIT University grounds</p>
      </div>

      <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-slate-100 p-4">
        
        {/* Abstract Map Container */}
        <div className="relative w-full max-w-4xl aspect-[4/3] bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 opacity-10" 
               style={{ 
                 backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
                 backgroundSize: '20px 20px' 
               }}>
          </div>

          {/* Map Elements (Roads/Paths - simplified) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M 20 20 L 50 40 L 80 30" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" />
             <path d="M 50 40 L 30 60 L 75 70" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" />
             <path d="M 50 40 L 75 70" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>

          {/* Locations */}
          {CAMPUS_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocationId(loc.id)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group
                ${selectedLocationId === loc.id ? 'scale-125 z-20' : 'scale-100 z-10 hover:scale-110'}
              `}
              style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
            >
              <div className={`
                flex flex-col items-center gap-2
              `}>
                <div className={`
                  w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4 transition-colors
                  ${selectedLocationId === loc.id 
                    ? 'bg-indigo-600 border-white text-white' 
                    : 'bg-white border-indigo-100 text-indigo-600 group-hover:bg-indigo-50'}
                `}>
                  {loc.type === 'academic' && <span className="text-xl">🎓</span>}
                  {loc.type === 'food' && <span className="text-xl">🍔</span>}
                  {loc.type === 'facility' && <span className="text-xl">🏟️</span>}
                </div>
                <span className={`
                  text-xs font-bold whitespace-nowrap px-2 py-1 rounded-full bg-white/90 shadow-sm border border-slate-100
                  ${selectedLocationId === loc.id ? 'text-indigo-700' : 'text-slate-600'}
                `}>
                  {loc.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Info Card Overlay */}
        {selectedLocation && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 animate-fade-in-up z-30">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{selectedLocation.name}</h3>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{selectedLocation.type}</span>
              </div>
              <button onClick={() => setSelectedLocationId(null)} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              {selectedLocation.description}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
               <button className="flex-1 bg-indigo-50 text-indigo-700 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition-colors">
                 Get Directions
               </button>
               <button className="flex-1 bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors">
                 More Info
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MapInterface;