import image01 from "./mod/images/01.jpg";
import image02 from "./mod/images/02.jpg";
import image03 from "./mod/images/03.jpg";
import image04 from "./mod/images/04.jpg";
import image05 from "./mod/images/05.jpg";

export type Image = {
  url: string;
  name: string | null;
  location: string | null;
  source: string;
};

export const images: Image[] = [
  {
    url: image01,
    name: "Glacier National Park",
    location: "Going-to-the-Sun Road, West Glacier, United States",
    source: "https://unsplash.com/photos/uWvl0xuVScI",
  },
  {
    url: image02,
    name: "The emphasis on the sunset",
    location: "Monte Grappa, Italy",
    source: "https://unsplash.com/photos/kRnkqSKZODQ",
  },
  {
    url: image03,
    name: null,
    location: "Mount Hood National Forest, United States",
    source: "https://unsplash.com/photos/FlwhX4vtzt0",
  },
  {
    url: image04,
    name: "Gloomy forest in the fog",
    location: null,
    source: "https://unsplash.com/photos/qKFxQ3X-YbI",
  },
  {
    url: image05,
    name: "Orange clouds over mountains",
    location: "Hidden Lake Lookout trailhead, United States",
    source: "https://unsplash.com/photos/RbbdzZBKRDY",
  },
];
