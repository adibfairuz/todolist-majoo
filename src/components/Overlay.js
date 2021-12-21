import React, {useEffect} from 'react'
import PropTypes from 'prop-types'

export default function Overlay(props) {

    useEffect(() => {
        if (props.disableScroll) {
         document.body.style.overflow = 'hidden'
        }
        return ()=> document.body.style.overflow = 'unset'
    }, [])

    const handleOverlay = () => {
        if (props.set) {
            props.set(false)
        }
    }
    
    return (
        <>
        {
            props.show
            ?
            <div onClick={handleOverlay} className={props.className ? props.className : ''} style={{zIndex: props.zIndex ? props.zIndex : 125}} id="bbx-overlay"  />
            :
            null

        }
        </>
    )
}

Overlay.propTypes = {
    className : PropTypes.string,
    show: PropTypes.bool
}