import React, {useState} from 'react'

const Button = ({ color='rgb(136, 132, 216)', text, onClick, kind='primary'}) => {
    const [hovered, setHovered] = useState(false)
    const style={
        color: kind === 'primary' ? 'white' : color,
        backgroundColor: kind === 'primary' ? color : 'white',
        ...(kind === 'primary' ? {
            border: 'none'
        } : {
            border: `2px solid ${color}`
        }),
        padding: '6px 16px',
        outline: 'none',
        borderRadius: '8px',
        ...(hovered && kind === 'primary' ? {
            filter: 'brightness(1.2)'
        } : hovered ? {
            color: 'white',
            backgroundColor: color,
        } : {}),
    }
    return (
        <button style={style} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {text}
        </button>
    )
}

export default Button