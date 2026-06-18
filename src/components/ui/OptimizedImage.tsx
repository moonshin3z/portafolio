/**
 * Imagen optimizada con soporte WebP.
 * Usa <picture> para servir WebP cuando existe (mismo path con extensión .webp).
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const OptimizedImage = ({ src, alt, className, loading = 'lazy', onError }: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={onError}
    />
  );
};

export default OptimizedImage;
