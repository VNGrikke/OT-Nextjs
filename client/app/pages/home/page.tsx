import React from 'react'
import Header from '@/components/header/page'
import Carousel from '@/components/carosel/page'
import Footer from '@/components/footer/page';

export default function page() {
  const images = [
    'https://via.placeholder.com/600x300/FF5733/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/600x300/33C3FF/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/600x300/9D33FF/FFFFFF?text=Slide+3'
  ];
  return (
    <div>
      <Header />
      <Carousel images={images} interval={5000} />

      <Footer/>
    </div>
  )
}
