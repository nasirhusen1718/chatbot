import React from 'react';
import { CAMPUS_EVENTS } from '../constants';
import { CampusEvent } from '../types';

const EventCard: React.FC<{ event: CampusEvent }> = ({ event }) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-700';
      case 'sports': return 'bg-orange-100 text-orange-700';
      case 'career': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-3">
        <div className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getBadgeColor(event.type)}`}>
          {event.type}
        </div>
        <div className="text-center bg-slate-50 rounded-lg p-2 border border-slate-100 min-w-[60px]">
          <div className="text-xs text-slate-500 font-medium uppercase">{event.date.split(' ')[0]}</div>
          <div className="text-lg font-bold text-slate-800">{event.date.split(' ')[1]}</div>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
        </svg>
        {event.time}
      </div>
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.006.003.002.001.003.001.006.003.018.008zM9.5 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
        </svg>
        {event.location}
      </div>
      
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        {event.description}
      </p>

      <button className="w-full py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:text-indigo-600 transition-colors">
        View Details
      </button>
    </div>
  );
}

const EventsInterface: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="p-6 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Campus Events</h2>
                <p className="text-slate-500 text-sm">Discover what's happening at SIT</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                + Submit Event
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAMPUS_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsInterface;