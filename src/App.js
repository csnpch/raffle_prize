import { useEffect } from 'react';

import { Dialogs } from './components/Dialogs'
import { GiftAnimate } from './components/GiftAnimate'
import { SnowAnimate } from './components/SnowAnimate'
// import { Fireworks } from './components/Fireworks'
import { ChristmasTree } from './components/ChristmasTree'

import { ParticipantList } from './components/ParticipantList'
import { HoldParticipantRandom } from './components/HoldParticipantRandom'


function App() {

    const getDataFromLocalStorage = async (key, val) => {
        localStorage.getItem(key) || localStorage.setItem(key, JSON.stringify(val));
    }

    useEffect(() => {

        getDataFromLocalStorage('participants', []);
        getDataFromLocalStorage('participantsOnHold', []);
        getDataFromLocalStorage('gift', []);
        getDataFromLocalStorage('numberHoldRandom', 0);
        getDataFromLocalStorage('statusHoldNewRandom', false);
        getDataFromLocalStorage('statusRandomHold', false);

    }, [])
    


    
    return (
        <>
            <div className="main-container relative">
                
                {/* background image */}
                <div className="fixed wh-full top-0 right-0">
                    <img className='bg-img' src="https://images.unsplash.com/photo-1513273216459-54c4833d6b4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
                
                <div className="sub-container relative">

                    <Dialogs className='z-50' />
                    <SnowAnimate />
                    {/* <Fireworks /> */}

                     
                    <div className='wh-full gap-6 fullXl:gap-8 grid grid-cols-[2fr_3fr_2fr] fullXl:grid-cols-3 justify-items-center'>
                        <div className='cardContent'>
                            <ParticipantList />
                        </div>
                        <div className='cardContent'>
                            <HoldParticipantRandom />
                        </div>
                        <div className='cardGift'>
                            
                        </div>
                    </div>


                    <div className='absolute -bottom-20 -right-20 fullXl:bottom-0 fullXl:right-10'>
                        <GiftAnimate />
                    </div>
                    
                </div>

                
                <div className='absolute -bottom-20 -left-28 fullXl:bottom-0 fullXl:-left-16 opacity-90'>
                    <ChristmasTree />
                </div>

            </div>

        </>
    )
}

export default App
