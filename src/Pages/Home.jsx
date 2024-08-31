import React, { useEffect, useContext } from 'react';
import Hero from "../Components/Hero";
import About from "../Pages/About";
import Location from "./Location";
import TrackRequest from "./TrackRequest";
// import { ActiveSectionContext } from '../Components/ActiveSectionContext';
import Captain from './Captain';
import Officials from './Officials';

function Home() {
  // const { setActiveSection } = useContext(ActiveSectionContext);

  // useEffect(() => {
  //   const sections = document.querySelectorAll('section[id]');
  //   const options = {
  //     root: null,
  //     rootMargin: '0px',
  //     threshold: 0.3,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       console.log(`Observed section: ${entry.target.id}, isIntersecting: ${entry.isIntersecting}`);
  //       if (entry.isIntersecting) {
  //         setActiveSection(`#${entry.target.id}`);
  //         window.history.replaceState(null, '', `#${entry.target.id}`);
  //       }
  //     });
  //   }, options);

  //   sections.forEach((section) => {
  //     observer.observe(section);
  //   });

  //   return () => {
  //     sections.forEach((section) => {
  //       observer.unobserve(section);
  //     });
  //   };
  // }, [setActiveSection]);

  return (
    <main>
      <section ><Hero /></section>
      <section ><Captain /></section>
      <section ><Officials /></section>
      <section ><Location /></section>
    </main>
  );
}

export default Home;
