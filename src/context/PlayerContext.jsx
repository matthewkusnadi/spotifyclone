import { createContext, useRef, useState, useEffect } from "react"
import { songsData } from "../assets/assets"

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const audioRef = useRef(null)
    const seekBg = useRef(null)
    const seekBar = useRef(null)

    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = (id) => {
        const selectedTrack = songsData.find(song => song.id === id)
        if (selectedTrack) {
            setTrack(selectedTrack)
            audioRef.current.src = selectedTrack.file
            play() // Automatically play the track when selected
        }
    }

    const updateTime = () => {
        if (audioRef.current) {
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60),
                },
                totalTime: {
                    second: Math.floor(audioRef.current.duration % 60),
                    minute: Math.floor(audioRef.current.duration / 60),
                }
            })
        }
    }



    const previous = async () => {
        if (track.id > 0 ){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlayStatus(true)
        }
    }
    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true)
        }
    }

    const seekSong = async (e)=>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/ seekBg.current.offsetWidth)*audioRef.current.duration)
    } 

    useEffect(() => {
        const audioElement = audioRef.current

        if (audioElement) {
            audioElement.addEventListener('timeupdate', updateTime)
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', updateTime)
            }
        }
    }, [])

    useEffect(() => {
        if (seekBar.current && audioRef.current) {
            const seekPercentage = audioRef.current.currentTime / audioRef.current.duration
            seekBar.current.style.width = `${seekPercentage * 100}%`
        }
    }, [time.currentTime])

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider
