import React, { useState, useRef, useEffect } from 'react';
import AnnouncementModal from '../Modal/AnnouncementModal';
import axios from 'axios';
import { format } from 'date-fns';

import DefaultPicture from '../Images/Logo.png';
import Picture from '../Images/About-Picture/bg-Picture.jpg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Announcement() {
  const [isAnnouncement, setIsAnnouncement] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overflowingAnnouncements, setOverflowingAnnouncements] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const textRefs = useRef([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/announcements`);
        setAnnouncements(response.data);
        setIsAnnouncement(response.data.length > 0);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setIsAnnouncement(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowingAnnouncements = {};
      textRefs.current.forEach((ref, index) => {
        if (ref) {
          const { scrollHeight, clientHeight } = ref;
          newOverflowingAnnouncements[index] = scrollHeight > clientHeight;
        }
      });
      setOverflowingAnnouncements(newOverflowingAnnouncements);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, [announcements]);

  return (
    <section>
      <div className='relative h-96 w-full bg-cover bg-center' style={{ backgroundImage: `url(${Picture})` }}>
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>

        <div className="relative flex justify-center items-center h-full z-10 p-4 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-20">ANNOUNCEMENT</h1>
        </div>
      </div>

      {!isAnnouncement && (
        <div className='h-96 w-full flex justify-center items-center'>
          <h1 className='text-5xl font-semibold text-green-500'>There is no Announcement</h1>
        </div>
      )}

      {isAnnouncement && (
        <div className='flex flex-wrap justify-center gap-6 p-6'>
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className='flex flex-col sm:flex-row w-full md:w-[500px] bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105'
            >
              <img
                src={announcement.imageUrl || DefaultPicture}
                alt={announcement.title}
                className='w-full sm:w-48 h-48 sm:h-auto object-cover'
              />
              <div className='flex flex-col justify-between p-4 flex-1'>
                <div>
                  <h2 className='text-md font-semibold text-green-500'>{announcement.title}</h2>
                  <p className='text-xs text-gray-400 mb-2'>Posted on: {format(new Date(announcement.createdAt), 'Pp')}</p>
                  <hr />
                </div>
                <div
                  ref={el => (textRefs.current[index] = el)}
                  className='text-sm text-gray-500 overflow-hidden line-clamp-3'
                  dangerouslySetInnerHTML={{ __html: announcement.description }}
                />
                {overflowingAnnouncements[index] && (
                  <button
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setIsModalOpen(true);
                    }}
                    className='text-sm text-green-500 hover:underline mt-2 self-start'
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        announcement={selectedAnnouncement}
      />
    </section>
  );
}

export default Announcement;
