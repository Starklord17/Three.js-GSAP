import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Navbar from "./components/Navbar"
import Model from "./components/Model"
import Features from "./components/Features"
import HowitWorks from "./components/HowitWorks"
import Footer from "./components/Footer"


const App = () => {


  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowitWorks />
      <Footer />
    </main>
  )
}

export default App
