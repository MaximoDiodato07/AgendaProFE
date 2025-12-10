
export const REFRESH_EVENT_NAME = 'profileImageUpdated'; 

/**
 * Disparo un evento global en el 'document' para notificar la actualización.
 */
export const notifyMenuRefresh = () => {
    document.dispatchEvent(new Event(REFRESH_EVENT_NAME)); 
};