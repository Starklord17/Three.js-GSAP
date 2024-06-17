import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { hightlightsSlides } from "../constants"
import { pauseImg, playImg, replayImg } from "../utils";


const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  })

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if(loadedData.length > 3) {
      if(!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  const handleLoadedMetadata = (i, e) => setLoadedData((prevVideo) => [...prevVideo, e])
  

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if(span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if(progress !=currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760
                ? '10vw' // mobile
                : window.innerWidth < 1200
                  ? '10vw' // tablet
                  : '4vw' // laptop
            });
            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if(isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf'
            })
          }
        }
      })

      if(videoId === 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
      }
  
      if(isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate)
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate)
      }
    }
    

  }, [videoId, startPlay, isPlaying])

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prevVideo) => ({...prevVideo, isEnd: true, videoId: i + 1}))
        break;
      case 'video-last':
        setVideo((prevVideo) => ({...prevVideo, isLastVideo: true}))
        break;
      case 'video-reset':
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: false,
          isLastVideo: false,
          videoId: 0,
        }))
        break;
      case 'play':
        setVideo((prevVideo) => ({
          ...prevVideo,
          // startPlay: true,
          isPlaying: !prevVideo.isPlaying
        }))
        break;
      case 'pause':
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying
        }))
        break;
      default:
        return video;
    }
  }
  

  return (
    <>
    <section className="flex items-center">
      {hightlightsSlides.map((list, i) => ( // parentheses for 'Immediate Return' or 'Implicit Return'.
        <article key={list.id} id="slider" className="sm:pr-20 pr-10">
          <div className="video-carousel_container">
            <figure className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
              <video
                id='video'
                playsInline={true}
                preload='auto'
                muted
                className={`
                  ${list.id === 2 && 'translate-x-44'}
                  pointer-events-none
                `}
                ref={(el) => (videoRef.current[i] = el)}
                onEnded={() => 
                  i !== 3
                    ? handleProcess('video-end', i)
                    : handleProcess('video-last')
                }
                onPlay={() => {
                  setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: true,
                  }))
                }}
                onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
              >
                <source src={list.video} type="video/mp4" />
              </video>
            </figure>
            <figcaption className="absolute top-12 left-[5%] z-10">
              {list.textLists.map((text) => (
                <p key={text} className="md:text-2xl text-xl font-medium">
                  {text}
                </p>
              ))}
            </figcaption>
          </div>
        </article>
      ))}
    </section>

    <div className="relative flex-center mt-10">
      <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
        {videoRef.current.map(( _, i) => ( // We get each video but we do not anything with it, so _
          <span
            key={i}
            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            ref={(el) => (videoDivRef.current[i] = el)}
          >
            <span 
              className="absolute h-full w-full rounded-full"
              ref={(el) => (videoSpanRef.current[i] = el)} 
            />

          </span>
        ))}
      </div>

        <button className="control-btn">
          <img 
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'} 
            onClick={isLastVideo ? () => handleProcess('video-reset')
              : !isPlaying 
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          />
        </button>

    </div>
    
    </>
  )
}

export default VideoCarousel