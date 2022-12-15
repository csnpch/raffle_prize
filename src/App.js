import { useEffect } from 'react';
import { useStoreState } from 'easy-peasy';

import { Dialogs } from './components/Dialogs'
import { Gift } from './components/Gift'
import { GiftAnimate } from './components/GiftAnimate'
import { SnowAnimate } from './components/SnowAnimate'
import { Fireworks } from './components/Fireworks'
import { ChristmasTree } from './components/ChristmasTree'

import { ParticipantList } from './components/ParticipantList'
import { HoldParticipantRandom } from './components/HoldParticipantRandom'


function App() {

    const statusRandomCutoutFN = useStoreState((state) => state.statusRandomCutoutFN);
    const statusOnRandomCutout = useStoreState((state) => state.statusOnRandomCutout);

    const getDataFromLocalStorage = async (key, val) => {
        localStorage.getItem(key) || localStorage.setItem(key, JSON.stringify(val));
    }


    const setUpLocalStorage = async () => {
        getDataFromLocalStorage('participants', []);
        getDataFromLocalStorage('participantsOnHold', []);
        getDataFromLocalStorage('gift', []);
        getDataFromLocalStorage('numberHoldRandom', 0);
        getDataFromLocalStorage('statusHoldNewRandom', true);
        getDataFromLocalStorage('statusRandomHold', false);
    }

    // const setUpDefaultValueLocalStorage = async () => {
        // localStorage.setItem('numberHoldRandom', 0);
    // }

    useEffect(() => {

        (async () => {
            await setUpLocalStorage();
            // await setUpDefaultValueLocalStorage();
        })()
        
    }, [])
    


    
    return (
        <>
            <div className={`main-container relative`}>
                
                {/* background image */}
                <div className="fixed wh-full top-0 right-0">
                    <img className='bg-img' src="https://images.unsplash.com/photo-1513273216459-54c4833d6b4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
                
                <div className="sub-container">

                    <Dialogs className='z-50' />
                    <SnowAnimate />
                    { statusRandomCutoutFN && <Fireworks /> }
                    <div className={`duration-1000 wh-full gap-6 fullXl:gap-8 grid fullXl:grid-cols-3 justify-items-center
                    `}>
                        ${statusOnRandomCutout ? 'grid-cols-[2fr_3fr_2fr] w-full' : 'grid-cols-[2fr_2.2fr_2fr] w-full layoutCardOriginals'}
                        <div className={`cardContent participantList duration-1000`}>
                            <ParticipantList />
                        </div>
                        <div className='cardContent'>
                            <HoldParticipantRandom />
                        </div>
                        <div className='cardGift'>
                            <Gift />
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
