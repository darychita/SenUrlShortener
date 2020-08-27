import { func } from "prop-types";

export default function debounce(fn, wait = 300) {
    let timeout;
    return function(...args) {
        console.log(args);
        const later = () => {
            clearTimeout(timeout);
            fn.apply(args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
}
