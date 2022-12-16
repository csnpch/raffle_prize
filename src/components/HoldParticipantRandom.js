import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Howl, Howler} from 'howler';

// const MySwal = withReactContent(Swal);

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import { AiOutlineClear } from 'react-icons/ai';


const MySwal = withReactContent(Swal);
const audioRand = new Audio('./sound_onRandom.mp3');


export function HoldParticipantRandom({ playSound }) {

    
    const numberHold = useStoreState((state) => state.numberHold);
    const setNumberHold = useStoreActions((actions) => actions.setNumberHold);
    
    const statusRandomCutoutFN = useStoreState((state) => state.statusRandomCutoutFN);
    const setStatusRandomCutoutFN = useStoreActions((actions) => actions.setStatusRandomCutoutFN);

    const statusOnRandomCutout = useStoreState((state) => state.statusOnRandomCutout);
    const setStatusOnRandomCutout = useStoreActions((actions) => actions.setStatusOnRandomCutout);

    const statusRandomHoldNow = useStoreState((state) => state.statusRandomHoldNow);
    const setStatusRandomHoldNow = useStoreActions((actions) => actions.setStatusRandomHoldNow);

    const participantsHold = useStoreState((state) => state.participantsHold);
    const getParticipantHold = useStoreActions((actions) => actions.getParticipantHold);
    const addParticipantHold = useStoreActions((actions) => actions.addParticipantHold);
    const setParticipantHold = useStoreActions((actions) => actions.setParticipantHold);
    const changeItemParticipantsHold = useStoreActions((actions) => actions.changeItemParticipantsHold);
    const removeItemParticipantsHold = useStoreActions((actions) => actions.removeItemParticipantsHold);
    const removeItemParticipantsHoldByValue = useStoreActions((actions) => actions.removeItemParticipantsHoldByValue);
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
        setStatusRandomCutoutFN(false);
        clearParticipantsHold()
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
            playAudioOnRand();
            randomIndex = Math.floor(Math.random() * partis.length);
            tempValRand = partis[randomIndex];
            changeItemParticipantsHold({index: count, value: tempValRand});
        }

        addParticipantHold(tempValRand);
        document.querySelector('.container_itemHold').scrollTo(0, document.querySelector('.container_itemHold').scrollHeight);

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
            playAudioOnRand();
            
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
        setStatusRandomHoldNow(true);

        await countDownRandomHold(count++, partis);
        let interval = setInterval(async () => {
            if (count < unitRandom) {
                await randomPositionParticipents();
                await swapParticipentElementBG(false);
                await countDownRandomHold(count++, partis);
            } else {
                setStatusRandomHoldNow(false);
                clearInterval(interval);
            }
        }, 5000);

    }


    const setupRandomHold = async () => {
        
        swapParticipentElementBG(true);
        await clearListHold();

        let tmpParticipent = await getParticipentFromLocalStorage();
        let tmpStatusHoldNewRandom = await getStatusOnRandomNewHold();
        let tmpNumberHoldRandom = await getNumberHoldRandomFormLocalStorage();

        if (tmpNumberHoldRandom > 0) {
            await onRandomHold(tmpParticipent, tmpNumberHoldRandom, tmpStatusHoldNewRandom);
        }

    }
    
    const getNumberHoldRandomFormLocalStorage = async () => {
        let tmpVal = JSON.parse(localStorage.getItem('numberHoldRandom'));
        setNumberHoldRandom(tmpVal);
        return tmpVal;
    }

    const setNumberHoldRandomToLocalStorage = async (number) => {
        localStorage.setItem('numberHoldRandom', JSON.stringify(number));
    }

    
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

       
    const getOffset = async (el) => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    
    const getElementsRowItemHold = async () => {
        return document.querySelectorAll('.row-item-hold');
    }


    const onSuccessCutout = async () => {
        setStatusOnRandomCutout(false);

        let elementSuccess = await getElementsRowItemHold();

        elementSuccess.forEach((el) => {
            try {
                el.classList.add('partiHoldGotGift');
            } catch (err) { }
        })
    }


    const playAudioOnRand = () => {
        audioRand.volume = 0.6
        audioRand.play();
    }


    const cutoutHold = async (count, partisHold, TempCheckLastRand = null) => {

        if (parseInt(numberCutout) === 0) { 
            alertCantRandomCutoutHold();
            return;
        }

        console.log(TempCheckLastRand);
        
        
        const getIndexRandom = async () => {
            let partisHoldTemp = await getParticipantHoldFromLocalStorage();
            return Math.floor(Math.random() * partisHoldTemp.length)
        }
        let randomIndex = await getIndexRandom();
        let tempValRand = partisHold[randomIndex];


        const clearClassInElementsHold = async () => {
            let elementsHold = await getElementsRowItemHold();
            elementsHold.forEach((item) => {
                item.classList.remove('bgPartiToggleCutout', 'bgPartiToggleCutoutOnRandom', 'partiHoldGotGift');
            });
        }


        const onRandom = async () => {

            let indexRand = await getIndexRandom();
            let elementsHold = await getElementsRowItemHold();


            await clearClassInElementsHold();
            try {
                
                // if (indexRand < partisHold.length - 2) {
                elementsHold[indexRand].scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
                // }
                
                elementsHold[indexRand].classList.add('bgPartiToggleCutoutOnRandom')
                setTimeout(() => {
                    elementsHold[indexRand].classList.remove('bgPartiToggleCutoutOnRandom');
                }, 500);
            } catch (err) { }
        
        }

        setTimeout(async () => {
            await onRandom();
        setTimeout(async () => {
            await onRandom();
        setTimeout(async () => {
            await onRandom();
        setTimeout(async() => {
            await onRandom();
        setTimeout(async() => {
            await onRandom();
        setTimeout(async() => {
            await onRandom();
        setTimeout(async () => {
            await onRandom();
        setTimeout(async () => {
            await onRandom();
        setTimeout(async () => {
            await onRandom();
        setTimeout(async() => {
            await onRandom();
        setTimeout(async() => {
            await onRandom();
        setTimeout(async() => {
            await onRandom();
        setTimeout(async () => {
            await onRandom();
        setTimeout(async () => {

            let partisHoldTemp = await getParticipantHoldFromLocalStorage();
            
            let indexRandom = Math.floor(Math.random() * partisHoldTemp.length);
            let elHold = await getElementsRowItemHold();
            
            await clearClassInElementsHold();
            playAudioOnRand();
            
            try {
                elHold[indexRandom].classList.add('bgPartiToggleCutout');
                elHold[indexRandom].scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                });
            } catch (err) { }


            setTimeout(async () => {
                await clearClassInElementsHold();
                setNumberHold(partisHoldTemp.length - 1);
                await setNumberHoldRandomToLocalStorage(partisHoldTemp.length - 1);
                setTimeout(() =>{ removeItemParticipantsHoldByValue(partisHoldTemp[indexRandom]);}, 200)
                

                if (TempCheckLastRand.count >= TempCheckLastRand.numCutout) {
                    setTimeout(() => {
                        elHold[0].scrollTo({
                            top: 0,
                            block: 'top', 
                            behavior: 'smooth'
                        });
                    }, 200);
                    
                    playSound('th', 'ขอแสดงความยินดีกับผู้ได้รับรางวัลด้วยครับ');
                    document.querySelector('.container_itemHold').scrollTo(0, 0);

                    setStatusRandomCutoutFN(true);
                    await onSuccessCutout();
                }
                
            }, 2500);
            

        }, 1000);    
        }, 800);     
        }, 800);     
        }, 500);
        }, 500);
        }, 500);
        }, 500);
        }, 500);
        }, 200);
        }, 200);
        }, 200);
        }, 200);
        }, 200);
        }, 200);

        
    }



    const onCutoutHoldToFinal = async () => {

        let partisHoldTemp = await getParticipantHoldFromLocalStorage();
        
        if (statusOnRandomCutout || partisHoldTemp.length <= 1 || parseInt(partisHoldTemp.length) === parseInt(numberCutout) || parseInt(numberCutout) < 1) return;
        
        
        [`ผู้ได้รับรางวัลมีเพียง ${numberCutout}คน ผู้ที่อยู่รอดจะเป็นผู้ได้รับรางวัล ขอให้โชคดีครับ`].forEach((text) => {
            playSound('th', text);
        })

        setStatusRandomCutoutFN(false);
        setStatusOnRandomCutout(true);
        
        let count = 0;
        let tmpNumberCutout = participantsHold.length - numberCutout;
        console.log('number cutout is ', tmpNumberCutout);
        await cutoutHold(count++, participantsHold, {count: count, numCutout: tmpNumberCutout});
        let interval = setInterval(async () => {
            if (count < tmpNumberCutout) {
                await cutoutHold(count++, participantsHold, {count: count, numCutout: tmpNumberCutout});
                getParticipantHold();
            } else {
                clearInterval(interval);
            }
        }, 11000);

    }


    const getParticipantHoldFromLocalStorage = async () => {
        let hold = JSON.parse(localStorage.getItem('participantsOnHold'));
        setParticipentOnHoldRandom(hold);
        setParticipantHold(hold);
        return hold;
    }


    useEffect(() => {
        setInterval(async () => {
            await getNumberHoldRandomFormLocalStorage();
            await getParticipantHoldFromLocalStorage();
            await getStatusOnRandomNewHold();
            await checkStatusOnRandomHold();
        }, 1000);
        setParticipantHold(JSON.parse(localStorage.getItem('participantsOnHold')));
    }, [])

    
    return (
        <>
            <div className='h-full text-black overflow-hidden flex flex-col px-1' data-theme='light'>
                <div className='title-itemHold mb-4 flex justify-between items-end font-medium' style={{'fontSize': 20}}>
                    
                    <input id="soundOnRandom" type="hidden" onClick={() => new Audio("./sound_onRandom.mp3").play()} value="click me" />

                    <span className={`${statusRandomCutoutFN ? 'text-indigo-700' : 'text-red-600'}`}>
                        {
                            statusRandomCutoutFN ?
                            <>
                                ยินดีด้วย{participantsHold.length === 0 ? 'คุณ' : 'พวกคุณ'}คือผู้โชคดี 🎉
                            </>
                            :
                            <>
                                ผู้มีสิทธิรับของรางวัล 
                                {
                                    (participantsHold.length !== 0 && !statusOnRandomCutout) ? 
                                    <>( {participantsHold.length}/{numberHoldRandom} )</>
                                    : 
                                    <>
                                        {
                                            participantsHold.length - numberCutout !== 0 &&
                                                <span className='text-xs w-full text-center text-black'>
                                                {' '}( ตัดสิทธิอีก <span className='font-medium text-sm'>{participantsHold.length - numberCutout}</span> คน )</span>
                                        }
                                    </>
                                }
                            </>
                        }
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
                                            localStorage.setItem('numberHoldRandom', JSON.stringify(0));
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
                <div className={`${participantsHold.length > 6 && statusOnRandomCutout ? 'pb-80' : 'pb-20'} container_itemHold pt-3 h-full overflow-y-auto hide-scroll border-t-2 border-red-200 overflow-x-hidden`}>
                    {
                        participantsHold.length > 0 ?
                        participantsHold.map((item, index) => {
                            return <>
                                <div key={index} style={{'fontSize': 18}} className={`${statusRandomCutoutFN ? 'py-1.5' : 'py-3'} grid grid-cols-[40px_1fr_20px] items-center`}>
                                    <p>{index+1}.</p>
                                    <p className='row-item-hold duration-300 resultHold resultHoldZoom value border-b-2'>
                                        {item}
                                    </p>
                                </div>
                            </>
                        })
                        : 
                        <span className='mt-20 text-center'>- ยังไม่ได้สุ่มผู้มีสิทธิรับของรางวัล -</span>
                    }
                </div>
            </div>
            <div className='bg-white w-full grid grid-cols-[2fr_3fr] gap-x-2 pt-3'>
                <div className='w-full bg-white'>
                    <Autocomplete
                        freeSolo
                        size="small"
                        className='inputUnitGotGift text-red-400'
                        style={{'color': 'red'}}
                        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].filter((item) => parseInt(item) < participantsHold.length)}
                        renderInput={(params) => <TextField {...params} label="จำนวนผู้ได้รับรางวัล" onChange={event => setNumberCutout(event.target.value)} />}
                        onChange={(event, val) => setNumberCutout(val)}
                    />
                </div>
                <div className='w-full'>
                    <Tooltip title="STEP 2 : สุ่มคัดคนออกให้เหลือเฉพาะคนที่ได้ของรางวัล" arrow>
                        <Button variant="contained" disabled={statusOnRandomCutout} className='w-full btn-swapY relative' onClick={onCutoutHoldToFinal}>
                            { statusOnRandomCutout && <CircularProgress className='text-blue-600 absolute left-6 w-5 h-5' /> }
                            {
                                participantsHold.length - numberCutout !== 0 ?
                                'สุ่มหาผู้ได้รางวัล' :
                                'ยินดีด้วย 🎉'
                            }
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </>
    )

}