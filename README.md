# Session Timeline UI

A React-based interactive timeline component for visualizing participant activities during video/audio call sessions.

## Features

- **Interactive Timeline**: Visual representation of participant activities with hover tooltips
- **Event Visualization**: Different colored markers for various events:
  - 🎤 Microphone on/off (Green)
  - 📹 Camera on/off (Blue)
  - ⚠️ Errors (Red)
  - 🖥️ Screen sharing (Purple)
  - Join/Leave markers (Gray)
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Matches the provided Figma design
- **Toggle Controls**: Show/hide participant timeline view

## Technical Implementation

### Architecture
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **TypeScript**: Full type safety for data structures

### Key Components
- `SessionTimeline`: Main timeline component
- `Card`: UI wrapper component
- Interactive tooltip system
- Time marker generation
- Event positioning algorithms

### Data Structure
The component expects JSON data with the following structure:
\`\`\`json
{
  "meetingId": "string",
  "start": "ISO 8601 timestamp",
  "end": "ISO 8601 timestamp", 
  "uniqueParticipantsCount": "number",
  "participantArray": [
    {
      "participantId": "string",
      "name": "string",
      "events": {
        "mic": [{"start": "timestamp", "end": "timestamp"}],
        "webcam": [{"start": "timestamp", "end": "timestamp"}],
        "errors": [{"start": "timestamp", "message": "string"}],
        "screenShare": [{"start": "timestamp", "end": "timestamp"}],
        "screenShareAudio": [{"start": "timestamp", "end": "timestamp"}]
      },
      "timelog": [{"start": "timestamp", "end": "timestamp"}]
    }
  ]
}
\`\`\`

## Setup Instructions

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**:
   \`\`\`bash
   npm run build
   \`\`\`

## Usage

Import and use the SessionTimeline component:

\`\`\`tsx
import SessionTimeline from '@/components/session-timeline'

const sessionData = {
  // Your JSON data here
}

export default function App() {
  return <SessionTimeline data={sessionData} />
}
\`\`\`

## Key Features Implemented

### Timeline Visualization
- Horizontal timeline with time markers
- Participant rows with activity bars
- Proportional event positioning based on timestamps

### Event Types
- **Microphone Events**: Green circles with mic icon
- **Camera Events**: Blue circles with camera icon  
- **Error Events**: Red circles with warning icon
- **Screen Share**: Purple circles with monitor icon
- **Join/Leave**: Gray circles with J/L text

### Interactivity
- Hover tooltips showing event details and timestamps
- Toggle to show/hide participant timeline
- Responsive design for mobile and desktop

### Error Handling
- Graceful handling of missing data
- Fallback for participants without events
- Safe timestamp parsing and positioning

## Code Structure

\`\`\`
components/
├── session-timeline.tsx    # Main timeline component
├── ui/
│   └── card.tsx           # UI card component
app/
├── page.tsx               # Main page with sample data
└── globals.css            # Global styles
\`\`\`

## Performance Considerations

- Memoized time marker calculations
- Efficient event positioning algorithms
- Minimal re-renders with proper React patterns
- Optimized for sessions with multiple participants

## Browser Compatibility

- Modern browsers supporting ES6+
- Responsive design for mobile and desktop
- Tested on Chrome, Firefox, Safari, Edge
