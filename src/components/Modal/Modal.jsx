import { LuX } from "react-icons/lu";

export default function Modal({children}) {
    return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content position-relative" onClick={e => e.stopPropagation()}>
            {children}
            <button onClick={onClose} className='close-btn'><LuX /></button>
          </div>
        </div>
    );
}