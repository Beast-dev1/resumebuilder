import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Feature from '../components/home/Feature'
import Testimonial from '../components/home/Testimonial'

function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Hero />
      <Feature />
      <Testimonial />
    </div>
  )
}

export default Home

