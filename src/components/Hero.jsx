import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const Hero = () => {
  useGSAP(() => {
    gsap.to('#hero', { duration: 2, opacity: 1, delay: 0.5 })
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
      </div>
    </section>
  )
}

export default Hero