import Modal from 'react-modal';
export default function Login({ isOpen }) {
    return (
        <div>
            <Modal isOpen={isOpen}>
                <div className="Login__modal">
                    <div className="Login__modal--imgDiv">
                        <img src="#" alt="" />
                    </div>
                    <div className="Login__modal--form">
                        <input />
                        <input />
                    </div>
                </div>
            </Modal>
        </div>
    );
}


