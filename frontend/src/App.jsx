import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Entertainment from './pages/Logins/Entertainment';
import HSE from './pages/Logins/HSE';
import Influence from './pages/Logins/Influence';
import Ministers from './pages/Logins/Ministers';
import Project from './pages/Logins/Project';
import Shiftings from './pages/Logins/Shiftings';
import Youth from './pages/Logins/Youth';
import Attendees from './pages/Atttendees';
import Contact from './pages/Contact';
import Give from './pages/Give';
import Home from './pages/Home';
import Radio from './pages/Radio';
import Register from './pages/Register';
import Registered from './pages/Registered';
import Session from './pages/Session';
import SessionList from './pages/SessionList';
import Speaker from './pages/Speaker';
import SpeakerBio from './pages/SpeakerBio';
import WatchLive from './pages/WatchLive';
import Success from './pages/Success';
import Header from './components/Main/Header';
import Footer from './components/Main/Footer';
import WhatsAppButton from './components/Main/WhatsAppButton';
import Sermon from './components/Sermon/Sermon';
import SermonVideo from './components/Sermon/SermonVideo';
import Post from './components/Sermon/Post';
import Spotify from './components/Sermon/Spotify';
import SpotifyAudio from './components/Sermon/SpotifyAudio';
import InstagramFeed from './pages/Image';
import HHH from './pages/HHH';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Normal Routes */}
            <Route path="/" element={<HHH />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/minister" element={<Speaker />} />
            <Route path="/minister/:id" element={<SpeakerBio />} />
            <Route path="/sessionlist" element={<SessionList />} />
            <Route path="/session" element={<Session />} />
            <Route path="/registered" element={<Registered />} />
            <Route path="/live" element={<WatchLive />} />
            <Route path="/register" element={<Register />} />
            <Route path="/give" element={<Give />} />
            <Route path="/radio" element={<Radio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/attendees" element={<Attendees />} />
            <Route path="/youth" element={<Youth />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/hse" element={<HSE />} />
            <Route path="/influence" element={<Influence />} />
            <Route path="/ministers" element={<Ministers />} />
            <Route path="/project" element={<Project />} />
            <Route path="/shiftings" element={<Shiftings />} />
            <Route path="/sermon" element={<Sermon />} />
            <Route path="/sermon/:videoId" element={<SermonVideo />} />            
            <Route path="/post" element={<Post />} />
            <Route path="/audio" element={<Spotify />} />
            <Route path="/spotify/:trackId" element={<SpotifyAudio />} />
            <Route path="/image" element={<InstagramFeed />} />
            
            {/* Catch-all Route for Undefined Paths */}
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton/>
      </div>
    </BrowserRouter>
  );
}

export default App;
