import { FC, useRef, memo } from 'react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

export const LazyLoad: FC = memo(({ children }) => {
   const ref = useRef<HTMLDivElement | null>(null)
   const entry = useIntersectionObserver(ref, {
      freezeOnceVisible: true,
      rootMargin: '65px',
   })
   const isVisible = !!entry?.isIntersecting

   return (
      <div ref={ref}>
         <div>{isVisible && <>{children}</>}</div>
      </div>
   )
})
