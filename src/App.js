import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { totalVendasAnualPorCategoria } from "./DadosVendasGeral";
import { totalEcommerceAnualPorCategoria } from "./DadosEcommerce";
class App extends Component {
  getOption = () => {
    let categorias = [];
    let anos = [];
    Object.entries(totalVendasAnualPorCategoria).forEach(entry => {
      anos = [...anos, entry[0]];
      entry[1].forEach(e => {
        categorias = [...new Set([...categorias, e.name])];
      });
    });

    let options = anos.map(ano => {
      let obj = {};
      obj.title = {
        text: `Estimated Annual Sales for U.S. Electronic Shopping and Mail-Order Houses, ${ano}`
      };
      obj.series = [
        {           
           data: totalVendasAnualPorCategoria[ano]
        },
        {           
           data: totalEcommerceAnualPorCategoria[ano]
        }
      ];
      return obj;
    });
    
    return {
      baseOption: {
        timeline: {          
          axisType: "category",
          bottom: 20,
          data: anos,
          height: null,
          inverse: true,
          left: null,
          orient: "vertical",         
          right: 0,
          top: 20,
          width: 55, 
          label: {
            normal: {
              textStyle: {
                color: "#aaa"
              }
            },
            emphasis: {
              textStyle: {
                color: "#333"
              }
            }
          },
          symbol: "none",
          lineStyle: { 
            color: "#aaa"
          },
          checkpointStyle: {
            color: "#FC8A1A",
            borderColor: "transparent",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            normal: {
              color: "#FC8A1A",
              borderColor: "#FC8A1A"
            },
            emphasis: {
              color: "#5d71f7",
              borderColor: "#5d71f7"
            },
            showPlayBtn: false
          }
        },
        color: ["#0583C2 ", "#FC8A1A"],
        title: {
          subtext: "Total and E-commerce¹ Sales by Merchandise Line",
          textAlign: "left",
          left: "5%"
        },
        tooltip: { backgroundColor: "#555", borderWidth: 0, padding: 10},
        legend: {
          data: ["Total", "E-commerce"],
          itemGap: 35,
          itemHeight: 18,
          right: "11%",
          top: 35
        },        
        grid: {
          top: 100,
          bottom: 150,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                formatter: function(params) {
                  return params.value.replace("\n", "");
                }
              }
            }
          }
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: 55,
              textStyle: {
                baseline: "top",
                color: "#333",
                fontSize: 10,
                fontWeight: "bold"
              }
            },
            axisLine: { lineStyle: { color: "#aaa" }, show: true },
            axisTick: { show: false },
            data: categorias,
            splitLine: { show: false },
            type: "category"
          }
        ],
        yAxis: [
          {
            axisLabel: {
              textStyle: { fontSize: 10 }
            },
            axisLine: { show: false },
            axisTick: { show: false },
            name: "Products",
            splitLine: {
              lineStyle: {
                type: "dotted"
              }
            },
            type: "value"
          }
        ],
        series: [{ name: "Total", type: "bar" }, { name: "E-commerce", type: "bar" }]
      },
      options: options
    };
  };
  
  render() {
    return (      
      <ReactEcharts
        option={this.getOption()}
        style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
        opts={{ renderer: "svg" }}
      />
    );
  }
}
export default App;