import './Modal.css'

export default function Modal({children, onClose}) {
    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content position-relative" onClick={e => e.stopPropagation()}>
            {children}
            <button onClick={onClose} className='btn'>Cancel</button>
          </div>
        </div>
    );
}