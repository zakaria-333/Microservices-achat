import { useEffect, useState, useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import AuthContext from '../../../authRouter/AuthContext';

const UserStatics = () => {
  const theme = useTheme();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all categories
        const categoriesResponse = await fetch('/api/budget/categorie/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }

        const categories = await categoriesResponse.json();

        console.log(categories);

        const categoryData = await Promise.all(
          categories.map(async (category) => {
            const subcategoriesResponse = await fetch(`/api/budget/subcategorie/category/${category.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!subcategoriesResponse.ok) {
              throw new Error(`Failed to fetch subcategories for category ${category.nom}`);
            }

            const subcategories = await subcategoriesResponse.json();

            // Return the category with the count of subcategories
            return {
              id: category.nom, // Use category name as the id for the pie chart
              label: category.nom,
              value: subcategories.length,
            };
          })
        );

        setData(categoryData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Box sx={{ height: '70vh', paddingBottom: '80px' }}>
      <h1 className="text-center font-bold text-xl underline">
        le nombre de sous categories en fonction de leurs categories
      </h1>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        theme={{
          // optionel poour personaliser en plus le style c est pour ca on ajout la variable theme 
          "text": {
            "fontSize": 11,
            "fill": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
            "outlineWidth": 0,
            "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black
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
                "fontSize": 12,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black
              }
            },
            "ticks": {
              "line": {
                "stroke": "#777777",
                "strokeWidth": 1
              },
              "text": {
                "fontSize": 11,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black
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
                "fontSize": 11,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black
              }
            },
            "text": {
              "fontSize": 11,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black
            },
            "ticks": {
              "line": {},
              "text": {
                "fontSize": 10,
                "fill": "#333333",
                "outlineWidth": 0,
                "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black
              }
            }
          },
          "annotations": {
            "text": {
              "fontSize": 13,
              "fill": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
              "outlineWidth": 2,
              "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
              "outlineOpacity": 1
            },
            "link": {
              "stroke": "#000000",
              "strokeWidth": 1,
              "outlineWidth": 2,
              "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
              "outlineOpacity": 1
            },
            "outline": {
              "stroke": "#000000",
              "strokeWidth": 2,
              "outlineWidth": 2,
              "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
              "outlineOpacity": 1
            },
            "symbol": {
              "fill": "#000000",
              "outlineWidth": 2,
              "outlineColor": theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
              "outlineOpacity": 1
            }
          },
          "tooltip": {
            "wrapper": {},
            "container": {

              "color": 'black',
              "fontSize": 12
            },
            "basic": {},
            "chip": {},
            "table": {},
            "tableCell": {},
            "tableCellValue": {}
          }
        }}
        borderColor={{
          from: 'color',
          modifiers: [
            ['darker', 0.2]
          ],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [
            ['darker', 2]
          ],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
            color: theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}

        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.mode == 'dark' ? theme.palette.common.white : theme.palette.common.black,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default UserStatics;
