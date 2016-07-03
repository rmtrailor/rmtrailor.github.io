/* =======================================================================================
 * File:    scatterplot.js
 * Author:  Rubin Trailor
 *
 * Purpose:
 *     To create a scatterplot matrix that visualizes the Zillow Market Health Index
 *     dataset.
 *
 * Resources: 
 *     - Mike Bostock's Scatterplot Matrix
 *       Link: https://bl.ocks.org/mbostock/3213173
 *     - regions.csv from Piazza post
 *       Thanks to the anonymous poster (Helen)
 * =====================================================================================*/

/*================================== Global Variables ==================================*/
var config = {};
var data = [];
var domains = {};
var region_data = {};
var components;
var x, y, xAxis, yAxis;
var color;

/* *
 *  Function:   processData
 *  -----------------------
 *  Reads in the data from the csv and generates the necessary arrays and svg
 *  components.
 *
 *  Return:     Nothing
 */
var processData = function() {

    // Setup configuration sizes
    config.width   = 960; 
    config.size    = 150;
    config.padding = 30;

    // Setup x and y axis information
    x = d3.scale.linear()
        .range([config.padding / 2, config.size - config.padding / 2])
        .nice();

    y = d3.scale.linear()
        .range([config.size - config.padding / 2, config.padding / 2])
        .nice();

    xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .ticks(5);

    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    color = d3.scale.ordinal()
        .range(["#e41a1c","#377eb8","#ff7f00","#4daf4a"]);

    // Load and configure region data
    d3.csv("data/regions.csv", function(error, csv_file) {
        if (error) throw error;

        region_data = d3.nest()
            .key(function(d) { return d.State; })
            .map(csv_file, d3.map);

        var regions = ["Midwest", "Northeast", "South", "West"];
        color.domain(regions);
    });

    // Load and configure data
    d3.csv("data/MarketHealthIndex_City_Filtered.csv", 
        function(d) {
            var row = {};

            row.City              = d["City"];
            row.State             = d["State"];
            row.DaysOnMarket      = +d["DaysOnMarket"];
            row.Delinquency       = +d["Delinquency"];
            row.ForeclosureRatio  = +d["ForeclosureRatio"];
            row.MarketHealthIndex = +d["MarketHealthIndex"];
            row.NegativeEquity    = +d["NegativeEquity"];
            row.SellForGain       = +d["SellForGain"];

            return row;
        },
        function(error,rows) {
            if (error) throw error;

            data = rows;

            // Set up our domains for our axis using the min and maxes of each component
            components = ["DaysOnMarket", "Delinquency", "ForeclosureRatio", 
                          "MarketHealthIndex", "NegativeEquity", "SellForGain"];

            components.forEach(function(component) {
                domains[component] = [0, d3.max(rows, function(d) { return d[component]; })];
            });

            // Setup the tick sizes and draw the scatterplot matrix
            xAxis.tickSize(5);

            drawScatterplotMatrix();
        } // end of function(error, rows)
    ); // end of d3.csv

} // end of processData

/* *
 *  Function:   drawScatterplotMatrix
 *  ---------------------------------
 *  Draws a scatterplot matrix based on the data processed, and attaches all the necessary 
 *  svg components.
 *
 *  Return:     Nothing
 */
var drawScatterplotMatrix = function() {
    // select and add necessary components to the svg
    var svg = d3.select("body").select("svg")
        .attr("width", config.size * components.length + config.padding)
        .attr("height", config.size * components.length + config.padding)
        .append("g")
            .attr("transform", translate(config.padding, config.padding / 2));

    svg.selectAll(".x.axis")
        .data(components)
        .enter()
            .append("g")
                .attr("class", "x axis")
                .attr("transform", function(d, i) {
                    return translate((components.length - i - 1) * config.size, 10);
                })
                .each(function(d) {
                    x.domain(domains[d]);
                    d3.select(this).call(xAxis);
                });

    svg.selectAll(".y.axis")
        .data(components)
        .enter()
            .append("g")
                .attr("class", "y axis")
                .attr("transform", function(d, i) {
                    return translate(5, i * config.size);
                })
                .each(function(d) {
                    y.domain(domains[d]);
                    d3.select(this).call(yAxis);
                });

    var cell = svg.selectAll(".cell")
        .data(cross(components, components))
        .enter()
            .append("g")
                .attr("class", "cell")
                .attr("transform", function(d) {
                    return translate((components.length - d.i - 1) * config.size, d.j 
                                     * config.size);
                });

    cell.filter(function(d) { return (d.i > d.j) || (d.i === d.j); })
        .each(plot);

    cell.filter(function(d) { return d.i === d.j; })
        .append("text")
            .attr("x", config.padding - 10)
            .attr("y", config.padding - 10)
            .attr("dy", "0.71em")
            .style("font-size", "11px")
            .style("fill", "#FF0000")
            .text(function(d) { return d.x; });

    var legend = svg.selectAll("legend")
            .data(color.domain())
            .enter()
                .append("g")
                    .attr("id", "legend")
                    .attr("transform", function (d, i) { return translate(0, i * 40 ); })

        legend.append("circle")
            .attr("cx", config.width - 360)
            .attr("cy", config.width - 425)
            .attr("r", 16)
            .style("fill", color);

        legend.append("text")
            .attr("x", config.width - 330)
            .attr("y", config.width - 420)
            .style("text-anchor", "start")
            .text(function(d) { return d; });

    svg.append("text")
        .attr("x", 600)
        .attr("y", 500)
        .style("font-size", 22)
        .style("text-decoration", "underline")
        .text("Regions");

    d3.select(self.frameElement).style("height", config.size * components.length 
              + config.padding + 20 + "px");

} // end of drawScatterplotMatrix

/* *
 *  Function:   cross
 *  -----------------
 *  Gets a pairing for each cell.
 *
 *  a           color domain
 *  b           color domain
 *
 *  Return:     Cell pair
 */
var cross = function(a, b) {
    var c = [], n = a.length, m = b.length, i , j;

    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            c.push( {
                x: a[i],
                i: i,
                y: b[j],
                j: j
            });
        }
    }

    return c;
} // end of cross

/* *
 *  Function:   plot
 *  ----------------
 *  Plots each point in the current cell.
 *
 *  p           Current cell pair
 *
 *  Return:     Nothing
 */
var plot = function(p) {
    var cell = d3.select(this);

    x.domain(domains[p.x]);
    y.domain(domains[p.y]);

    cell.append("rect")
        .attr("class", "frame")
        .attr("x", config.padding / 2)
        .attr("y", config.padding / 2)
        .attr("width", config.size - config.padding)
        .attr("height", config.size - config.padding)
        .style("fill", "None");
    
    cell.selectAll("circle")
        .data(data)
        .enter()
            .append("circle")
                .attr("cx", function(d) { return x(d[p.x]); })
                .attr("cy", function(d) { return y(d[p.y]); })
                .attr("r", 1.5)
                .style("fill", function(d) {  
                    return color(region_data.get(d.State)[0].Region); 
                });

} // end of plot

/* *
 *  Function:   translate
 *  ---------------------
 *  Creates string object for the translate function.
 *
 *  x           The x location
 *  y           The y location
 *
 *  Return:     The string object containing the function with the
 *              correct arguments.
 */
var translate = function(x, y) {
    return "translate(" + String(x) + ", " + String(y) + ")";
};