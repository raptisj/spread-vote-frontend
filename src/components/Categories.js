import React from "react";
import { Box } from "@chakra-ui/core";
import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ResponsivePie } from "@nivo/pie";

const CategoryHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryLink = styled(Link)`
  && {
    color: ${(props) => props.theme.colors.green.brand};
    background: #19c39c20;
    font-size: 20px;
    font-weight: 600;
    padding: 8px;
    margin-right: 16px;

    &:hover {
      background: ${(props) => props.theme.colors.red.customRed};
      color: #fff;
    }

    &:hover::after,
    &:active::after {
      display: none;
    }
  }
`;

const Categories = ({ categoryData }) => {
  const { podId } = useParams();

  return (
    <Box height="440px" p="32px">
      <CategoryHead>
        <h2>Categories</h2>
        <CategoryLink to={`/podcasts/${podId}/vote`}>
          Vote category
        </CategoryLink>
      </CategoryHead>

      <ResponsivePie
        data={categoryData}
        margin={{ top: 40, right: 20, bottom: 80, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "nivo" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableRadialLabels={false}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default Categories;
// const Categories = () => {
//   return (
//     <Box padding="32px">
//       <h2>Categories</h2>
//       <ul>
//         <li>
//           Comedy <strong>14%</strong>
//         </li>
//         <li>
//           MMA <strong>10%</strong>
//         </li>
//         <li>
//           Politics <strong>9%</strong>
//         </li>
//         <li>
//           Science <strong>3%</strong>
//         </li>
//       </ul>
//     </Box>
//   );
// };

// export default Categories;
