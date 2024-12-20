import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';

import Image1 from '../Images/About-Picture/About-Picture.jpg';
import Image2 from '../Images/About-Picture/About-Picture2.jpg';
import Image3 from '../Images/About-Picture/About-Picture3.jpg';
import Image4 from '../Images/About-Picture/About-Picture4.jpg';
import Image5 from '../Images/About-Picture/About-Picture5.jpg';
import Image6 from '../Images/About-Picture/About-Picture6.jpg';
import Image7 from '../Images/About-Picture/About-Picture7.jpg';
import Image8 from '../Images/About-Picture/About-Picture8.jpg';
import { div } from 'three/webgpu';
import HistorySection from '../Components/HistorySection';
import AccomplishmentSection from '../Components/AccomplishmentSection';

function About() {
    const [ActiveAboutTab, setActiveAboutTab] = useState('Mission');

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <section className='mb-10 h-fit lg:mx-20 mt-10 lg:mt-0'>
            <div className='max-w-screen-xl mx-auto'>
                <div className="relative w-full h-72 bg-cover bg-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-10 pt-10 mt-48 lg:mt-0">
                            <h1 className="text-5xl font-bold mb-4 text-green-500">About Barangay Balon Anito</h1>
                            <p className="text-2xl text-green-500">Welcome to Barangay Balon Anito, a vibrant and inclusive community.</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row mx-0 lg:mx-10 wrap'>
                    <div className='w-full lg:w-1/2 img-full lg:h-auto mt-48 lg:mt-0 md:mt-24 sm:mt-24'>
                        <Slider {...settings} className='img-full h-full'>
                            <div>
                                <img src={Image1} alt="Image 1" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image2} alt="Image 2" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image3} alt="Image 3" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image4} alt="Image 4" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image5} alt="Image 5" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image6} alt="Image 6" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image7} alt="Image 7" className='w-full h-full object-cover' />
                            </div>
                            <div>
                                <img src={Image8} alt="Image 8" className='w-full h-full object-cover' />
                            </div>
                        </Slider>
                    </div>

                    <div className='w-full lg:w-1/2 lg:mt-5 ml-0 lg:-ml-10 mt-7 border-r-2 margin-right border-green-500 bg-white p-3 z-10 shadow-xl drop-shadow-xl'>
                        <div className='flex gap-2'>
                            <button className={`${ActiveAboutTab === 'Mission' ? 'bg-green-500 text-white' : 'hover:text-green-500 hover:border-b-green-500 border-b-2'} p-2 mb-5`} onClick={() => setActiveAboutTab('Mission')}>
                                Mission
                            </button>

                            <button className={`${ActiveAboutTab === 'Vision' ? 'bg-green-500 text-white' : 'hover:text-green-500 hover:border-b-green-500 border-b-2'} p-2 mb-5`} onClick={() => setActiveAboutTab('Vision')}>
                                Vision
                            </button>

                            <button className={`${ActiveAboutTab === 'Goal' ? 'bg-green-500 text-white' : 'hover:text-green-500 hover:border-b-green-500 border-b-2'} p-2 mb-5`} onClick={() => setActiveAboutTab('Goal')}>
                                Goal
                            </button>
                        </div>

                        {ActiveAboutTab === 'Mission' && (
                            <div>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatum error omnis alias nihil consequuntur, sed aliquid autem temporibus numquam minus vel repudiandae, minima dolore exercitationem perspiciatis aperiam laborum aut?</p>
                            </div>
                        )}

                        {ActiveAboutTab === 'Vision' && (
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum a fugit animi deserunt ad in dolor, nulla commodi tempora deleniti, omnis accusamus doloremque exercitationem explicabo nihil maxime culpa ab praesentium?
                                    Error temporibus beatae eligendi animi natus distinctio sequi, omnis eum? Ratione magni nam aliquid perferendis, quia rerum consequuntur cumque, voluptas expedita optio sequi obcaecati deserunt a molestias vero? Dicta, voluptatem?</p>
                            </div>
                        )}

                        {ActiveAboutTab === 'Goal' && (
                            <div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt quisquam, alias officiis perferendis placeat amet dolorum molestias consequuntur reprehenderit quaerat explicabo sequi provident unde est adipisci accusamus mollitia. Facilis, deserunt?
                                    Nemo veniam nam doloremque, atque similique at quos? Mollitia ullam, vel provident molestiae cum commodi nam, asperiores beatae dolorem, quia nemo dicta aliquam delectus nihil adipisci cupiditate ut cumque.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col mx-0 lg:mx-10 wrap mt-20 mb-0 md:flex-row border-b-2 border-green-500">
                <HistorySection/>
            </div>
            
            <div className="relative w-full h-72 bg-cover bg-center mb-20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-10 pt-10 mt-48 lg:mt-0">
                        <h1 className="text-2xl font-bold mb-4 text-green-500">Accomplishments</h1>
                        <p className="text-lg text-black">
                        Barangay Balon Anito has been recognized for numerous achievements in recent years,
                        demonstrating its commitment to serving the community. Some of the notable accomplishments
                        include:</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mx-0 lg:mx-10 wrap mt-0 md:flex-row mb-10">
                <AccomplishmentSection/>
            </div>
            
        </section>


        
    );
}

export default About;
