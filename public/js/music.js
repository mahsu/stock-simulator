var start_year = 1990;
var end_year = 2015;
var days = [231,253,254,253,252,252,254,253,252,252,252,248,252,252,252,252,251,251,253,252,252,252,250,252,252,42];

var margin = {top: 80, right: 80, bottom: 80, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parse = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse;

// Scales and axes. Note the inverted domain for the y-scale: bigger is up!
var x = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),
    yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

// An area generator, for the light fill.
var area = d3.svg.area()
    .interpolate("monotone")
    .x(function(d) { return x(d.date_ex); })
    .y0(height)
    .y1(function(d) { return y(d.close_p); });

// A line generator, for the dark stroke.
var line = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x(d.date_ex); })
    .y(function(d) { return y(d.close_p); });

d3.json("/api/stocks/symbol/aapl", function(error, data) {

  // Filter to one symbol; the S&P 500.
  var values = data.filter(function(d) {
    return d.symbol == "AAPL";
  }).map(function(d) {
    d.date_ex = parse(d.date_ex);
    d.close_p = +d.close_p;
    return d;
  });

  // Compute the minimum and maximum date, and the maximum price.
  x.domain([values[0].date_ex, values[values.length - 1].date_ex]);
  y.domain([0, d3.max(values, function(d) { return d.close_p; })]).nice();

  // Add an SVG element with the desired dimensions and margin.
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .on("click", click);

  // Add the clip path.
  svg.append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  // Add the area path.
  svg.append("path")
      .attr("class", "area")
      .attr("clip-path", "url(#clip)")
      .attr("d", area(values));

  // Add the x-axis.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // Add the y-axis.
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis);
  
  // Add the line path.
  svg.append("path")
      .attr("class", "line")
      .attr("clip-path", "url(#clip)")
      .attr("d", line(values));

  // Add a small label for the symbol name.
  svg.append("text")
      .attr("x", width - 6)
      .attr("y", height - 6)
      .style("text-anchor", "end")
      .text(values[0].symbol);

  // On click, update the x-axis.
  function click() {
    var n = values.length - 1,
        i = Math.floor(Math.random() * n / 2),
        j = i + Math.floor(Math.random() * n / 2) + 1;
    x.domain([values[i].date_ex, values[j].date_ex]);
    var t = svg.transition().duration(750);
    t.select(".x.axis").call(xAxis);
    t.select(".area").attr("d", area(values));
    t.select(".line").attr("d", line(values));
  }
});
