"use client"
import Image from 'next/image';
import clipboard from './images/clipboard.png';
import error from './images/alert-circle.png';
import Frame64 from './images/screenShare.png';
import Monitor from './images/monitor.png';
import video from './images/video.png';
import wifiOff from './images/wifi-off.png';
import mic from './images/mic.png';
import leave from './images/Leave.png';

export const ClipboardIcon=()=>{
    return <Image src={clipboard}  alt="Clipboard Icon"
      width={14}
      height={11}/>
}

export const LeaveIcon=()=>{
    return <Image src={leave}  alt="Clipboard Icon"
      width={12}
      height={12}/>
}

export const MicIcon=()=>{
    return <Image src={mic}  alt="Clipboard Icon"
      width={12}
      height={12}/>
}

export const ErrorIcon=()=>{
    return <Image src={error}  alt="error Icon"
      width={8}
      height={8}/>
}
export const Frame64Icon=()=>{
    return <Image src={Frame64}  alt="screenShare Icon"
      width={10}
      height={10}/>
}
export const MonitorIcon=()=>{
    return <Image src={Monitor}  alt="Monitor Icon"
      width={12}
      height={12}/>
}
export const VideoIcon=()=>{
    return <Image src={video}  alt="video Icon"
      width={12}
      height={12}/>
}
export const WifiOffIcon=()=>{
    return <Image src={wifiOff}  alt="wifiOff Icon"
      width={24}
      height={24}/>
}