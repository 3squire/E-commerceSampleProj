import {useNavigate} from "react-router-dom"
import './BackButton.css'

export default function BackButton() {

    const navigate = useNavigate()
    
    const onClick = () => {
        navigate(-1)
    }

    return (

        <button className="back-button" onClick={onClick} aria-label="Go back">
            ← Back
        </button>
    )
}
