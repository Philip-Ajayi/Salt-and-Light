// App.jsx
import React, { useState, useEffect } from 'react';

const programData = [
  {
    date: 'Monday, October 14',
    sessions: [
      {
        time: '5:30 PM - 8:30 PM',
        name: 'Salt and Light',
        subPrograms: [
          { name: `Daniel's call`, topic: 'Tech & IT' },
          { name: `Ezekiel's call` },
        ],
      },
    ],
  },
  {
    date: 'Tuesday, October 15',
    sessions: [
      {
        time: '6:30 AM - 7:30 AM',
        name: 'Shiftings and Turnings',
      },
      {
        time: '11:00 AM - 1:00 PM',
        name: 'Certificated Skill Trainings/ Courses',
        subPrograms: [
          { name: 'Health Safety & Environment (HSE)' },
          { name: 'Project Management' },
        ],
      },
      {
        time: '1:30 PM - 2:45 PM',
        name: 'School of Ministry',
        subPrograms: [
          { name: 'Pastors, Prophets, Evangelists, Teachers, Church Administrator' },
          { name: 'Youth School Campus' },
          { name: 'Arts, Music, Drama, Media' },
        ],
      },
      {
        time: '2:45 PM - 4:30 PM',
        name: 'Opportunity Fair',
      },
      {
        time: '5:30 PM - 8:30 PM',
        name: 'Salt and Light',
        subPrograms: [
          { name: `Daniel's call`, topic: 'Entrepreneurship' },
          { name: `Ezekiel's call` },
        ],
      },
    ],
  },
  {
    date: 'Wednesday, October 16',
    sessions: [
      {
        time: '6:30 AM - 7:30 AM',
        name: 'Shiftings and Turnings',
      },
      {
        time: '11:00 AM - 1:00 PM',
        name: 'Certificated Skill Trainings/ Courses',
        subPrograms: [
          { name: 'Health Safety & Environment (HSE)' },
          { name: 'Project Management' },
        ],
      },
      {
        time: '1:30 PM - 2:45 PM',
        name: 'School of Ministry',
        subPrograms: [
          { name: 'Pastors, Prophets, Evangelists, Teachers, Church Administrator' },
          { name: 'Youth School Campus' },
          { name: 'Arts, Music, Drama, Media' },
        ],
      },
      {
        time: '2:45 PM - 4:30 PM',
        name: 'Opportunity Fair',
      },
      {
        time: '5:30 PM - 8:30 PM',
        name: 'Salt and Light',
        subPrograms: [
          { name: `Daniel's call`, topic: 'Corporate Services' },
          { name: `Ezekiel's call` },
        ],
      },
    ],
  },
  {
    date: 'Thursday, October 17',
    sessions: [
      {
        time: '6:30 AM - 7:30 AM',
        name: 'Shiftings and Turnings',
      },
      {
        time: '11:00 AM - 1:00 PM',
        name: 'Certificated Skill Trainings/ Courses',
        subPrograms: [
          { name: 'Health Safety & Environment (HSE)' },
          { name: 'Project Management' },
        ],
      },
      {
        time: '1:30 PM - 2:45 PM',
        name: 'School of Ministry',
        subPrograms: [
          { name: 'Pastors, Prophets, Evangelists, Teachers, Church Administrator' },
          { name: 'Youth School Campus' },
          { name: 'Arts, Music, Drama, Media' },
        ],
      },
      {
        time: '2:45 PM - 4:30 PM',
        name: 'Opportunity Fair',
      },
      {
        time: '5:30 PM - 8:30 PM',
        name: 'Salt and Light',
        subPrograms: [
          { name: `Daniel's calls`, topic: 'Academics' },
          { name: `Ezekiel's call` },
        ],
      },
    ],
  },
  {
    date: 'Friday, October 18',
    sessions: [
      {
        time: '6:30 AM - 7:30 AM',
        name: 'Shiftings and Turnings',
      },
      {
        time: '11:00 AM - 1:00 PM',
        name: 'Certificated Skill Trainings/ Courses',
        subPrograms: [
          { name: 'Health Safety & Environment (HSE)' },
          { name: 'Project Management' },
        ],
      },
      {
        time: '1:30 PM - 2:45 PM',
        name: 'School of Ministry',
        subPrograms: [
          { name: 'Pastors, Prophets, Evangelists, Teachers, Church Administrator' },
          { name: 'Youth School Campus' },
          { name: 'Arts, Music, Drama, Media' },
        ],
      },
      {
        time: '2:45 PM - 4:30 PM',
        name: 'Opportunity Fair',
      },
      {
        time: '5:30 PM - 8:30 PM',
        name: 'Salt and Light',
        subPrograms: [
          { name: `Daniel's calls`, topic: 'Politics' },
          { name: `Ezekiel's call` },
        ],
      },
    ],
  },
];

const Content = () => {
  const [activeDate, setActiveDate] = useState('');
  
  useEffect(() => {
    const today = new Date();
    const startDate = new Date('2024-10-14');
    const endDate = new Date('2024-10-18');

    if (today < startDate) {
      setActiveDate(programData[0].date); // Set to first date if current date is before
    } else if (today > endDate) {
      setActiveDate(programData[programData.length - 1].date); // Set to last date if current date is after
    } else {
      const currentDateStr = `${today.toLocaleString('default', { weekday: 'long' })}, ${today.toLocaleString('default', { month: 'long' })} ${today.getDate()}`;
      setActiveDate(currentDateStr); // Set active date to today
    }
  }, []);

  return (
    <div className="flex bg-white">
      {/* Side Menu */}
      <div className="w-64 bg-gradient-to-b from-[#4f0981] via-[#c63cd8] to-[#9733d7] text-white p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Program Dates</h2>
        <ul className="space-y-2 flex-grow">
          {programData.map((program) => (
            <li
              key={program.date}
              className={`p-2 rounded cursor-pointer transition duration-300 transform hover:scale-105 ${activeDate === program.date ? 'bg-purple-700' : ''}`}
              onClick={() => setActiveDate(program.date)}
            >
              {program.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8 overflow-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-6">Program Outline</h1>
        {programData.map((program) => (
          <div key={program.date} className={`mb-10 ${activeDate === program.date ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-semibold text-purple-800">{program.date}</h2>
            {program.sessions.map((session, index) => (
              <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow-md border border-gray-300 transition duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-purple-800">{session.name}</h3>
                <p className="text-gray-600 font-semibold">{session.time}</p>
                {session.subPrograms && (
                  <ul className="mt-2 list-disc list-inside text-gray-700">
                    {session.subPrograms.map((subProgram, subIndex) => (
                      <li key={subIndex} className="flex items-center">
                        <span className="text-gray-600">{subProgram.name}</span>
                        {subProgram.topic && (
                          <span className="ml-2 text-sm text-gray-500">({subProgram.topic})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
