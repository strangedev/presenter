interface ListSlidesResponse {
  slides: Record<string, {
    id: string;
    path: string;
  }>;
}

export type {
  ListSlidesResponse
}
