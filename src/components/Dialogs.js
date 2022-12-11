import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContentText from '@mui/material/DialogContentText';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';

import { BsGift } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import Swal from 'sweetalert2'

export function Dialogs() {
    
    const [openCardGiftDialog, setOpenCardGiftDialog] = useState(false);
    const [openListParticipant, setOpenListParticipant] = useState(false);
    const [participant, setParticipant] = useState([]);
    const [statusAddingParticipant, setStatusAddingParticipant] = useState(false);
    const [gift, setGift] = useState('');
    
    // Variable for Inputs
    const [textParticipant, setTextParticipant] = useState([]);


    const handleClickOpenCardGiftDialog = () => {
        setOpenCardGiftDialog(true);
    };

    const handleCloseCardGiftDialog = () => {
        localStorage.setItem('gift', gift);
        setOpenCardGiftDialog(false);
    };

    const handleClickOpenListParticipant = () => {
        handleAddingParticipant();
        setOpenListParticipant(true);
    };

    const handleCloseListParticipant = () => {
        setOpenListParticipant(false);
    };

    const descriptionElementRef = useRef(null);
    
    const handdleChageTextParticipant = (event) => {
        setTextParticipant(event.target.value);
    }


    const handleAddingParticipant = () => {
        let tmpParticipant = JSON.parse(localStorage.getItem('participants') || []);
        setParticipant(tmpParticipant);
        setStatusAddingParticipant(true)
        if (tmpParticipant.length > 0) {
            let tmpTextParti = '';
            // for (let)
            tmpParticipant.forEach((item, index) => {
                tmpTextParti += item + ((index < tmpParticipant.length - 1) ? '\n' : '' );
            });
            setTextParticipant(tmpTextParti);
        }
    }

    
    const onSubmitNewParticipant = () => {
        
        let tmpTextParti = textParticipant;
        let statusCheckInput = false;
        
        try {
            if (tmpTextParti.split('\n').length === 1 && tmpTextParti.split('\n')[0] === '') {
                setParticipant([]);
                localStorage.setItem('participants', JSON.stringify([]));
                window.location.reload();
            }
        } catch (err) { }
        
        for (let letter of tmpTextParti) {
            if (letter !== ' ') {
                statusCheckInput = true;
                break;
            }
        }

        
        if ((tmpTextParti !== '' && statusCheckInput)) {
            let tmpListParti = tmpTextParti.split('\n') || [];
            
            tmpListParti = tmpListParti.filter(item => (item !== null && item !== '' && item !== '\n'))
            
            setParticipant(tmpListParti);
            setTextParticipant('');
            
            localStorage.setItem('participants', JSON.stringify(tmpListParti || []));
        } else {
            setTextParticipant('');
        }
        
        setOpenListParticipant(false);
        setStatusAddingParticipant(false);
        
    }
    
    const clearListParticipant = () => {
        setOpenListParticipant(false);
        Swal.fire({
            title: 'ต้องการล้างข้อมูลผู้เข้าร่วม?',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'ยืนยัน',
            denyButtonText: `ยกเลิก`,
        }).then((result) => {
            if (result.isConfirmed) {
                setParticipant([]);
                localStorage.removeItem('participants')
            }
            setOpenListParticipant(true);
        })
    }
    

    const handleSetGift = () => {
        handleCloseCardGiftDialog();
    }


    useEffect(() => {
        if (openListParticipant) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openListParticipant]);


    useEffect(() => {
        
        setParticipant(JSON.parse(localStorage.getItem('participants')) || []);
        setGift(localStorage.getItem('gift') || '');

    }, [])

    useEffect(() => {
        setParticipant([...participant.filter((item) => item !== '')])
    }, [textParticipant])


    return (
        <>
            <div className='fixed right-8 md:-right-20 bottom-2 md:bottom-0 flex md:flex-col gap-3'>
                <div className="tooltip tooltip-top" data-tip="รายชื่อผู้เข้าร่วม">
                    <button 
                        onClick={handleClickOpenListParticipant}
                        className="btn bg-indigo-600 hover:bg-indigo-800 text-white shadow-lg text-lg tracking-wide" 
                        >
                        <IoIosPeople className='text-3xl' />
                    </button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="กำหนดของรางวัล">
                    <button 
                        onClick={handleClickOpenCardGiftDialog}
                        className="btn btn-primary text-white shadow-lg text-lg tracking-wide" 
                        >
                        <BsGift className='text-2xl' />
                    </button>
                </div>
            </div>
            


            {/*! Gift Dialog */}
            <Dialog open={openCardGiftDialog} onClose={handleCloseCardGiftDialog}>
                <DialogTitle>กำหนดของรางวัลในการสุ่ม</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="ชื่อของรางวัล"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={gift}
                        onChange={(event) => setGift(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSetGift}>ยืนยัน</Button>
                </DialogActions>
            </Dialog>


            {/* Participant Dialog */}
            <Dialog
                open={openListParticipant}
                onClose={handleCloseListParticipant}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                className='w-full'
            >
                {
                    !statusAddingParticipant ?
                    <div className='flex justify-between'>
                        <DialogTitle id="scroll-dialog-title">รายชื่อผู้เข้าร่วม [ {`${participant.length || 0}`} ]</DialogTitle>
                        { participant.length > 2 && <Button onClick={clearListParticipant} className='text-xs mr-2 mt-1'>ล้างข้อมูล</Button> }
                    </div>
                    :
                    <DialogTitle id="scroll-dialog-title">
                        เพิ่มผู้เข้าร่วม <br />
                        <div className='flex flex-col mt-2 gap-y-1'>
                            <span className='text-sm underline mb-0.5'>ตัวอย่าง Input patten 3 แบบ</span>
                            <span className='text-xs text-indigo-700'>สมศักดิ์</span>
                            <span className='text-xs text-indigo-700'>สมศักดิ์  DevOps</span>
                            <span className='text-xs text-indigo-700'>สมศักดิ์-เจริญกรุง  QA</span>
                        </div>
                    </DialogTitle>
                }
                <DialogContent dividers={true}>
                    {
                        // !statusAddingParticipant ?
                        // <DialogContentText
                        //     id="scroll-dialog-description"
                        //     ref={descriptionElementRef}
                        //     tabIndex={-1}
                        // >
                        //     {
                        //         participant.length > 0 ?
                        //         <List className='grid grid-cols-2'>
                        //             {participant.map((item, index) => {
                        //                 return <>
                        //                     <ListItem disablePadding>
                        //                         <ListItemButton>
                        //                             <div className='space mx-2'></div>
                        //                             <ListItemText primary={`${index + 1}.  ${item}`} /> 
                        //                             <div className='space mx-2'></div>
                        //                         </ListItemButton>
                        //                     </ListItem>
                        //                 </>
                        //             })}
                        //         </List>
                        //         :
                        //         <span>- No participant -</span>
                        //     }
                        // </DialogContentText>
                        // : 
                        <textarea 
                            data-theme="light"
                            placeholder="ชื่อ ตำแหน่ง" 
                            className="w-full md:w-[30rem] h-96 textarea textarea-primary text-2xl py-2 px-3 tracking-wide"
                            value={textParticipant}
                            onChange={handdleChageTextParticipant}
                        >
                        </textarea>
                    }
                </DialogContent>
                <DialogActions>
                    {
                        // !statusAddingParticipant ?
                        // <>
                        //     <Button onClick={() => setOpenListParticipant(false)}>ปิด</Button> 
                        //     <Button onClick={handleAddingParticipant}>เพิ่ม{participant.length > 0 && '/แก้ไข '}ผู้เข้าร่วม</Button> 
                        // </>
                        // :
                        <Button onClick={onSubmitNewParticipant}>บันทึก</Button>
                    }
                </DialogActions>
            </Dialog>

        </>
    );
}