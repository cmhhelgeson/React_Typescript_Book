import React, {useEffect, useRef} from "react"

import { dragRefWith, resizeRefWith} from '../../utils/windowUtils';

type GenericXPWindowProps = {
    text: string
    children?: React.ReactNode
}

export const GenericXPWindow = (
    {text, children}: GenericXPWindowProps
) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const titleBarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        dragRefWith(windowRef, titleBarRef)
        resizeRefWith(windowRef, windowRef);
    }, [])

    return (
        <div className="window" style={{
            "height": "500px", 
            "width": "500px", 
            "position": "relative", 
            "top": "10px",
            "left": "10px"}} ref={windowRef}>
            <div className='title-bar' ref={titleBarRef}>
                <div className='title-bar-text' style={{"margin": "0.25rem"}}>Redux Paint</div>
                <div className="title-bar-controls">
                    <button aria-label="Close" />
                </div>
            </div>
            {children}
        </div>
    );
}