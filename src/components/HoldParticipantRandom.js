import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function HoldParticipantRandom() {

    const [numberCutout, setNumberCutout] = useState('0');
    const [participentOnHoldRandom, setParticipentOnHoldRandom] = useState([]);
    const [numberHoldRandom, setNumberHoldRandom] = useState(0);
    const [participent, setParticipent] = useState([]);
    const [statusHoldNewRandom, setStatusHoldNewRandom] = useState(true);


    const getDataFromLocalStorage = async (key, val = null) => {
        try {
            if (key === 'participants') {
                setParticipent(JSON.parse(localStorage.getItem(key) || val));
            } else if (key === '') {

            }
        } catch (err) {
            localStorage.setItem(key, JSON.stringify(val));
            await getDataFromLocalStorage(key, val);
        }
    }

    
    const addingRandomHoldToLocalStorage = (val) => {
        try {
            let currentPartiHold = JSON.parse(localStorage.getItem('participantsOnHold') || []);
            currentPartiHold = currentPartiHold.filter((item) => item !== null);
            localStorage.setItem('participantsOnHold', JSON.stringify([...currentPartiHold, val]));
        } catch (err) {
            localStorage.setItem('participantsOnHold', JSON.stringify([]));
            addingRandomHoldToLocalStorage();
        }
    }

    
    const resetRandomHold = async () => {
        localStorage.setItem('participantsOnHold', JSON.stringify([]));
        setParticipentOnHoldRandom([]);
    }

    const clearSwapParicipentBG = async (parti_elements) => {
        parti_elements.forEach((el) => {
            el.classList.remove('bgPartiToggle');
        })
    }


    const swapParticipentElementBG = async (statusBackword = false) => {
        await getDataFromLocalStorage('participants', []);

        let parti_elements = document.querySelectorAll('.row-participant');
        let index = 0;

        await clearSwapParicipentBG(parti_elements);

        const intervalSwapBG = setInterval(() => {
            if (index < participent.length) {
                parti_elements[index++].classList.add('bgPartiToggle');
            } else {
                index = participent.length - 1;
                clearInterval(intervalSwapBG);
                clearSwapParicipentBG(parti_elements);
                if (statusBackword) {
                    const intervalSwapBGbackword = setInterval(() => {
                    
                        if (index >= 0) {
                            parti_elements[index--].classList.add('bgPartiToggle');
                        } else {
                            clearInterval(intervalSwapBGbackword);
                            clearSwapParicipentBG(parti_elements);
                        }
                    
                    }, 36);
                }
            }
        }, 36);
    }



    const onRandomHold = async () => {
        swapParticipentElementBG(false);

        console.log('onRandomHold')

        if (statusHoldNewRandom) {
            console.log('if (statusHoldNewRandom) {')
            await resetRandomHold();
        } 

        let round = 0;
        let tempPartiHoldRand = []

        console.log(numberHoldRandom);
        const intervalRandom = setInterval(() => {
            if (round++ < numberHoldRandom) {
                let tmpVal = participent[Math.floor(Math.random()*participent.length)];
                
                if (tempPartiHoldRand.indexOf(tmpVal) === -1) {
                    tempPartiHoldRand.push(tmpVal);
                    addingRandomHoldToLocalStorage(tmpVal);
                } else {
                    --round;
                }
                
            } else {
                clearInterval(intervalRandom);
                setParticipentOnHoldRandom(tempPartiHoldRand);
            }
        }, 500)
    }
    
    const getNumberHoldRandomToLocalStorage = async () => {
        setNumberHoldRandom(parseInt(JSON.parse(localStorage.getItem('numberHoldRandom'))) || '0');
    }

    
    // const getRandomHoldToLocalStorage = async () => {
    //     try {
    //         let currentPartiHold = JSON.parse(localStorage.getItem('participantsOnHold') || []);
    //         currentPartiHold = currentPartiHold.filter((item) => item !== null);
    //         setParticipentOnHoldRandom(currentPartiHold);
    //     } catch (err) {
    //         localStorage.setItem('participantsOnHold', JSON.stringify([]));
    //         getRandomHoldToLocalStorage();
    //     }
    // }

    
    const getStatusOnRandomNewHold = async () => {
        setStatusHoldNewRandom(JSON.parse(localStorage.getItem('statusHoldNewRandom') || false));
    }
    
    
    const checkStatusOnRandomHold = async () => {
        let statusRandomHold = JSON.parse(localStorage.getItem('statusRandomHold') || false);
        if (statusRandomHold) {
            statusRandomHold = false;
            localStorage.setItem('statusRandomHold', JSON.stringify(statusRandomHold));
            await onRandomHold();
        }
    }


    useEffect(() => {
        setInterval(async () => {
            await getNumberHoldRandomToLocalStorage();
            await getStatusOnRandomNewHold();
            await checkStatusOnRandomHold();
        }, 200);
    }, [])

    
    return (
        <>
            <div className='h-full text-black overflow-hidden' data-theme='light'>
                <div className='mb-4 text-red-600 font-medium' style={{'fontSize': 20}}>
                    ผู้มีสิทธิรับของรางวัล ( {participentOnHoldRandom.length}/{numberHoldRandom} )
                </div>
                <div className='pt-3 h-full overflow-y-auto pb-10 hide-scroll border-t-2 border-red-200'>
                    {
                        participentOnHoldRandom.length > 0 ?
                        participentOnHoldRandom.map((item, index) => {
                            return <>
                                <div key={index} style={{'fontSize': 18}} className='py-3 grid grid-cols-[40px_1fr_20px]'>
                                    <p>{index+1}.</p>
                                    <p className='border-b-2'>{item}</p>
                                </div>
                            </>
                        })
                        : 
                        <span className='mt-20 text-center'>- ยังไม่ได้สุ่มผู้มีสิทธิรับของรางวัล -</span>
                    }
                </div>
            </div>
            <div className='bg-white w-full flex gap-x-2'>
                <div className='w-full bg-white'>
                    <Autocomplete
                        freeSolo
                        size="small"
                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].filter((item) => parseInt(item) <= participentOnHoldRandom.length)}
                        renderInput={(params) => <TextField {...params} label="จำนวนผู้ได้รับของรางวัล" />}
                        onChange={(event, val) => setNumberCutout(val)}
                    />
                </div>
                <div className='w-full'>
                    <Button variant="contained" className='w-full btn-swapY' onClick={() => {}}>สุ่มหาผู้ได้รางวัล</Button>
                </div>
            </div>
        </>
    )

}