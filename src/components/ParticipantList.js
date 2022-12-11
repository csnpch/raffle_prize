import { useState, useEffect, forwardRef } from 'react';
// import { Helmet } from "react-helmet";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export function ParticipantList() {

    const [participent, setParticipent] = useState([]);


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const randomPositionParticipents = async () => {
        let tmpParticipent = participent;
        let currentIndex = tmpParticipent.length,  randomIndex;
      
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [tmpParticipent[currentIndex], tmpParticipent[randomIndex]] = [
            tmpParticipent[randomIndex], tmpParticipent[currentIndex]];
        }
      
        setParticipent(tmpParticipent);
        await updateParticipentToLocalStorage(tmpParticipent);
      }

    const updateParticipentToLocalStorage = async (newParticipents) => {
        localStorage.setItem('participants', JSON.stringify(newParticipents));
    }

    const getParticipentFromLocalStorage = async () => {
        setParticipent(JSON.parse(localStorage.getItem('participants') || []));
    }

    useEffect(() => {

        setInterval(async () => {
            await getParticipentFromLocalStorage();
        }, 200);
        
    }, [])

    return (
        <>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>



            <div className='h-full text-black overflow-hidden' data-theme='light'>
                <div className='mb-4' style={{'fontSize': 20}}>
                    ผู้เข้าร่วมทั้งหมด &nbsp;( { participent.length } คน )
                </div>
                <div className='pt-3 h-full overflow-y-auto pb-10 hide-scroll border-t-2 border-red-200'>
                    {
                        participent.length > 0 ?
                        participent.map((item, index) => {
                            return <>
                                <div key={index} style={{'fontSize': 18}} className='py-3 grid grid-cols-[40px_1fr_20px]'>
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
            <div className='bg-white w-full grid grid-cols-[1fr_2fr] gap-x-2'>
                <Button variant="outlined" className='w-full btn-swapY' onClick={randomPositionParticipents}>สลับตำแหน่ง</Button>
                <Button variant="contained" className='w-full btn-swapY' onClick={handleClickOpen}>สุ่มผู้มีสิทธิรับของรางวัล</Button>
            </div>
        </>
    )
}