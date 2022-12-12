import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function HoldParticipantRandom() {

    const [participent, setParticipent] = useState([]);
    const [participentOnHoldRandom, setParticipentOnHoldRandom] = useState([]);
    const [numberHoldRandom, setNumberHoldRandom] = useState(0);
    const [statusHoldNewRandom, setStatusHoldNewRandom] = useState(true);
    
    const [numberCutout, setNumberCutout] = useState(0);


    
    const addingRandomHoldToLocalStorage = async (val) => {
        try {
            let currentPartiHold = JSON.parse(localStorage.getItem('participantsOnHold') || []);
            currentPartiHold = currentPartiHold.filter((item) => item !== null);
            localStorage.setItem('participantsOnHold', JSON.stringify([...currentPartiHold, val]));
        } catch (err) {
            localStorage.setItem('participantsOnHold', JSON.stringify([]));
            await addingRandomHoldToLocalStorage();
        }
    }

    
    const resetRandomHold = async () => {
        localStorage.setItem('participantsOnHold', JSON.stringify([]));
        localStorage.setItem('numberHoldRandom', JSON.stringify(0));
        setParticipentOnHoldRandom([]);
    }


    
    const getParticipentFromLocalStorage = async () => {
        try {
            let tmpData = JSON.parse(localStorage.getItem('participants') || []);
            setParticipent(tmpData);
            return tmpData;
        } catch (err) {
            localStorage.setItem('participants', JSON.stringify([]));
            await getParticipentFromLocalStorage();
        }
    }

    const clearSwapParicipentBG = async (parti_elements) => {
        parti_elements.forEach((el) => {
            el.classList.remove('bgPartiToggle');
        })
    }


    const swapParticipentElementBG = async (statusBackword = false) => {

        await getParticipentFromLocalStorage();
        setParticipent(JSON.parse(localStorage.getItem('participants')));

        let parti_elements = document.querySelectorAll('.row-participant');
        let index = 0;
        let tmpParticipent = await getParticipentFromLocalStorage();

        await clearSwapParicipentBG(parti_elements);
        await getParticipentFromLocalStorage();

        const intervalSwapBG = setInterval(() => {
            
            if (index < tmpParticipent.length) {
                parti_elements[index++].classList.add('bgPartiToggle');
            } else {
                index = tmpParticipent.length - 1;
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



    const calcTimeRand = async (countdownTime) => {
        if (countdownTime < 1500) {
            return 200;
        }

        return countdownTime;
    }


    const intervalRandomHold = (partis) => {
        let tmpIndexCurrent = 0;
        let countdownTime = 2000;
        let stepSpeed = 100;
        let randomIndex = [Math.floor(Math.random() * partis.length)];
        
        let intervalRandom = setInterval(async () => {
           countdownTime -= stepSpeed; 
           stepSpeed = await calcTimeRand(countdownTime);
        }, countdownTime)


    }


    const onRandomHold = async (partis, unitRandom, statusRandomNew) => {
        

        await intervalRandomHold(partis);


        if (statusRandomNew) {
            await resetRandomHold();
        } else {

        }

        // [Math.floor(Math.random()*tmpParticipent.length)]

    }



    const setupRandomHold = async () => {
        
        swapParticipentElementBG(true);

        let tmpParticipent = await getParticipentFromLocalStorage();
        let tmpStatusHoldNewRandom = await getStatusOnRandomNewHold();
        let tmpNumberHoldRandom = await getNumberHoldRandomToLocalStorage();

        await onRandomHold(tmpParticipent, tmpNumberHoldRandom, tmpStatusHoldNewRandom);

    }
    
    const getNumberHoldRandomToLocalStorage = async () => {
        let tmpVal = JSON.parse(localStorage.getItem('numberHoldRandom'));
        setNumberHoldRandom(tmpVal);
        return tmpVal;
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
        let tmpValue = JSON.parse(localStorage.getItem('statusHoldNewRandom'));
        setStatusHoldNewRandom(tmpValue);
        return tmpValue;
    }
    
    
    const checkStatusOnRandomHold = async () => {
        let statusRandomHold = JSON.parse(localStorage.getItem('statusRandomHold') || false);
        if (statusRandomHold) {
            statusRandomHold = false;
            localStorage.setItem('statusRandomHold', JSON.stringify(statusRandomHold));
            await setupRandomHold();
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