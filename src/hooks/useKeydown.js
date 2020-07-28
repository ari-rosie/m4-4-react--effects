import React from 'react';

const useKeydown = (code, callback) => {
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.code === code)
                callback();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        }    
        
    });      
};
    

export default useKeydown;