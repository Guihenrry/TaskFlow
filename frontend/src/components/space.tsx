import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Link } from 'react-router-dom'

interface SpaceProps {
  id: number
  name: string
  image: string
  imageAlt: string
}

export function Space({ id, image, imageAlt, name }: SpaceProps) {
  return (
    <Link to={`/spaces/${id}`} className="flex flex-col gap-3">
      <AspectRatio ratio={1 / 1}>
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={imageAlt}
        />
      </AspectRatio>
      <h3>{name}</h3>
    </Link>
  )
}
