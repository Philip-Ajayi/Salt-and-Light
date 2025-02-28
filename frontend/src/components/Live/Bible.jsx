import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Redlogo from '../../assets/Logo.png';

const bibleBooks = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1Samuel', '2Samuel', '1Kings',
  '2Kings', '1Chronicles', '2Chronicles', 'Ezra', 'Nehemiah',
  'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes',
  'SongOfSolomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
  'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark',
  'Luke', 'John', 'Acts', 'Romans', '1Corinthians',
  '2Corinthians', 'Galatians', 'Ephesians', 'Philippians',
  'Colossians', '1Thessalonians', '2Thessalonians', '1Timothy',
  '2Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1Peter', '2Peter', '1John', '2John', '3John', 'Jude', 'Revelation'
];

function Bible() {
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [verses, setVerses] = useState([]);
  const [chapterCount, setChapterCount] = useState(50);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchChapterContent(selectedBook, selectedChapter);
  }, [selectedBook, selectedChapter]);

  const fetchChapterContent = async (book, chapter) => {
    try {
      const response = await axios.get(`https://bible-api.com/${book}+${chapter}`);
      const versesArray = response.data.verses.map((verse) => ({
        verseNumber: verse.verse,
        text: verse.text,
      }));
      setVerses(versesArray);
      setError('');
    } catch (error) {
      console.error('Error fetching chapter content:', error);
      setError('Error fetching chapter content. Please try again.');
    }
  };

  const handleBookChange = (event) => {
    const newBook = event.target.value;
    setSelectedBook(newBook);
    setSelectedChapter(1);

    const chapters = {
      Genesis: 50,
      Exodus: 40,
      Leviticus: 27,
      Numbers: 36,
      Deuteronomy: 34,
      Joshua: 24,
      Judges: 21,
      Ruth: 4,
      "1Samuel": 31,  // Wrapped in quotes
      "2Samuel": 24,  // Wrapped in quotes
      "1Kings": 22,   // Wrapped in quotes
      "2Kings": 25,   // Wrapped in quotes
      "1Chronicles": 29,
      "2Chronicles": 36,
      Ezra: 10,
      Nehemiah: 13,
      Esther: 10,
      Job: 42,
      Psalms: 150,
      Proverbs: 31,
      Ecclesiastes: 12,
      SongOfSolomon: 8,
      Isaiah: 66,
      Jeremiah: 52,
      Lamentations: 5,
      Ezekiel: 48,
      Daniel: 12,
      Hosea: 14,
      Joel: 3,
      Amos: 9,
      Obadiah: 1,
      Jonah: 4,
      Micah: 7,
      Nahum: 3,
      Habakkuk: 3,
      Zephaniah: 3,
      Haggai: 2,
      Zechariah: 14,
      Malachi: 4,
      Matthew: 28,
      Mark: 16,
      Luke: 24,
      John: 21,
      Acts: 28,
      Romans: 16,
      "1Corinthians": 16,
      "2Corinthians": 13,
      Galatians: 6,
      Ephesians: 6,
      Philippians: 4,
      Colossians: 4,
      "1Thessalonians": 5,
      "2Thessalonians": 3,
      "1Timothy": 6,
      "2Timothy": 4,
      Titus: 3,
      Philemon: 1,
      Hebrews: 13,
      James: 5,
      "1Peter": 5,
      "2Peter": 3,
      "1John": 5,
      "2John": 1,
      "3John": 1,
      Jude: 1,
      Revelation: 22,
    };    
    setChapterCount(chapters[newBook] || 1);
  };

  const handleChapterChange = (event) => {
    setSelectedChapter(Number(event.target.value));
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6 w-full">
        <img src={Redlogo} alt="Bible Logo" className="h-16 mr-3" />
        <h1 className="text-4xl font-bold text-purple-800">Bible App</h1>
      </div>

      <div className="flex w-full justify-between mb-6">
        <div className="flex items-center">
          <label className="mr-4">
            <span className="font-semibold">Select Book:</span>
            <select value={selectedBook} onChange={handleBookChange} className="ml-2 p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              {bibleBooks.map((book, index) => (
                <option key={index} value={book}>{book}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center">
          <label>
            <span className="font-semibold">Select Chapter:</span>
            <select value={selectedChapter} onChange={handleChapterChange} className="ml-2 p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              {[...Array(chapterCount).keys()].map((chapter) => (
                <option key={chapter + 1} value={chapter + 1}>{chapter + 1}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Bible Chapter Content */}
      {error && <p className="text-red-600">{error}</p>}
      <div className="chapter-content w-full max-w-3xl bg-white p-4 rounded-lg shadow-lg" style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <h2 className="text-3xl font-semibold mb-4">{selectedBook} {selectedChapter}</h2>
        {verses.map((verse, index) => (
          <p key={index} className="mb-1 text-gray-700"><strong className="text-purple-600">{verse.verseNumber}:</strong> {verse.text}</p>
        ))}
      </div>
    </div>
  );
}

export default Bible;
