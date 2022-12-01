const svg = d3.select("#mapsvg").attr("viewBox", `0 0 600 600`);
const mapsvg = svg.append("g");
const summary = [];

const BAR_WIDTH = 25;
const BAR_HEIGHT_MARGIN = 60;
const CHART_WIDTH = 500
const DEFAULT_BAR_COLOR = "#69b3a2"
const MAP_COLOR_PALETTE = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"]

const legendsvg = d3
	.select("#legendsvg")
	.attr("viewBox", `0 0 220 30`)
	.append("g");

const tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.style("background", "#fff")


const mapTitle = document.getElementById("maptitle")
const barTitle = document.getElementById("bartitle")

const cleanUpAndSetData = (unemploymentData, populationData) => {
	populationData.forEach(popData => {
		const { STATE, COUNTY, STNAME, CTYNAME, BIRTHS2015, DEATHS2015 } = popData;
		const indexIfExists = summary.findIndex(state => state.STATE === STATE)

		if (COUNTY === "000") {
			if (indexIfExists !== -1) {
				summary[indexIfExists] = { STNAME, STATE, COUNTIES: [], BIRTHS2015: +BIRTHS2015, DEATHS2015: +DEATHS2015, ...summary[indexIfExists] }
			} else {
				summary.push({ STNAME, STATE, COUNTIES: [], BIRTHS2015: +BIRTHS2015, DEATHS2015: +DEATHS2015 })
			}
		} else {
			if (indexIfExists !== -1) {
				summary[indexIfExists]['COUNTIES'].push({ COUNTY, CTYNAME, BIRTHS2015: +BIRTHS2015, DEATHS2015: +DEATHS2015 })
			} else {
				summary.push({ STNAME, STATE, COUNTIES: [{ COUNTY, CTYNAME, BIRTHS2015: +BIRTHS2015, DEATHS2015: +DEATHS2015 }] })
			}
		}
	})
	unemploymentData.forEach(unempData => {
		const { State, County, Rate } = unempData;
		const stateIndex = summary.findIndex(stData => stData.STNAME === State)
		const cleanedCountyToken = correctedCountyName(County, State)
		const countyIndex = summary[stateIndex]['COUNTIES'].findIndex(popCounties => popCounties.CTYNAME.toLowerCase() === cleanedCountyToken)
		summary[stateIndex]['COUNTIES'][countyIndex] = { ...summary[stateIndex]['COUNTIES'][countyIndex], Rate: +Rate }
	})
	summary.forEach((state, index) => {
		summary[index]['Rate'] = d3.mean(summary[index]['COUNTIES'].map(county => county.Rate))
	})
}

const drawBarChart = (data, prefix, property) => {
	const nData = Object.values(data).length
	const height = nData * BAR_WIDTH + BAR_HEIGHT_MARGIN
	const bar = d3.select("#barsvg")

	bar.select("*").remove()


	const barsvg = bar.attr("height", height)
		.append("g")
		.attr('transform', 'translate(100, 0)')

	// Add X axis
	const xScale = d3.scaleLinear().domain([0, d3.max(data.map(stateOrCounty => stateOrCounty[property]))]).range([0, CHART_WIDTH]);
	barsvg
		.append("g")
		.attr("transform", `translate(0, ${height - BAR_HEIGHT_MARGIN})`)
		.call(d3.axisBottom(xScale))
		.selectAll("text")
		.attr("transform", "translate(-10,0)rotate(-45)")
		.style("text-anchor", "end");

	// Y axis
	const yScale = d3
		.scaleBand()
		.range([0, height - BAR_HEIGHT_MARGIN])
		.domain(data.map(stateOrCounty => stateOrCounty.STNAME || stateOrCounty.CTYNAME))
		.padding(0.1);
	barsvg.append("g")
		.call(d3.axisLeft(yScale));

	//Bars
	barsvg
		.selectAll("myRect")
		.data(data.map(stateOrCounty => ([stateOrCounty.STNAME ? stateOrCounty.STNAME : stateOrCounty.CTYNAME, stateOrCounty[property], stateOrCounty.STATE ? stateOrCounty.STATE : stateOrCounty.COUNTY])))
		.join("rect")
		.attr("x", xScale(0))
		.attr("y", (d) => yScale(d[0]))
		.attr("width", (d) => xScale(d[1]))
		.attr("height", 20)
		.attr("fill", DEFAULT_BAR_COLOR)
		.attr("id", (d) => `bar-${d[2]}`)
		.on("mouseenter", function () {
			const node = d3.select(this)
			const d = node.data()[0]
			node.attr("fill", 'red')
			d3.select(`#map-${d[2]}`).style("fill", 'red');
		})
		.on("mouseleave", function () {
			const node = d3.select(this)
			const d = node.data()[0]
			node.attr("fill", DEFAULT_BAR_COLOR)
			const prevColor = d3.select(`#map-${d[2]}`).attr("color")
			d3.select(`#map-${d[2]}`).style("fill", prevColor)
		})

};
const initBarChart = (data, prefix) => {
	const radios = document.querySelectorAll('input[type=radio][name="field"]');
	const selected = [...radios].find(radio => radio.checked).value
	radios.forEach(radio => radio.addEventListener('change', () => {
		drawBarChart(data, prefix.replace(" ", "_"), radio.value);
		barTitle.innerText = `Number of ${radio.value == "BIRTHS2015" ? "Birth" : "Death"} by  ${prefix === 'us' ? 'State' : `Counties of ${prefix}`} in 2015`
	}));
	drawBarChart(data, prefix.replace(" ", "_"), selected)
	barTitle.innerText = `Number of ${selected == "BIRTHS2015" ? "Birth" : "Death"} by  ${prefix === 'us' ? 'State' : `Counties of ${prefix}`} in 2015`
}

const drawState = (id, name) => {
	const stateMapUrl = getStateUrl(id);
	if (!stateMapUrl) return;
	d3.json(stateMapUrl).then((data) => {
		const stateData = topojson.feature(
			data,
			data.objects[
			`cb_2015_${name.toLowerCase().replace(" ", "_")}_county_20m`
			]
		);
		const stateSummary = summary.find(state => state.STATE === id)
		const projection = d3.geoMercator().fitSize([600, 600], stateData);
		const path = d3.geoPath().projection(projection);
		mapTitle.innerText = `${name} Unemployment Rates Per County in 2015`

		//clear the svg
		mapsvg.selectAll("*").remove();
		legendsvg.selectAll("*").remove();
		initBarChart(stateSummary['COUNTIES'], name)

		const color = d3
			.scaleQuantize()
			.domain(
				[0, d3.max(stateSummary['COUNTIES'].map(countyData => countyData.Rate))]
			)
			.range(MAP_COLOR_PALETTE);

		const xScake = d3.scaleLinear().domain([0, d3.max(stateSummary['COUNTIES'].map(countyData => countyData.Rate))]).rangeRound([10, 190]);

		legendsvg
			.selectAll("rect")
			.data(
				color.range().map(data => {
					data = color.invertExtent(data);
					if (data[0] == null) data[0] = yLegend.domain()[0];
					if (data[1] == null) data[1] = yLegend.domain()[1];
					return data;
				})
			)
			.enter()
			.append("rect")
			.attr("height", 20)
			.attr("x", function (d, i) {
				return i * 20 + 10;
			})
			.attr("y", 0)
			.attr("width", 20)
			.attr("fill", function (d) {
				return color(d[0]);
			});

		legendsvg.call(
			d3
				.axisBottom(xScake)
				.tickSize(20)
				.tickFormat(function (x) {
					return x.toFixed(2);
				})
				.tickValues(color.domain())
		)
			.select('.domain')
			.remove();
		mapsvg
			.append("g")
			.selectAll("path")
			.data(stateData.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("stroke", "#eeeeee")
			.attr("id", (d) => `map-${d.properties.COUNTYFP}`)
			.attr("fill", d => {
				const fips_code = d.properties.COUNTYFP
				const countyData = stateSummary['COUNTIES'].find(county => county.COUNTY == fips_code)
				return color(countyData.Rate)
			})
			.attr("color", d => {
				const fips_code = d.properties.COUNTYFP
				const countyData = stateSummary['COUNTIES'].find(county => county.COUNTY == fips_code)
				return color(countyData.Rate)
			})
			.on("mouseenter", function (event) {
				const node = d3.select(this)
				const countyMetaData = node.data()[0]
				d3.select(this).style("fill", "red");
				d3.select(`#bar-${countyMetaData.properties.COUNTYFP}`).style("fill", "red");
				tooltip.text(countyMetaData.properties.NAME)
				tooltip.style("visibility", "visible")
				// tooltip.innerText = countyMetaData.properties.NAME
			}).on("mousemove", function (event) {
				tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
			})
			.on("mouseleave", function (event) {
				const node = d3.select(this)
				const d = node.data()[0]
				const fips_code = d.properties.COUNTYFP
				const countyData = stateSummary['COUNTIES'].find(county => county.COUNTY == fips_code)
				d3.select(this).style("fill", color(countyData.Rate) || 'black');
				d3.select(`#bar-${fips_code}`).style("fill", DEFAULT_BAR_COLOR);
				tooltip.style("visibility", "hidden")

			})
	});
};
const drawUsMap = () => {
	d3.json(
		"https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json"
	).then(data => {
		const stateData = topojson.feature(data, data.objects.us);
		let timer = 0;
		let delay = 250;
		let prevent = false;
		initBarChart(summary, "us")
		mapTitle.innerText = "US Unemployment Rates Per State in 2015"
		// console.log(stateData);
		const projection = d3.geoMercator().fitSize([600, 600], stateData);
		const path = d3.geoPath().projection(projection);
		// Draw the map

		mapsvg.selectAll("*").remove();
		legendsvg.selectAll("*").remove();

		const color = d3
			.scaleQuantize()
			// domain lies between min and max values of countyDataMap
			.domain(
				[0, d3.max(summary.map(state => state.Rate))]
			)
			.range(MAP_COLOR_PALETTE);


		const xScale = d3.scaleLinear().domain([0, d3.max(summary.map(stateData => stateData.Rate))]).rangeRound([10, 190]);

		legendsvg
			.selectAll("rect")
			.data(
				color.range().map(data => {
					data = color.invertExtent(data);
					if (data[0] == null) data[0] = yLegend.domain()[0];
					if (data[1] == null) data[1] = yLegend.domain()[1];
					return data;
				})
			)
			.enter()
			.append("rect")
			.attr("height", 20)
			.attr("x", function (d, i) {
				return i * 20 + 10;
			})
			.attr("y", 0)
			.attr("width", 20)
			.attr("fill", function (d) {
				return color(d[0]);
			});



		legendsvg.call(
			d3
				.axisBottom(xScale)
				.tickSize(20)
				.tickFormat(function (x) {
					return x.toFixed(2);
				})
				.tickValues(color.domain())
		)
			.select('.domain')
			.remove();

		// draw tooltip

		mapsvg
			.append("g")
			.selectAll("path")
			.data(stateData.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("stroke", "#eeeeee")
			.attr("id", (d) => {
				const stateData = summary.find(state => state.STATE === d.properties.fips_state)
				return `map-${stateData.STATE}`
			})
			.style("fill", (d, i) => {
				const stateData = summary.find(state => state.STATE === d.properties.fips_state)
				return color(stateData.Rate)
			})
			.attr("color", (d, i) => {
				const stateData = summary.find(state => state.STATE === d.properties.fips_state)
				return color(stateData.Rate)
			})
			.on("click", function (d, i) {
				timer = setTimeout(() => {
					if (!prevent) {
						drawState(
							d3.select(this).data()[0].properties.fips_state,
							d3.select(this).data()[0].properties.name
						);
					}
					prevent = false;
				}, delay);

			})
			.on("mouseenter", function (event) {
				const stateMetaData = d3.select(this).data()[0];
				d3.select(this).style("fill", "red");
				d3.select(`#bar-${stateMetaData.properties.fips_state}`).attr("fill", "red");
				tooltip.text(stateMetaData.properties.name)
				tooltip.style("visibility", "visible")
			})
			.on("mousemove", function (event) {
				tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px")
			})
			.on("mouseleave", function () {
				const stateMetaData = d3.select(this).data()[0];
				const stateData = summary.find(state => state.STATE === stateMetaData.properties.fips_state)
				d3.select(this).style("fill", color(stateData.Rate));
				d3.select(`#bar-${stateMetaData.properties.fips_state}`).attr("fill", DEFAULT_BAR_COLOR);
				tooltip.style("visibility", "hidden")
			}).on("dblclick", function () {
				clearTimeout(timer);
				prevent = true;
				const stateMetaData = d3.select(this).data()[0];
				openStateSite(stateMetaData.properties.iso_3166_2)
			})
	});
};

const initialize = () => {
	Promise.allSettled([
		d3.csv(`/data.csv`),
		d3.csv(`/co-est2016-alldata.csv`)
	]).then(([unemploymentResponse, populationResponse]) => {
		if (unemploymentResponse.status == 'rejected') {
			alert("Problem Loading unemployment data");
		} else if (populationResponse.status == 'rejected') {
			alert("Problem loading population data")
		}
		cleanUpAndSetData(unemploymentResponse.value, populationResponse.value)
		drawUsMap()
	})
}
initialize()


const resetButton = document.getElementById("resetbtn");
resetButton.addEventListener("click", drawUsMap);