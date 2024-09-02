import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { albumsData, assets } from '../assets/assets';

const DisplayAlbum = () => {
  const { id } = useParams();
  
  // Accessing the specific album data using the id
  const album = albumsData[id];

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className='w-48 rounded' src={album.image} alt={album.title} />
        <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumsData.name}</h2>
            <h4>{albumsData.desc}</h4>
            <p className='mt-1'>
                <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                <b> Spotify</b>
                •1,323,154 likes
                •<b>50 songs, </b>
                About 2 hours 30 minutes 
            </p>
        </div>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p>
            <b className='mr-4'>
                #
            </b>
            Title
        </p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />

      </div>
    </>
  );
};

export default DisplayAlbum;
