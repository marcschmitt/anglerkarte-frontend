const osm = {
  maptiler: {
    url: `https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=${process.env.REACT_APP_MAP_KEY}`,
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  },
};

const osmSatellite = {
  maptiler: {
    url: `https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=${process.env.REACT_APP_MAP_KEY}`,
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  },
};

export { osm, osmSatellite };
