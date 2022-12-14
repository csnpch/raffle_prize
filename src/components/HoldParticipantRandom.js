import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { AiOutlineClear } from 'react-icons/ai';


const MySwal = withReactContent(Swal);


export function HoldParticipantRandom() {
    
    const participantsHold = useStoreState((state) => state.participantsHold);
    const addParticipantsHold = useStoreActions((actions) => actions.addParticipantsHold);
    const setParticipantHold = useStoreActions((actions) => actions.setParticipantHold);
    const changeItemParticipantsHold = useStoreActions((actions) => actions.changeItemParticipantsHold);
    const removeItemParticipantsHold = useStoreActions((actions) => actions.removeItemParticipantsHold);
    const clearParticipantsHold = useStoreActions((actions) => actions.clearParticipantsHold);

    // const statusRandomHoldNext = useStoreState((state) => state.participantsHold);
    // const setStatusRandomHoldNext = useStoreActions((actions) => actions.setStatusRandomHoldNext);
    
    // const numberHold = useStoreState((state) => state.numberHold);
    // const setNumberHold = useStoreActions((actions) => actions.setNumberHold);

    
    const [participent, setParticipent] = useState([]);
    const [participentOnHoldRandom, setParticipentOnHoldRandom] = useState([]);
    const [numberHoldRandom, setNumberHoldRandom] = useState(0);
    const [statusHoldNewRandom, setStatusHoldNewRandom] = useState(true);
    
    const [numberCutout, setNumberCutout] = useState(0);


    const updateParticipentToLocalStorage = async (newParticipents) => {
        localStorage.setItem('participants', JSON.stringify(newParticipents));
    }


    const randomPositionParticipents = async () => {
        let tmpParticipent = await getParticipentFromLocalStorage();
        let currentIndex = tmpParticipent.length,  randomIndex;
      
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [tmpParticipent[currentIndex], tmpParticipent[randomIndex]] = [
            tmpParticipent[randomIndex], tmpParticipent[currentIndex]];
        }
      
        await updateParticipentToLocalStorage(tmpParticipent);
        await swapParticipentElementBG(true);
    }

    
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
        clearParticipantsHold()
        // localStorage.setItem('numberHoldRandom', JSON.stringify(0));
        await clearListHold();
    }


    const clearListHold = async () => {
        localStorage.setItem('participantsOnHold', JSON.stringify([]));
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
                index++;
            } else {
                index = tmpParticipent.length - 1;
                clearInterval(intervalSwapBG);
                clearSwapParicipentBG(parti_elements);
                if (statusBackword) {
                    const intervalSwapBGbackword = setInterval(() => {
                    
                        if (index >= 0) {
                            parti_elements[index++].classList.add('bgPartiToggle');
                            index--;
                        } else {
                            clearInterval(intervalSwapBGbackword);
                            clearSwapParicipentBG(parti_elements);
                        }
                    
                    }, 36);
                }
            }
        }, 36);
    }


    // const addEffectToRowHold = async (valFinal) => {
        // let elementsRandomhold = document.querySelectorAll('.row-holdPartis'); 
        // let tmpElVal = '';

        // elementsRandomhold.forEach((el) => {
        //     tmpElVal = el.querySelector('.value')
        //     console.log(tmpElVal.innerText, ' - ', valFinal);
        //     if (tmpElVal.innerText === valFinal) {
        //         console.log('got! - ', tmpElVal.innerText, ' - ', valFinal);
        //     }
        //     console.log('miss*');
        // })
    // }


    const countDownRandomHold = async (count, partis) => {
        let randomIndex = Math.floor(Math.random() * partis.length);
        let tempValRand = partis[randomIndex];
        
        const onRandom = async () => {
            randomIndex = Math.floor(Math.random() * partis.length);
            tempValRand = partis[randomIndex];
            changeItemParticipantsHold({index: count, value: tempValRand});
        }

        addParticipantsHold(tempValRand);

        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
            await onRandom();
            
            let tmpCheckHold = JSON.parse(localStorage.getItem('participantsOnHold'));
            
            while (tmpCheckHold.includes(partis[randomIndex])) {
                
                tmpCheckHold = JSON.parse(localStorage.getItem('participantsOnHold'));
                randomIndex = Math.floor(Math.random() * partis.length);
                changeItemParticipantsHold({index: count, value: partis[randomIndex]});
            
            }
            
        }, 1500);
        }, 800);
        }, 500);
        }, 300);
        }, 200);
        }, 150);
        }, 130);
        }, 100);
        }, 80);
        }, 50);
        }, 50);
        }, 50);
        }, 50);
        }, 30);
        }, 30);
        }, 20);
        }, 20);

    }


    const onRandomHold = async (partis, unitRandom, statusRandomNew) => {
                
        let count = 0;

        if (statusRandomNew || unitRandom === 0) {
            await resetRandomHold();
        } else {
            setNumberHoldRandom(numberHoldRandom + unitRandom);
            // setNumberHold(numberHold + unitRandom);
        }

        await countDownRandomHold(count++, partis);
        let interval = setInterval(async () => {
            if (count < unitRandom) {
                await randomPositionParticipents();
                await swapParticipentElementBG(false);
                await countDownRandomHold(count++, partis);
            } else {
                clearInterval(interval);
            }
        }, 5000);

    }


    const setupRandomHold = async () => {
        
        swapParticipentElementBG(true);
        await clearListHold();

        let tmpParticipent = await getParticipentFromLocalStorage();
        let tmpStatusHoldNewRandom = await getStatusOnRandomNewHold();
        let tmpNumberHoldRandom = await getNumberHoldRandomToLocalStorage();

        if (tmpNumberHoldRandom > 0) {
            await onRandomHold(tmpParticipent, tmpNumberHoldRandom, tmpStatusHoldNewRandom);
        }

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


    const alertCantRandomCutoutHold = () => {
        MySwal.fire({
            showCloseButton: false, 
            showConfirmButton: false,
            html: <i>โปรดระบุจำนวนผู้ได้รับของรางวัล</i>,
            icon: 'warning',
            timer: 1000,
        });
    }


    const cutoutHold = async (count, partisHold) => {
        
        
        if (parseInt(numberCutout) === 0) { 
            alertCantRandomCutoutHold();
            return;
        }
        
        const getIndexRandom = async () => {
            return Math.floor(Math.random() * partisHold.length)
        }
        let randomIndex = await getIndexRandom();
        let tempValRand = partisHold[randomIndex];

        const getElementsRowItemHold = async () => {
            return document.querySelectorAll('.row-item-hold');
        }

        const onRandom = async () => {
            let indexRand = await getIndexRandom();
            
            let elementsHold = await getElementsRowItemHold();
            elementsHold[indexRand].classList.add('bgPartiToggle')
            setTimeout(() => {
                elementsHold[indexRand].classList.remove('bgPartiToggle');
            }, 500);
            
        }
        
        // setTimeout(async () => {
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        setTimeout(async () => {
        await onRandom();
        }, 1000);   
        }, 1000);    
        }, 1000);     
        }, 1000);     

        //     let tmpCheckHold = JSON.parse(localStorage.getItem('participantsOnHold'));
            
        //     while (tmpCheckHold.includes(partis[randomIndex])) {
                
        //         tmpCheckHold = JSON.parse(localStorage.getItem('participantsOnHold'));
        //         randomIndex = Math.floor(Math.random() * partis.length);
            
        //     }
        // }, 1500);

    }


    const onCutoutHoldToFinal = async () => {

        let count = 0;

        await cutoutHold(count++, participantsHold);
        let interval = setInterval(async () => {
            if (count < numberCutout) {
                await cutoutHold(count++, participantsHold);
            } else {
                clearInterval(interval);
            }
        }, 5000);


    }



    useEffect(() => {
        setInterval(async () => {
            await getNumberHoldRandomToLocalStorage();
            await getStatusOnRandomNewHold();
            await checkStatusOnRandomHold();
        }, 1000);
        setParticipantHold(JSON.parse(localStorage.getItem('participantsOnHold')));
    }, [])

    
    return (
        <>
            <div className='h-full text-black overflow-hidden' data-theme='light'>
                <div className='mb-4 flex justify-between items-end text-red-600 font-medium' style={{'fontSize': 20}}>
                    <span>
                        ผู้มีสิทธิรับของรางวัล {participantsHold.length !== 0 && <>( {participantsHold.length}/{numberHoldRandom} )</>}
                    </span>
                    {
                        participantsHold.length > 0 ?
                        <div className="pr-4 tooltip tooltip-bottom text-black transform hover:scale-110" data-tip="ล้าง">
                            <button
                                className='w-full text-[1.2rem]' 
                                onClick={() => {
                                    Swal.fire({
                                        title: 'คุณต้องการล้างผลการสุ่ม?',
                                        showDenyButton: true,
                                        showCancelButton: false,
                                        confirmButtonText: 'ยืนยัน',
                                        denyButtonText: `ยกเลิก`,
                                    }).then(async (result) => {
                                        /* Read more about isConfirmed, isDenied below */
                                        if (result.isConfirmed) {
                                            await resetRandomHold();
                                        }
                                    })
                                }}
                            >
                                <AiOutlineClear />
                            </button>
                        </div>
                        :
                        <></>
                    }
                </div>
                <div className='pt-3 h-full overflow-y-auto pb-10 hide-scroll border-t-2 border-red-200'>
                    {
                        participantsHold.length > 0 ?
                        participantsHold.map((item, index) => {
                            return <>
                                <div key={index} style={{'fontSize': 18}} className='py-3 grid grid-cols-[40px_1fr_20px]'>
                                    <p>{index+1}.</p>
                                    <p className='row-item-hold resultHold resultHoldZoom value border-b-2'>{item}</p>
                                </div>
                            </>
                        })
                        : 
                        <span className='mt-20 text-center'>- ยังไม่ได้สุ่มผู้มีสิทธิรับของรางวัล -</span>
                    }
                </div>
            </div>
            <div className='bg-white w-full grid grid-cols-[2fr_3fr] gap-x-2 pt-2'>
                <div className='w-full bg-white'>
                    <Autocomplete
                        freeSolo
                        size="small"
                        className='inputUnitGotGift text-red-400'
                        style={{'color': 'red'}}
                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].filter((item) => parseInt(item) <= participantsHold.length)}
                        renderInput={(params) => <TextField {...params} label="จำนวนผู้ได้รับรางวัล" />}
                        onChange={(event, val) => setNumberCutout(val)}
                    />
                </div>
                <div className='w-full'>
                    <Tooltip title="STEP 2 : สุ่มคัดคนออกให้เหลือเฉพาะคนที่ได้ของรางวัล" arrow>
                        <Button variant="contained" className='w-full btn-swapY' onClick={onCutoutHoldToFinal}>สุ่มหาผู้ได้รางวัล</Button>
                    </Tooltip>
                </div>
            </div>
        </>
    )

}