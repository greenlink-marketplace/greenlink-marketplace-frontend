import Sidebar from "@components/Sidebar";
import { useContext } from "react";
import { HomeTabsContext } from "@contexts/HomeTabsContext";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import getLocations from "@services/recycling/getLocations";
import getLocationDetails from "@services/recycling/getLocationDetails";
import LocationModal from "@components/LocationModal";

// Corrige ícone padrão do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});



function LocalsPage() {
  const { setCurrentScreen } = useContext(HomeTabsContext)!;

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  setCurrentScreen("locals")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        // fallback
        setPosition([-23.55052, -46.633308]); // São Paulo
      }
    );
  }, []);

  function MapEvents() {
    useMapEvents({
      moveend: async (event) => {
        const map = event.target;
        const bounds = map.getBounds();

        const maxLatitude = bounds.getNorth();
        const minLatitude = bounds.getSouth();
        const maxLongitude = bounds.getEast();
        const minLongitude = bounds.getWest();

        const locations = await getLocations(
          maxLatitude,
          minLatitude,
          maxLongitude,
          minLongitude
        );

        setMarkers(locations);
      },
    });

    return null;
  }

  async function onMarkerClick(location: any) {
    const details = await getLocationDetails(location.id);
    setSelectedLocation(details);
  }


  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100">
        {!position ? (
          <p>Carregando mapa...</p>
        ) : (
          <div className="w-full h-screen">
            <MapContainer
              center={position}
              zoom={13}
              className="w-full h-full z-0"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapEvents />

              {markers.map((item) => (
                <Marker
                  key={item.id}
                  position={[item.latitude, item.longitude]}
                  eventHandlers={{
                    click: () => onMarkerClick(item),
                  }}
                />
              ))}
            </MapContainer>

            {selectedLocation && (
              <LocationModal
                location={selectedLocation}
                onClose={() => setSelectedLocation(null)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default LocalsPage;