export const stockData = () => {
  const x = Math.floor( Math.random() * 4000 );
  return [ 3000, x, 3900, 5500, 6300, 4300, 5000, 4500, 5700 ];
};


export const chartData = ( data, labels ) => {
  return {
    data: {
      labels: labels,
      datasets: [ {
        label: "Orders",
        fillColor: "#EDF5FF",
        borderColor: "#1875F0",
        strokeColor: "#1875F0",
        pointColor: "#fff",
        pointStrokeColor: "#1875F0",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#ff6c23",
        lineTension: 0,
        data: data,
      } ]
    },

    options: {
      responsive: true,
      datasetStrokeWidth: 3,
      pointDotStrokeWidth: 4,
      tooltipFillColor: "rgba(0,0,0,0.8)",
      tooltipFontStyle: "bold",
      tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value %>",
      scales: {
        xAxes: [ {
          ticks: {
            fontColor: "#B3B3B3"
          }
        } ],
        yAxes: [ {
          ticks: {
            beginAtZero: true,
            callback: function ( value ) {
              return value / 1000 + "K";
            },
            fontColor: "#B3B3B3"
          }
        } ]
      },
      bezierCurve: false,
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#333",
          fontSize: 16
        }
      }
    }

  };
};


export const indicatorsData = [ {
  label: "Revenue",
  total: "$ 8749",
  net: 0.54,
  data: stockData(),
  labels: [
    "1 Jan",
    "1 Feb",
    "1 Mar",
    "1 Apr",
    "1 May",
    "1 Jun",
    "1 Jul",
    "1 Aug",
    "1 Sep"
  ]
},
{
  label: "Registrations",
  total: 65,
  net: 0.21,
  data: stockData(),
  labels: [
    "1 Jan",
    "1 Feb",
    "1 Mar",
    "1 Apr",
    "1 May",
    "1 Jun",
    "1 Jul",
    "1 Aug",
    "1 Sep"
  ]
},
{
  label: "Profit",
  total: "$ 177.62",
  net: -0.11,
  data: stockData(),
  labels: [
    "1 Jan",
    "1 Feb",
    "1 Mar",
    "1 Apr",
    "1 May",
    "1 Jun",
    "1 Jul",
    "1 Aug",
    "1 Sep"
  ]
},
{
  label: "Average Cost",
  total: "$ 33.11",
  net: -0.11,
  data: stockData(),
  labels: [
    "1 Jan",
    "1 Feb",
    "1 Mar",
    "1 Apr",
    "1 May",
    "1 Jun",
    "1 Jul",
    "1 Aug",
    "1 Sep"
  ]
},
{
  label: "Refunded",
  total: "25%",
  net: -0.11,
  data: stockData(),
  labels: [
    "1 Jan",
    "1 Feb",
    "1 Mar",
    "1 Apr",
    "1 May",
    "1 Jun",
    "1 Jul",
    "1 Aug",
    "1 Sep"
  ]
},
{
  label: "Growth",
  total: 25,
  net: -0.11,
  data: stockData(),
  labels: [
    "1 Jan",
    "1 Feb",
    "1 Mar",
    "1 Apr",
    "1 May",
    "1 Jun",
    "1 Jul",
    "1 Aug",
    "1 Sep"
  ]
}
];