import React, { useContext, useState } from "react";
import * as c from "../constants/constants";
import { useGetMarkers } from "../api/services/markers";
import { useGetPositions } from "../api/services/positions";
import useWindowDimensions from "../hooks/useWindowDimensions";
import StateContext from "../contexts/StateContext";

import { ScaleIcon, MenuAlt4Icon } from "@heroicons/react/outline";
import { LocationMarkerIcon } from "@heroicons/react/solid";

import ClosedSeason from "./ClosedSeason";

import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
  Polygon,
  useMapEvents,
  useMap,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import { osm, osmSatellite } from "../osm-providers";
import Control from "react-leaflet-custom-control";

function GetIcon(_iconUrl, _iconSize) {
  return L.icon({
    iconUrl: _iconUrl,
    iconSize: _iconSize,
  });
}

function Map() {
  let [zoomLevel, setZoomLevel] = useState(12);
  let [position, setPosition] = useState([
    49.65051498596064, 6.562957763671875,
  ]);
  let [markerOpacity, setMarkerOpacity] = useState(0);

  const { fishingLaws } = useContext(StateContext);
  const { showFishingLawsModal } = useContext(StateContext);

  const { legend } = useContext(StateContext);
  const { showLegendModal } = useContext(StateContext);

  const { data: markers } = useGetMarkers();
  const { data: positions } = useGetPositions();

  const { width } = useWindowDimensions();

  function GetZoomLevel() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
      },
    });
    return null;
  }

  const GetUserPosition = () => {
    const map = useMap();

    const getPosition = () => {
      map
        .locate()
        .on("locationfound", function (e) {
          setPosition(e.latlng);
          setMarkerOpacity(1);
          map.flyTo(e.latlng);
        })
        .on("locationerror", function (e) {
          alert("Standortzugriff muss für den Broweser aktiviert werden.");
        });
    };

    return (
      <>
        <Control position="topleft">
          <button
            className="p-2.5 text-sm text-gray-500 bg-white border-gray-200 rounded-sm"
            onClick={() => getPosition()}
          >
            <LocationMarkerIcon className="w-5 h-5" />
          </button>
        </Control>
        <Marker
          position={position}
          icon={GetIcon(c.LOCATION_MARKER, 25)}
          opacity={markerOpacity}
        >
          <Popup>You are here</Popup>
        </Marker>
      </>
    );
  };

  return (
    <>
      <div className="h-[calc(100vh_-_64px)]">
        <MapContainer
          center={position}
          zoom={12}
          style={{ width: "100%", minHeight: "100%", zIndex: 10 }}
          tap={false}
        >
          {width <= 810 ? (
            <>
              <Control position="topleft">
                <button
                  className="p-2.5 text-sm text-gray-500 bg-white border-gray-200 rounded-sm"
                  onClick={() => showLegendModal(!legend)}
                >
                  <MenuAlt4Icon className="w-5 h-5" />
                </button>
              </Control>
              <Control position="topleft">
                <button
                  className="p-2.5 text-sm text-gray-500 bg-white border-gray-200 rounded-sm"
                  onClick={() => showFishingLawsModal(!fishingLaws)}
                >
                  <ScaleIcon className="w-5 h-5" />
                </button>
              </Control>
            </>
          ) : null}

          <GetUserPosition />
          <GetZoomLevel />
          <ClosedSeason map={true} />
          <LayersControl position="topleft">
            <LayersControl.BaseLayer checked name="Standard">
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url={osmSatellite.maptiler.url}
                attribution={osmSatellite.maptiler.attribution}
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {positions
            ? positions.data.map((position) => {
                let latLngPosition = position.attributes.nodes.map((pos) => [
                  pos.lat,
                  pos.long,
                ]);

                let permissionColor;

                switch (position.attributes.permission) {
                  case "allowed":
                    permissionColor = c.COLOR_ALLOWED;
                    break;
                  case "forbidden":
                    permissionColor = c.COLOR_FORBIDDEN;
                    break;
                  case "temporarilyNotPossible":
                    permissionColor = c.COLOR_TEMPORARILY_NOT_POSSIBLE;
                    break;
                  case "limitedPossible":
                    permissionColor = c.COLOR_LIMITED_POSSIBLE;
                    break;
                  case "notPossible":
                    permissionColor = c.COLOR_NOT_POSSIBLE;
                    break;
                  default:
                    permissionColor = c.COLOR_FORBIDDEN;
                    break;
                }

                if (position.attributes.type !== "Ufer") {
                  return (
                    <Polygon
                      pathOptions={{
                        color: permissionColor,
                      }}
                      positions={latLngPosition}
                      key={position.id}
                    />
                  );
                }

                if (position.attributes.type === "Ufer") {
                  return (
                    <Polyline
                      pathOptions={{ color: permissionColor }}
                      positions={latLngPosition}
                      key={position.id}
                    />
                  );
                }
              })
            : null}

          {markers && zoomLevel >= 13
            ? markers.data.map((marker) => {
                let type;

                switch (marker.attributes.type) {
                  case "harbor":
                    type = c.HARBOR;
                    break;
                  case "shallowWaterZone":
                    type = c.SHALLOW_WATER_ZONE;
                    break;
                  case "temporarilyNotPossible":
                    type = c.TEMPORARILY_NOT_POSSIBLE;
                    break;
                  case "boatDock":
                    type = c.BOAT_DOCK;
                    break;
                  case "restricted":
                    type = c.RESTRICTED;
                    break;
                  default:
                    type = c.RESTRICTED;
                    break;
                }

                return (
                  <Marker
                    position={[
                      marker.attributes.node[0].lat,
                      marker.attributes.node[0].long,
                    ]}
                    key={marker.id}
                    icon={GetIcon(type, 25)}
                  >
                    <Popup>
                      <h4 className="text-sm text-gray-900">
                        {marker.attributes.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {marker.attributes.description}
                      </p>
                      {marker.attributes.type === "shallowWaterZone" && (
                        <p className="text-sm text-red-800">
                          Angeln ganzjährig verboten!
                        </p>
                      )}
                    </Popup>
                  </Marker>
                );
              })
            : null}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;
