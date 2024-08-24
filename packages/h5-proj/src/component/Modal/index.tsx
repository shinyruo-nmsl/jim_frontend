import { CSSTransition } from 'react-transition-group';
import ReactDom from 'react-dom';
import './index.scss'
import React from 'react';


interface ModalProps {
    visible: boolean;
    onClickMask: () => void;
    children: React.ReactNode;
}

function Modal(props: ModalProps) {
    const { visible, onClickMask, children } = props;
    const nodeRef = React.useRef(null)
    const ModalContent = <CSSTransition
        nodeRef={nodeRef}
        in={visible}
        timeout={300}
        classNames='slide-right'
        unmountOnExit
    >
        <div
            ref={nodeRef}
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-prioty'
            onClick={onClickMask}
        >
            {children}
        </div>
    </CSSTransition>

    return ReactDom.createPortal(ModalContent, document.body);
}


export default Modal;
