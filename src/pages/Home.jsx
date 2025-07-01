import React from 'react';
import Banner from './Banner';
import Marathons from './Marathons';
import UpcomingMarathonsSection from './UpcomingMarathonsSection';
import WhyJoinSection from './WhyJoinSection';
import HowToPrepareSection from './HowToPrepareSection';
import useTitle from '../hooks/useTitle';
import { motion } from "framer-motion";
const Home = () => {
    useTitle("MarathonPro | Home");
    return (
        <div className="text-center mt-7">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="text-4xl md:text-5xl font-extrabold text-center my-8"
            >
                <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                    Welcome to Marathon Management System
                </span>
            </motion.h1>
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
