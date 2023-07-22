import { useEffect, useState } from 'react';
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


    const [loadingSetup, setLoadingSetup] = useState(true)

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
        setTimeout(() => setLoadingSetup(false), 2000)
    }

    // const setUpDefaultValueLocalStorage = async () => {
        // localStorage.setItem('numberHoldRandom', 0);
    // }


    const playSound = (lang, messageSpeech, speedRate=0.8) => {
        const speechSynthesis = new SpeechSynthesisUtterance();
        // speechSynthesis.voiceURI = 'native';
        speechSynthesis.volume = 1; // 0 to 1
        // speechSynthesis.rate = speedRate; // 0.1 to 10
        // speechSynthesis.pitch = 2; //0 to 2
        if (lang === 'th') {
            speechSynthesis.lang = 'th-TH';
        } else if (lang === 'en') {
            speechSynthesis.lang = 'en-US';
        }
        speechSynthesis.text = messageSpeech;
        window.speechSynthesis.speak(speechSynthesis);
    }


    useEffect(() => {

        (async () => {
            await setUpLocalStorage();
            // await setUpDefaultValueLocalStorage();
        })()
        
    }, [])
    

    if (loadingSetup) return <p className='text-white text-lg p-4'>Loading...</p>
    
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
                    <div className={`duration-1000 wh-full gap-6 overflow-y-auto fullXl:overflow-hidden grid-app 
                        `}>
                        {/* ${statusOnRandomCutout ? 'grid-cols-[2fr_3fr_2fr] w-full' : 'grid-cols-[2fr_2.2fr_2fr] w-full layoutCardOriginals'} */}
                        <div className={`cardContent participantList duration-1000`}>
                            <ParticipantList playSound={playSound} />
                        </div>
                        <div className='cardContent'>
                            <HoldParticipantRandom playSound={playSound} />
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
