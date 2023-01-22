import Vibrant from 'node-vibrant';

// export const getAirlineProminentColor = async (airlineName) => {
//   const response = await fetch(
//     `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
//       airlineName
//     )}+logo&cx=017576662512468239146:omuauf_lfve&imgSize=large&imgType=news&num=1&searchType=image&key=YOUR_API_KEY`
//   );
//   const data = await response.json();
//
//   // Return the image URL of the first search result
//   return data.items[0].link;
// }

export const getProminentColor = async(imageLink) => {
  console.log("Function called");
  const palette = await Vibrant.from(imageLink).getPalette();
  const dominantColor = palette.Vibrant.getHex();

  console.log(dominantColor);
  // Return the dominant color as a CSS color string
  return `${dominantColor}`;
}
