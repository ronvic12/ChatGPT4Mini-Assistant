import React from 'react';

function useChatScroll<T>(dep:T):React.RefObject<HTMLDivElement | null> {
    const ref = React.useRef<HTMLDivElement |null>(null);
    React.useEffect(()=>{
        if(ref.current){
            ref.current.scrollTop = ref.current.scrollHeight;// scroll is always at the bottom
        }
    },[dep])
    return ref;


};
export default useChatScroll;