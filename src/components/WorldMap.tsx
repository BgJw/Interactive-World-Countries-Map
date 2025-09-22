import { ComposableMap, Geographies, Geography, Annotation, Graticule } from "react-simple-maps";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { useEffect, useState } from "react";
import * as topojson from "topojson-client";
import { geoCentroid, geoArea } from "d3-geo";
import { useCountryStore } from "../store/useCountryStore";
import iso from 'iso-3166-1';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";


export const WorldMap = () => {
  const [geographies, setGeographies] = useState<Feature<Geometry, GeoJsonProperties>[]>([]);
  const fetchCountry = useCountryStore( state => state.fetchCountry);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => {
        const countriesFeatureCollection = topojson.feature(
          data,
          data.objects.countries
        ) as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>;
        const countries = countriesFeatureCollection.features;
        
        setGeographies(countries);
      })
      .catch((err) => {
        console.error("Ошибка загрузки карты:", err);
      });
  }, []);

  return (
    <div className="worldMap">
      <ComposableMap 
          projection="geoNaturalEarth1" 
          accumulate="none" 
          style={{ width: "80%", height: "100%", marginTop: "-300px" }} 
        projectionConfig={{
        scale: 140,
        center: [0, 20],
      }}>
      <Graticule stroke="#000000ff" step={[30, 30]} />  
        {geographies.length > 0 && (
          <Geographies geography={geographies}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const area = geoArea(geo);
                return (
                  <g key={geo.rsmKey}>
                    <Geography
                      onClick={() => {
                        const id = geo.id.toString().padStart(3, "0");
                        const countryInfo = iso.whereNumeric(id);
                        if (countryInfo) {
                          const alpha3 = countryInfo.alpha3;
                          fetchCountry(alpha3);
                        } else {
                          console.warn("Не удалось определить страну по id", id);
                        }
                      }}
                      geography={geo}
                      style={{
                        default: { fill: "rgba(221, 221, 221, 1)", outline: "none" },
                        hover: { fill: "#aaa", outline: "none" },
                        pressed: { fill: "#666", outline: "none" },
                      }}
                      >
                        <title>{geo.properties.name}</title>
                    </Geography>
                    {
                      area > 0.002 && (
                        <Annotation
                        subject={centroid}
                        dx={0}
                        dy={0}
                        connectorProps={{ stroke: "none" }}
                        >
                          <text
                              x={0}
                              y={0}
                              textAnchor="middle"
                              alignmentBaseline="middle"
                              style={{ fontSize: Math.max(1, Math.min(4, area * 1000)), fill: "#333", cursor: "default", pointerEvents: "none", letterSpacing: "0.05em" }}
                              >
                                {geo.properties.name}
                          </text>
                      </Annotation>
                    )}
                  </g>
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
  </div>
  );
};
