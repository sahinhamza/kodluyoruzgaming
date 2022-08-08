import { useRef, useEffect, useState } from "react"
import "./style.css"

const initialState = {
    name: "",
    email: "",
    message: ""
};

export function Contact() {
    const [inputs, setInputs] = useState(initialState);

    const inputElement = useRef();

    useEffect(() => {
        inputElement.current.focus();
    }, []);

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInputs(initialState);
    }

    return (
        <>
            <form className="container contact" onSubmit={handleSubmit}>
                <div className="formcontrol">
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        ref={inputElement}
                    />
                </div>

                <div className="formcontrol">
                    <label htmlFor="email">Email Adress:</label>
                    <input
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="formcontrol">
                    <label htmlFor="message">Your Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={inputs.message}
                        onChange={handleChange}
                    />
                </div>
                <button className="select-btn" > Send Message</button>
            </form>
        </>
    )
}