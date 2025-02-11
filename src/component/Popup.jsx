// Filename: App.js
import Pop from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import ContactForm from './ContactForm';
import { useLocation } from 'react-router-dom';
    
export default function Popup() {
    const searchParams = useLocation();
    
    console.log(searchParams);
    return (
        <div>
            <h4>Contact Page</h4>
            
            <Pop trigger=
                {<button> Add Contact </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <ContactForm/>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Cancel
                                </button>
                            </div>
                        </div>
                    )
                }
            </Pop>
        </div>
    )
};
