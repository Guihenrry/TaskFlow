import { AspectRatio } from './ui/aspect-ratio'

interface Image {
  src: string
  alt: string
}

interface GalleryProps {
  images: Image[]
}

export function Gallery({ images }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-5">
      {images.map((image, index) => (
        <AspectRatio key={index} ratio={1 / 1}>
          <img
            className="h-full w-full object-cover"
            src={image.src}
            alt={image.alt}
          />
        </AspectRatio>
      ))}
    </div>
  )
}
