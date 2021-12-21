import React, {useEffect, useState} from 'react'
import { Modal as ModalBootstrap } from 'react-bootstrap'
import { RiCloseFill } from 'react-icons/ri'
import Overlay from './Overlay'
import PropTypes from 'prop-types'

export default function Modal(props){
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = (e) => {
        props.handleShowModal(e)
    }

    useEffect(() => {
        setShowModal(props.showModal)
    }, [props.showModal])

    return (
        <>
        <ModalBootstrap centered backdrop={props.backdrop? true : false} show={showModal} onHide={handleShowModal} className={`px-2 modal ${props.className ? props.className : ''}`} size={props.size ? props.size : 'md'}>
                <div style={{zIndex:1, position:'relative', fontSize: '.95em'}} className="mx-3">
                    {props.children}
                </div>
        </ModalBootstrap>
        <Overlay show={showModal} />
        </>
    )
}

Modal.propTypes = {
    /** image will be displayed at the top right of the modal */
    showModal: PropTypes.bool,
    handleShowModal: PropTypes.func,
    size:PropTypes.string
}
