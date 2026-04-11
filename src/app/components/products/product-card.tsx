import PixelRevealImage from '@/app/helpers/pixelated-image'
import { Product } from '@/types'
import React from 'react'

const ProductCard = ({item}: {item: Product}) => {
  return (
     <div className="group flex flex-col">
              <div className='bg-[#f6f6f4] rounded-[16px] h-[25rem] overflow-hidden'>
                <PixelRevealImage
                  className='relative h-full w-full rounded-[16px]'
                  src={item.img}
                  alt={item.name}
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className='flex items-center justify-between'>
                  <h2 className="text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] text-black">{item.name}</h2>
                  <h3 className="text-[1.3rem] sm:text-[1.4rem] md:text-[1.5rem] text-black/90 uppercase font-medium">{item.price}</h3>
                </div>
                <p className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] text-black/70 uppercase">{item.description}</p>
              </div>
         </div>
  )
}

export default ProductCard