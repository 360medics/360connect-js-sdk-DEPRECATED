/**
 * Local storage helper class.
 */
class LocalModule
{
    constructor()
    {

    }

    is(key: string)
    {
        const value = localStorage.getItem(key);
        return (value == null) ? false : true;
    }

    erase(key: string)
    {
        localStorage.removeItem(key);
    }

    retrieve(key: string)
    {
        const value = localStorage.getItem(key);

        try {
            return JSON.parse(value);
        } catch(e) {
            return value;
        }
    }

    save(key: string, value: any)
    {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }
}

export let Local = new LocalModule();
