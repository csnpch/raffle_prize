import * as React from 'react';

import { Dialogs } from './components/Dialogs'
import { GiftAnimate } from './components/GiftAnimate'
import { SnowAnimate } from './components/SnowAnimate'
// import { Fireworks } from './components/Fireworks'
import { ChristmasTree } from './components/ChristmasTree'

import { ParticipantList } from './components/ParticipantList'


function App() {


    
    return (
        <>
            <div className="main-container relative">
                
                {/* background image */}
                <div className="fixed w-full h-full top-0 right-0">
                    <img className='bg-img' src="https://images.unsplash.com/photo-1513273216459-54c4833d6b4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                </div>
                
                <div className="sub-container relative">

                    <Dialogs className='z-50' />
                    <SnowAnimate />
                    {/* <Fireworks /> */}

                    
                    <div className='h-full gap-8 grid grid-cols-3 justify-items-center'>
                        <div className='cardContent'>
                            <ParticipantList />
                        </div>
                        <div className='cardContent'>
                            <div>
                                2
                            </div>
                            <div>
                                2.1
                            </div>
                        </div>
                        <div className='cardGift'>
                            
                        </div>
                    </div>


                    <div className='absolute bottom-0 right-10'>
                        <GiftAnimate />
                    </div>
                    
                </div>

                
                <div className='absolute bottom-0 -left-16 opacity-90'>
                    <ChristmasTree />
                </div>

            </div>

        </>
    )
}

export default App
