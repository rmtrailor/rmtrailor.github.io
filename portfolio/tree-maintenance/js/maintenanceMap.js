/* =======================================================================================
 * File:    maintenanceMap.js
 * Author:  Rubin Trailor
 *
 *
 * Resources: 
 *     - Sophie's Example on SF Arrests April 2015
 *         Link: https://bl.ocks.org/sjengle/2f6d4832397e3cdd78d735774cb5a4f2
 *     - Mike Bostock's Map on Kentucky Population Density
 *         Link: http://bl.ocks.org/mbostock/5144735
 *     - Mike Bostock's Horizon Chart
 *         Link: http://bl.ocks.org/mbostock/1483226
 * =====================================================================================*/

var svg, g, map, symbols, tooltip, details, mapLegend, symbolLegend, projection, path, center, corner;
var x, xAxis;
var dateFormat = d3.time.format("%x %H:%M");

var init = function() {
    svg          = d3.select("body").select("svg");
    g            = svg.append("g").attr("id", "plot");
    map          = g.append("g").attr("id", "map");
    symbols      = g.append("g").attr("id", "symbols");
    tooltip      = g.append("text").attr("id", "tooltip");
    details      = g.append("foreignObject").attr("id", "details");
    mapLegend    = svg.append("g").attr("id", "mapLegend");
    
    projection = d3.geo.conicEqualArea();
    path       = d3.geo.path().projection(projection);

    projection.center([-122.419416, 37.774929]);
    projection.parallels([37.692514, 37.840699]);

    projection.rotate([122, 0]);
    projection.scale(335000);

    center = projection(projection.center());

    // Tooltip for the map sections
    tooltip.attr({
        "x": center[0],
        "y": center[1],
        "text-anchor": "end",
        "dx": -5,
        "dy": -5
    }).style({
        "visibility": "hidden"
    })
    .text("N/A");

    corner = projection([-122.511120, 37.824430]);

    // Detail toolip for the circles
    details.attr({
        "x": corner[0] + 50,
        "y": corner[1] + 10,
        "width": 400
    }).style({
        "visibility": "hidden"
    })
    .append("xhtml:body")
    .html("<p>N/A</p>");

    processData();
}

var processData = function() {
    d3.json("data/SF-Neighborhoods.geojson", function(error, json) {
        if (error) throw error;

        map.selectAll("path")
            .data(json.features, function(d) {

                /* The following two are missing punctuation in the dataset
                 * so these two if-statements fix the names
                 */
                if (d.properties.name === "Fishermans Wharf") {
                    d.properties.name = "Fisherman's Wharf";
                }

                if (d.properties.name === "St. Marys Park") {
                    d.properties.name = "St. Mary's Park";
                }

                return d.properties.name;
            })
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "neighborhood")
            .on("mouseover", function(d) {
                var me = d3.select(this);
                me.classed({"active": true});

                tooltip.text(util.toTitleCase(d.properties.name));
                tooltip.style({"visibility": "visible"});

                this.parentNode.appendChild(this);
            })
            .on("mousemove", function(d) {
                var coords = d3.mouse(g.node());
                tooltip.attr({"x": coords[0], "y": coords[1]});
            })
            .on("mouseout", function(d) {
                var me = d3.select(this);
                me.classed({"active": false});
                tooltip.style({"visibility": "hidden"});
            });

        util.resize(svg, g, 0);

        d3.csv("data/Tree_Maintenance_2015.csv", accessor, callback);
    });
}

var accessor = function(row) {
    var out          = {};
    out.id           = String(row["CaseID"]);
    out.opened       = dateFormat.parse(row["Opened"]);
    out.closed       = dateFormat.parse(row["Closed"]);
    out.status       = row["Status"];
    out.type         = row["Request Type"];
    out.details      = row["Request Details"];
    out.address      = row["Address"];
    out.district     = row["Supervisor District"];
    out.neighborhood = row["Neighborhood"];
    out.point        = row["Point"].trim().replace("(", "").replace(")", "").split(",");
    out.source       = row["Source"];

    // swap values here for correct ordering of longitude and latitude
    var temp = parseFloat(out.point[0]);
    out.point[0] = parseFloat(out.point[1]);
    out.point[1] = temp;

    return out;
}

var callback = function(error, rows) {
    if (error) throw error;

    var data = d3.nest()
        .key(function(d) { return d.neighborhood; })
        .rollup(function(leaves) { return leaves.length; })
        .map(rows, d3.map);

    // split up the sections of the legend
    var max      = d3.max(data.values()) + 20;
    var upperMid = max / 2;
    var mid      = max / 4;
    var lowerMid = max / 10;
    var lower    = max / 20;
    var min      = d3.min(data.values());

    var choropleth = d3.scale.threshold()
        .domain([min, lower, lowerMid, mid, upperMid, max])
        .range(["#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#005a32"]);

     x = d3.scale.linear()
        .domain([0, 390])
        .range([50, 240]);

    xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(13)
        .tickValues(choropleth.domain());

    var status = d3.scale.ordinal()
        .domain(["Open", "Closed"])
        .range(["E03C31", "#4682B4"]);

    map.selectAll("path")
        .style("fill", function(d) {

            // Color the undefined neighborhoods grey so that they don't affect interpretation of the map
            if (typeof data.get(d.properties.name) === "undefined") {
                return "#D3D3D3";
            }

            return choropleth(data.get(d.properties.name));
        });

    mapLegend.attr("transform", "translate(20, 20)");

    mapLegend.selectAll("rect")
        .data(choropleth.range().map(function(d, i) {
            return {
                x0: i ? x(choropleth.domain()[i - 1]) : x.range()[0],
                x1: i < choropleth.domain().length ? x(choropleth.domain()[i]) : x.range()[1],
                z: d
            };
        }))
        .enter().append("rect")
            .attr("height", 8)
            .attr("x", function(d) { return d.x0; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .style("fill", function(d) { return d.z; });

    // text for map legend
    mapLegend.call(xAxis).append("text")
        .attr("class", "caption")
        .attr("x", 105)
        .attr("y", -6)
        .text("Total Number of Tree Maintenance Calls")

    symbolLegend = svg.selectAll("symbolLegend")
        .data(status.domain())
        .enter()
        .append("g")
        .attr("id", "symbolLegend")
        .attr("transform", function (d, i) { return util.translate(0, i * 25 ); });

    var slX = 520;
    var slY = 35;

    symbolLegend.append("rect")
        .attr("id", function(d) { return d; })
        .attr("x", slX)
        .attr("y", slY)
        .attr("width", 6)
        .attr("height", 6)
        .style("fill", function(d) { return status(d); });
        
    symbolLegend.append("text")
        .attr("x", slX + 10)
        .attr("y", slY + 7.5)
        .style("text-anchor", "start")
        .text(function(d) {  return d; });

    symbols.selectAll("circle")
        .data(rows)
        .enter()
        .append("circle")
        .attr("id", function(d) { return d.status })
        .attr("class", "symbol")
        .attr("cx", function(d) { return projection(d.point)[0]; })
        .attr("cy", function(d) { return projection(d.point)[1]; })
        .attr("r", 3)
        .style("fill", function(d) { return status(d.status); })
        .on("mouseover", function(d) {
            var me = d3.select(this);
            me.classed({"active": true});

            // Format the text for the detail tooltip
            var detailText = "<p>";  // beginning
            detailText += "Neighborhood: " + d.neighborhood + "<br/>";
            detailText += "Opened: " + d.opened + "<br/>";

            // Some 311 calls weren't resolved so this displays Closed info accordingly
            if (d.status === "Open") {
                detailText += "Closed: Never <br/>"; 
            } else {
                detailText += "Closed: " + d.closed + "<br/>";
            }
            detailText += "Details: " + d.details;
            detailText += "</p>";   // end

            details.html(detailText);

            tooltip.text(util.toTitleCase(d.neighborhood));
            tooltip.style({"visibility": "visible"});
            details.style({"visibility": "visible"});
            this.parentNode.appendChild(this);
        })
        .on("mousemove", function(d) {
            var coords = d3.mouse(g.node());
            tooltip.attr({"x": coords[0], "y": coords[1]});
        })
        .on("mouseout", function(d) {
            var me = d3.select(this);
            me.classed({"active": false});
            tooltip.style({"visibility": "hidden"});
            details.style({"visibility": "hidden"});
        });

    d3.selectAll("#buttons input[name=mode]").on("change", change);
}

var change = function() {
    var value = this.value;
    var circles, otherCircles;

    if (value !== "All" && value !== "None") {
        if (value === "Open") {
            circles = d3.selectAll("circle").filter(function(d) {
                return d.status === "Open";
            })
            otherCircles = d3.selectAll("circle").filter(function(d) {
                return d.status !== "Open";
            })
        }
        else { // Closed
            circles = d3.selectAll("circle").filter(function(d) {
                return d.status === "Closed";
            })
            otherCircles = d3.selectAll("circle").filter(function(d) {
                return d.status !== "Closed";
            })
        }
        circles.style({visibility: "visible"});
        otherCircles.style({visibility: "hidden"});
    } else {
        if (value === "All") {
            circles = d3.selectAll("circle");
            circles.style({visibility: "visible"});
        } else { // None 
            circles = d3.selectAll("circle");
            circles.style({visibility: "hidden"});
        }
    }
}