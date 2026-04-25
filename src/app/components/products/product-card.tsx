import PixelRevealImage from '@/app/helpers/pixelated-image'
import { priceFormatter } from '@/lib/priceFormatter'
import { Product } from '@/types'
import React from 'react'

const ProductCard = ({item}: {item: Product}) => {
  return (
         <a href={`/products/p/${item?.name.replace(/\s+/g, '-')}`} className="group flex flex-col">
              <div className='bg-[#f6f6f4] rounded-[16px] h-[20rem] lg:h-[25rem] overflow-hidden'>
                <PixelRevealImage
                  className='relative h-full w-full rounded-[16px]'
                  src={item.images[0]}
                  alt={item.name}
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className='flex items-center justify-between'>
                  <h2 className="text-[1.3rem] lg:text-[1.5rem] text-black">{item.name}</h2>
                  <p className="text-[1.3rem] lg:text-[1.7rem] text-black/90 uppercase">{priceFormatter(item.price)}</p>
                </div>
                <p className="text-[.75rem] text-black/70 uppercase">{item.description}</p>
              </div>
         </a>
  )
}

export default ProductCard