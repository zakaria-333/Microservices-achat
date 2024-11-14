import { useEffect, useState, useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import AuthContext from '../../../authRouter/AuthContext';

const SiteStatics = () => {
  const theme = useTheme();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all sites
        const sitesResponse = await fetch('/api/demande/site/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!sitesResponse.ok) {
          throw new Error('Failed to fetch sites');
        }

        const sites = await sitesResponse.json();

        // Ensure sites is an array and contains the expected data
        if (!Array.isArray(sites)) {
          throw new Error('Fetched data is not an array');
        }

        // Extract unique cities
        const uniqueCities = Array.from(new Set(sites.map(site => site.ville).filter(Boolean)));
        console.log(uniqueCities)

        const siteData = await Promise.all(
          uniqueCities.map(async (city) => {
            const citySitesResponse = await fetch(`/api/demande/site/byVille/${city}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!citySitesResponse.ok) {
              throw new Error(`Failed to fetch sites for city ${city}`);
            }

            const citySites = await citySitesResponse.json();

            // Return the city with the count of sites
            return {
              role: city, // Use city name as the role
              nbr: citySites.length,
            };
          })
        );

        setData(siteData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Box sx={{ height: '85vh', paddingBottom: '80px' }}>
      <h1 className="text-center font-bold text-xl underline">
        Statistiques sur le nombre de sites en fonction de leurs villes
      </h1>
      <ResponsiveBar
        data={data}
        keys={['nbr']}
        theme={
          {

            "text": {
              "fontSize": 11,
              "fill": "red",
              "outlineWidth": 0,
              "outlineColor": "transparent"
            },
            "axis": {
              "domain": {
                "line": {
                  "stroke": "#777777",
                  "strokeWidth": 1
                }
              },
              "legend": {
                "text": {
                  "fontSize": 16,
                  "fill": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
                  "outlineWidth": 0,
                  "outlineColor": "transparent"
                }
              },
              "ticks": {
                "line": {
                  "stroke": "#777777",
                  "strokeWidth": 1
                },
                "text": {
                  "fontSize": 11,
                  "fill": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
                  "outlineWidth": 0,
                  "outlineColor": "transparent"
                }
              }
            },
            "grid": {
              "line": {
                "stroke": "#dddddd",
                "strokeWidth": 1
              }
            },
            "legends": {
              "title": {
                "text": {
                  "fontSize": 16,
                  "fill": "#333333",
                  "outlineWidth": 0,
                  "outlineColor": "transparent"
                }
              },
              "text": {
                "fontSize": 16,
                "fill": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
                "outlineWidth": 0,
                "outlineColor": "transparent"
              },
              "ticks": {
                "line": {},
                "text": {
                  "fontSize": 16,
                  "fill": "red",
                  "outlineWidth": 0,
                  "outlineColor": "transparent"
                }
              }
            },
            "annotations": {
              "text": {
                "fontSize": 1,
                "fill": "red",
                "outlineWidth": 2,
                "outlineColor": "#ffffff",
                "outlineOpacity": 1
              },
              "link": {
                "stroke": "#000000",
                "strokeWidth": 1,
                "outlineWidth": 2,
                "outlineColor": "red",
                "outlineOpacity": 1
              },
              "outline": {
                "stroke": "#000000",
                "strokeWidth": 2,
                "outlineWidth": 2,
                "outlineColor": "red",
                "outlineOpacity": 1
              },
              "symbol": {
                "fill": "#000000",
                "outlineWidth": 2,
                "outlineColor": "red",
                "outlineOpacity": 1
              }
            },
            "tooltip": {
              "wrapper": {},
              "container": {
                "background": "#ffffff",
                "color": "#333333",
                "fontSize": 12
              },
              "basic": {},
              "chip": {},
              "table": {},
              "tableCell": {},
              "tableCellValue": {}
            }
          }
        }
        indexBy="role"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.2}
        colors={{ scheme: 'paired' }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legend: '',
          legendPosition: 'end',
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of sites',
          legendPosition: 'middle',
          legendOffset: -50,
          tickValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // Custom tick values
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 20,
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in city: ${e.indexValue}`}
      />
    </Box>
  );
};

export default SiteStatics;