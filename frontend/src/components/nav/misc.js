import {useEffect} from 'react'

function hideOnClickOutside(element, cb) {
    const outsideClickListener = event => {
        if (element && !element.contains(event.target)) { // or use: event.target.closest(selector) === null
            cb();
        }
    }

    useEffect(() => {
        document.addEventListener('click', outsideClickListener)
        return () => document.removeEventListener('click', outsideClickListener)
    }, [])



}

export {
    hideOnClickOutside,
}