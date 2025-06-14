import React from 'react';
import Banner from './Banner';
import Marathons from './Marathons';
import UpcomingMarathonsSection from './UpcomingMarathonsSection';
import WhyJoinSection from './WhyJoinSection';
import HowToPrepareSection from './HowToPrepareSection';

const Home = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-3xl font-bold">Welcome to Marathon Management System</h1>
            <Banner></Banner>
            <div className='mt-10'>
                <Marathons></Marathons>
            </div>
            <div className='mt-10'>
                <UpcomingMarathonsSection></UpcomingMarathonsSection>
            </div>
            <div className='mt-10'>
                <WhyJoinSection></WhyJoinSection>
            </div>
             <div className='mt-10'>
                <HowToPrepareSection></HowToPrepareSection>
            </div>
        </div>
    );
};

export default Home;
