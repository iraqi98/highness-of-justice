/**
 * next/image and plain <a> tags don't get basePath automatically, so prefix
 * local paths with this. Empty when the site is served from the domain root.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBase = (path: string) => `${basePath}${path}`;
