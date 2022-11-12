import './RoundedImage.css';

export function RoundedImage({src, alt, width}) {
    return (
        <img
            src={src}
            alt={alt}
            className={`rounded_image ${width}`}
        />
    )
}
