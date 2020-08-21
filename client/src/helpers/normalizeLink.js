export default function normalizeLink(obj) {
    return Object.fromEntries(
        Object.entries(obj).reduce((acc, [ key, { value } ]) => {
            if(!!value) {
                acc.push([ key, value ])
            }    
            return acc;
        }, [])
    );
}