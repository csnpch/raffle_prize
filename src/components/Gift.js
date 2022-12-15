import { useState, useEffect } from 'react';


export function Gift() {
    
    const [gift, setGift] = useState([]);

    useEffect(() => {
        setInterval(() => {
            setGift(JSON.parse(localStorage.getItem('gift')));
        }, 2000)
    }, []);

    
    return <>
    
    <div class="relative box w-full h-[26rem] fullXl:-mt-[9rem] fullXl:h-[34rem] bg-sky-300/30 rounded-2xl text-white">
        <div class="ribbon ribbon-top-left"><span>Prize Gift</span></div>

        <div className='wh-full flex-center'>
            <div className={`flex flex-col ${gift.length > 4 ? (gift.length > 6 ? 'text-2xl' : 'text-3xl') : 'text-4xl'}`}>
                {
                    gift.map((item, index) => {
                        return (
                            <>
                                <div class="logo is-animetion w-full flex-center">
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
                }
            </div>
        </div>
        {/* <div class="ribbon ribbon-top-right"><span>Prize Gift</span></div> */}
        {/* <div class="ribbon ribbon-bottom-left"><span>Prize Gift</span></div> */}
        <div class="ribbon ribbon-bottom-right"><span>Prize Gift</span></div>
    </div>

    </>;
}