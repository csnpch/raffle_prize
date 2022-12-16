import { useState, useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { GoMute, GoUnmute } from 'react-icons/go';


export function Gift() {
    
    const [gift, setGift] = useState([]);

    const statusMuteSound = useStoreState((state) => state.statusMuteSound);
    const setStatusMuteSound = useStoreActions((actions) => actions.setStatusMuteSound);

    useEffect(() => {
        setInterval(() => {
            setGift(JSON.parse(localStorage.getItem('gift')));
        }, 2000)
    }, []);

    
    return <>
    
    <div className="relative box w-full h-[26rem] fullXl:-mt-[9rem] fullXl:h-[34rem] bg-sky-300/30 rounded-2xl text-white">
        <div className="ribbon ribbon-top-left"><span>Prize Gift</span></div>

        <div className='wh-full flex-center relative'>
            <div className='w-[6rem] h-[6rem] absolute -right-6 -top-6 opacity-80'>
                <img className='wh-full flower' src="./flower.png" alt="" />
            </div>
            <div className={`flex flex-col ${gift.length > 4 ? (gift.length > 6 ? 'text-2xl' : 'text-3xl') : 'text-4xl'}`}>
                {
                    gift.length !== 0 ?
                    gift.map((item, index) => {
                        return (
                            <>
                                <div className="logo is-animetion w-full flex-center">
                                    {
                                        item.split('').map((letter) => {
                                            return (
                                                <span className={`${gift.length > 6 ? 'py-1' : 'py-2'}`}>{letter}</span>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                    :
                    <div className='text-2xl animateZoom'>
                        - ยังไม่ได้ตั้งของขวัญ - 
                    </div>
                }
            </div>
            
            {/* <div className='fixed -bottom-[4rem] right-60 text-4xl w-40 h-40 cursor-pointer' style={{zIndex: 999}}>
                <GoMute className={`${!statusMuteSound && 'hidden'}`} onClick={() => { setStatusMuteSound(!statusMuteSound) }} />
                <GoUnmute className={`${statusMuteSound && 'hidden'}`} onClick={() => { setStatusMuteSound(!statusMuteSound) }} />
            </div> */}
        </div>
        {/* <div className="ribbon ribbon-top-right"><span>Prize Gift</span></div> */}
        {/* <div className="ribbon ribbon-bottom-left"><span>Prize Gift</span></div> */}
        <div className="ribbon ribbon-bottom-right"><span>Prize Gift</span></div>
    </div>

    </>;
}