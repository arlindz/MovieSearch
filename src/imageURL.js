export default function imageURL(path, resolution) {
    return "https://image.tmdb.org/t/p/w" + resolution + "/" +
      path +
      "?api_key=00e98fcc934090f14015fd76e2cf801b"
  }