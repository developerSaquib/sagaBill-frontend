"use client";

import * as React from "react";
import { BadgeIndianRupee, Scissors, Trophy } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import getData from "@/api/getData.api";

// const chartData = [
//   { artist: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "#92C5F9" },
//   { browser: "other", visitors: 200, fill: "var(--color-other)" },
// ];

const chartConfig = {
  // artist: {
  //   label: "Artist",
  // },
  // chrome: {
  //   label: "Chrome",
  //   color: "hsl(var(--chart-1))",
  // },
  // safari: {
  //   label: "Safari",
  //   color: "hsl(var(--chart-2))",
  // },
  // firefox: {
  //   label: "Firefox",
  //   color: "hsl(var(--chart-3))",
  // },
  // edge: {
  //   label: "Edge",
  //   color: "hsl(var(--chart-4))",
  // },
  // other: {
  //   label: "Other",
  //   color: "hsl(var(--chart-5))",
  // },
} satisfies ChartConfig;

export default function Dashboard(): JSX.Element {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [chartData, setChartData] = React.useState<{
    topArtist: any[];
    topItems: any[];
    topService: any[];
  }>({ topArtist: [], topItems: [], topService: [] });

  React.useEffect(() => {
    const init = async () => {
      const response = await getData("/dashboards");
      setChartData(response.data);
    };
    init();
  }, []);

  const totalVisitors = React.useMemo(() => {
    let tArt = 0;
    let tItm = 0;
    let tServ = 0;
    tArt = chartData.topArtist.reduce((acc, curr) => acc + curr.count, 0);
    console.log(tArt);
    tItm = chartData.topItems.reduce((acc, curr) => acc + curr.count, 0);
    tServ = chartData.topService.reduce((acc, curr) => acc + curr.count, 0);
    return { topArtist: tArt, topItems: tItm, topService: tServ };
  }, [chartData]);
  console.log(totalVisitors);
  return (
    <>
      <div className="container flex flex-col">
        <div className="w-full mb-4">
          <h3 className="text-transform: uppercase text-center mx-auto my-4 font-bold">
            Top In This Month
          </h3>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="basis-1/3">
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>
                  Top 5 best Performing artist in this Month
                </CardTitle>
                <CardDescription>
                  {startOfMonth.toLocaleDateString()} -
                  {now.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData.topArtist}
                      dataKey="count"
                      nameKey="artist"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalVisitors.topArtist.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Artist
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Best Performers <b>{chartData?.topArtist[0]?.artist}</b>
                  <Trophy className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  {/* Showing total visitors for the last 6 months */}
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="basis-1/3">
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle> Top 5 best Selling items in this Month</CardTitle>
                <CardDescription>
                  {startOfMonth.toLocaleDateString()} -
                  {now.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData.topItems}
                      dataKey="count"
                      nameKey="item"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalVisitors.topItems.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Items
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Best Selling Items <b>{chartData?.topItems[0]?.item}</b>
                  <BadgeIndianRupee className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  {/* Showing total visitors for the last 6 months */}
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="basis-1/3">
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle> Top 5 best Services in this Month</CardTitle>
                <CardDescription>
                  {startOfMonth.toLocaleDateString()} -
                  {now.toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData.topService}
                      dataKey="count"
                      nameKey="item"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalVisitors.topService.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Services
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                Top Services <b>{chartData?.topService[0]?.item}</b>
                  <Scissors className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  {/* Showing total visitors for the last 6 months */}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
