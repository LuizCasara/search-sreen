
    export const renderAvatar = (id, url) => {
        return (
            <img src={url} className='avatar' alt={`User Avatar - ${id}`} />
        )
    }

    export const renderUrl = (url) => {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">link</a>
        )
    }

    export const renderIsAdmin = (isAdmin) => {
        return (
            <>
                {isAdmin ? '🟢' : '🔴'}
            </>
        )
    }