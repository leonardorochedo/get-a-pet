import './RoundedImage.css';

export function RoundedImage({src, alt, width}) {
    return (
        <img
            className={`rounded_image ${[width]}`}
            src={src}
            alt={alt}
        />
    )
}
