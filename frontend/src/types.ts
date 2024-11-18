export interface SearchRes {
  total_page: number;
  total_elements: number;
  data: FrameImageData[];
}

export interface FrameImageData {
  dialogue_id: string;
  event_name: string;
  character_name: string;
  text: string;
  url: string;
}

export interface SearchReq {
  query: string;
  page: number;
  size: number;
}
