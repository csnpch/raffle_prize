import { useState, useEffect, forwardRef } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import { Helmet } from "react-helmet";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MySwal = withReactContent(Swal);

export function ParticipantList() {


    const numberHold = useStoreState((state) => state.numberHold);
    const setNumberHold = useStoreActions((actions) => actions.setNumberHold);

    const participantsHold = useStoreState((state) => state.participantsHold);
    const clearParticipantsHold = useStoreActions((actions) => actions.clearParticipantsHold);


    const [participent, setParticipent] = useState([]);
    const [numberHoldRandom, setNumberHoldRandom] = useState(0);
    // const [participentOnHoldRandom, setParticipentOnHoldRandom] = useState([]);
    // const [statusHoldNewRandom, setStatusHoldNewRandom] = useState(true);
    // const [statusDialogOnRandom, setStatusDialogOnRandom] = useState(true);

    const [openDialogGetNumberHoldRand, setOpenDialogGetNumberHoldRand] = useState(false);


    const setNumberHoldRandomToLocalStorage = async () => {
        localStorage.setItem('numberHoldRandom', JSON.stringify(numberHoldRandom));
    }


    const randomHoldParticipents = () => {
        setOpenDialogGetNumberHoldRand(true);
    };

    
    const handleClosePopupRandomHold = () => {
        setNumberHoldRandom(0)
        setOpenDialogGetNumberHoldRand(false);
    };


    // const randomPositionParticipents = async () => {
    //     let tmpParticipent = participent;
    //     let currentIndex = tmpParticipent.length,  randomIndex;
      
    //     while (currentIndex !== 0) {
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex--;
    //       [tmpParticipent[currentIndex], tmpParticipent[randomIndex]] = [
    //         tmpParticipent[randomIndex], tmpParticipent[currentIndex]];
    //     }
      
    //     setParticipent(tmpParticipent);
    //     await updateParticipentToLocalStorage(tmpParticipent);
    //     await swapParticipentElementBG(true);
    // }


    const updateParticipentToLocalStorage = async (newParticipents) => {
        localStorage.setItem('participants', JSON.stringify(newParticipents));
    }


    const getParticipentFromLocalStorage = async () => {
        try {
            setParticipent(JSON.parse(localStorage.getItem('participants') || []));
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


    const setStatusRandomHoldToLocalStorage = async () => {
        localStorage.setItem('statusRandomHold', JSON.stringify(true));
    }


    const onRandomHold = async () => {
        await getParticipentFromLocalStorage();
        setNumberHold(numberHoldRandom);
        await setNumberHoldRandomToLocalStorage();
        await setStatusRandomHoldToLocalStorage();
        handleClosePopupRandomHold();

        // setParticipentOnHoldRandom([]);

        // if (statusHoldNewRandom) {
        //     console.log(statusHoldNewRandom);
        //     await resetRandomHold();
        // } 

        // let round = 0;
        // let tempPartiHoldRand = []

        // const intervalRandom = setInterval(() => {
        //     if (round++ < parseInt(numberHoldRandom)) {
        //         let tmpVal = participent[Math.floor(Math.random()*participent.length)];
                
        //         if (tempPartiHoldRand.indexOf(tmpVal) === -1) {
        //             tempPartiHoldRand.push(tmpVal);
        //             addingRandomHoldToLocalStorage(tmpVal);
        //         } else {
        //             --round;
        //         }
                
        //     } else {
        //         console.log('end')
        //         clearInterval(intervalRandom);
        //         setParticipentOnHoldRandom(tempPartiHoldRand);
        //     }
        // }, 500)

    }


    useEffect(() => {

        setInterval(async () => {
            await getParticipentFromLocalStorage();
        }, 1000);

    }, [])


    return (
        <>

            <Dialog
                open={openDialogGetNumberHoldRand}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClosePopupRandomHold}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{'width': 340}}>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Autocomplete
                            freeSolo
                            inputProps={{min: 0, style: { textAlign: 'center' }}}
                            value={`${numberHoldRandom || ''}`} 
                            options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '14', '16', '18', '20'].filter((item) => parseInt(item) <= participent.length)}
                            onChange={(event, val) => {
                                setNumberHoldRandom(val)
                            }}
                            renderInput={(params) => <TextField {...params} label="จำนวนผู้มีสิทธิลุ้นรับของรางวัล" />}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className='flex justify-between w-full'>
                        {/* <FormControlLabel 
                            className='ml-3' 
                            control={
                                <Switch 
                                    color="secondary" 
                                    defaultChecked 
                                    size="small"
                                    value={statusHoldNewRandom}
                                    onChange={(event, val) => {
                                        setStatusHoldNewRandom(val)
                                        localStorage.setItem('statusHoldNewRandom', val);
                                    }}
                                />
                            } 
                            label="สุ่มใหม่" 
                        /> */}
                        <div>
                        </div>
                        <div>
                            <Button onClick={handleClosePopupRandomHold}>ยกเลิก</Button>
                            <Button onClick={onRandomHold}>ทำการสุ่มเลือก</Button>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>

            {/* <Dialog
                open={statusDialogOnRandom}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent style={{'width': 340}}>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className=''>
                            Chitsanuphong Chaihong QA
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog> */}


            <div className='h-full text-black overflow-hidden' data-theme='light'>
                <div className='mb-4 text-black font-medium' style={{'fontSize': 20}}>
                    ผู้เข้าร่วมทั้งหมด ( { participent.length } )
                </div>
                <div className='pt-3 h-full overflow-y-auto pb-10 hide-scroll border-t-2 border-black/20'>
                    {
                        participent.length > 0 ?
                        participent.map((item, index) => {
                            return <>
                                <div key={index} style={{'fontSize': 18}} className='row-participant py-3 grid grid-cols-[40px_1fr_20px]'>
                                    <p>{index+1}.</p>
                                    <p className='border-b-2'>{item}</p>
                                </div>
                            </>
                        })
                        : 
                        <span className='mt-20 text-center'>- ยังไม่มีข้อมูลผู้เข้าร่วม -</span>
                    }
                </div>
            </div>
            <div className='bg-white w-full grid xgrid-cols-[1fr_2fr] gap-x-2 pt-2'>
                {/* <Button variant="outlined" className='w-full btn-swapY' onClick={randomPositionParticipents}>สลับ<span>ตำแหน่ง</span></Button> */}
                {
                    (participantsHold.length > 0 && participantsHold.length < numberHold) ?
                    <Button variant="contained" color="secondary" className='w-full btn-swapY' onClick={() => {
                        Swal.fire({
                            title: 'ต้องการหยุดการสุ่มผู้มีสิทธิ?',
                            showDenyButton: true,
                            showCancelButton: true,
                            showConfirmButton: false,
                            cancelButtonText: 'ยกเลิก',
                            denyButtonText: `ยืนยัน`,
                        }).then(async (result) => {
                            if (result.isDenied) {
                                window.location.reload();
                            }
                        })
                    }}>หยุดการสุ่มผู้มีสิทธิ</Button>
                    : 
                    <>
                        <Tooltip title="STEP 1 : สุ่มผู้มีสิทธิให้รับรางวัลจากผู้เข้าร่วมทั้งหมด" arrow>
                            <Button variant="contained" className='w-full btn-swapY' onClick={randomHoldParticipents}>สุ่มผู้มีสิทธิรับของรางวัล</Button>
                        </Tooltip>
                    </>
                }
            </div>
        </>
    )
}