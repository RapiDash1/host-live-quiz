import React from 'react';
import ComponentType from "../Helpers/Helpers";

interface socketInterface {
    socket: WebSocket,
    roomId: string,
    user: string,
    setActiveComponent: (ac: ComponentType)=>void
}

export default socketInterface;