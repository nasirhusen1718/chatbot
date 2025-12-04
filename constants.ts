import { QuickPrompt, CampusEvent, CampusLocation } from './types';

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  { 
    id: 'tech-park', 
    name: 'Tech Park (Engineering)', 
    description: 'Main hub for CS, AI, and Engineering. Labs open 24/7.', 
    coordinates: { x: 20, y: 20 },
    type: 'academic'
  },
  { 
    id: 'knowledge-hub', 
    name: 'Knowledge Hub (Library)', 
    description: '4 floors of books and study pods. Quiet zone on Level 4.', 
    coordinates: { x: 50, y: 40 },
    type: 'academic'
  },
  { 
    id: 'the-matrix', 
    name: 'The Matrix (Cafeteria)', 
    description: 'Best pizza on campus. Open 7am - 10pm.', 
    coordinates: { x: 75, y: 70 },
    type: 'food'
  },
  { 
    id: 'spartan-arena', 
    name: 'Spartan Arena', 
    description: 'Gym, basketball courts, and Olympic pool.', 
    coordinates: { x: 80, y: 30 },
    type: 'facility'
  },
  { 
    id: 'innovation-center', 
    name: 'Innovation Center', 
    description: 'Startup incubator and co-working space.', 
    coordinates: { x: 30, y: 60 },
    type: 'academic'
  },
];

export const CAMPUS_EVENTS: CampusEvent[] = [
  {
    id: '1',
    title: 'SIT Tech Symposium',
    date: 'Oct 25',
    time: '10:00 AM',
    location: 'Tech Park Auditorium',
    description: 'Annual showcase of student AI and Robotics projects.',
    type: 'academic'
  },
  {
    id: '2',
    title: 'Career Boot Camp',
    date: 'Oct 28',
    time: '2:00 PM',
    location: 'Knowledge Hub, Room 101',
    description: 'Resume reviews and mock interviews with industry pros.',
    type: 'career'
  },
  {
    id: '3',
    title: 'Spartans vs. Titans',
    date: 'Nov 02',
    time: '6:00 PM',
    location: 'Spartan Arena',
    description: 'Championship basketball game. Free entry for students.',
    type: 'sports'
  },
  {
    id: '4',
    title: 'Midnight Hackathon',
    date: 'Nov 05',
    time: '8:00 PM',
    location: 'Innovation Center',
    description: '24-hour coding challenge. Pizza provided.',
    type: 'academic'
  }
];

export const SYSTEM_INSTRUCTION = `
You are "SIT Bot," the official AI Campus Assistant for SIT (Scholars Institute of Technology). 
Your goal is to help students, faculty, and visitors navigate campus life.

**University Knowledge Base:**
- **Name:** SIT (Scholars Institute of Technology)
- **Mascot:** The Spartans
- **Colors:** Crimson and Gold
- **Key Locations:**
${CAMPUS_LOCATIONS.map(l => `  - *${l.name}:* ${l.description}`).join('\n')}

- **Upcoming Events:**
${CAMPUS_EVENTS.map(e => `  - *${e.title}:* ${e.date} at ${e.location}. ${e.description}`).join('\n')}

**Tone & Style:**
- Professional yet approachable.
- Proud of the "Spartan Spirit".
- Helpful and precise.

**Formatting:**
- Use Markdown.
- If asking about location, describe it based on the knowledge base.
`;

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    label: "Lunch Menu",
    prompt: "What's good to eat at The Matrix today?",
    icon: "🍕"
  },
  {
    label: "Study Spots",
    prompt: "Where can I find a quiet place to study?",
    icon: "📖"
  },
  {
    label: "Upcoming Events",
    prompt: "What events are happening on campus this week?",
    icon: "📅"
  },
  {
    label: "Tech Park",
    prompt: "How do I get to the Tech Park?",
    icon: "📍"
  }
];