import { StaticImageData } from "next/image";

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface AuthLayoutProps {
  children: React.ReactNode;
}

interface PageOptions {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface QueryParams {
  current_page?: number;
  last_page?: number;
  per_page?: number;
}

export type { ImageProps, AuthLayoutProps, PageOptions, QueryParams };
