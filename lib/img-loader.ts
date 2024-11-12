import { ImageLoaderProps } from "next/image";

export default function myImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  // we need to external image optimizer, cloudflare pages not support internal image optimizer
  return `${src}?w=${width}&q=${quality || 100}`;
}
