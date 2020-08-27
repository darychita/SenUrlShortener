export default function normalizeLink(obj) {
    return Object.fromEntries(
        Object.entries(obj).reduce((acc, [ key, value ]) => {
            if (typeof value == 'object') {
                value = value.value;
            }
            if(!!value) {
                acc.push([ key, value ])
            }    
            return acc;
        }, [])
    );
}