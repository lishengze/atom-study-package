function chartDataStruct(){
  this.rtnDataName = "";
  this.dataNumb = 0;
  this.chartDataAll = [];
  this.nonRealTimeChartData = [];
  this.RealTimeChartData = [];
  this.testData = [];
  this.testChartDataNumb = 0;

  this.timeLimit = 10;
  this.realTimeLine = 2;

  this.isRealTime = false;
  this.isFirstTime = true;

  this.firstTime;
  this.lastTime;
  this.curTime;

  this.lastActive = false;
  this.curActive = false;
  this.isItemTurnToActive = false;

  this.isNewDataCome = false;

  this.curRtnData;
}

window.GlobalChart = []; // 每次建立图表时，便可记录

function RefreshChart (updateFrequency) 
{
  setInterval(function() {
		for (pageID in GlobalChart) 
		{
			if (true === GlobalChart[pageID].curActive) 
			{
				for (charID in GlobalChart[pageID] ) 
				{
						var curChart = GlobalChart[pageID][charID];
						if (true === curChart.isNewDataCome) 
						{
							curChart.isNewDataCome = false;

							if ( true === curChart.isItemTurnToActive || false === curChart.isRealTime) {

								// console.log ('*** setInterval ***');

								var curChartData = [];
								for (var i = 0; i < curChart.chartDataAll.length; ++i) {
									curChartData.push(curChart.chartDataAll[i]);
								}
								curChart.chart.series[0].setData(curChartData);

							} else {
								for (var i = 0; i < curChart.RealTimeChartData.length; ++i) {
									// console.log ('----addPoint----');
									curChart.chart.series[0].addPoint(curChart.RealTimeChartData[i], true, false);
								}
								curChart.RealTimeChartData = [];
							}
						}
				}
			}
    }
  }, updateFrequency)	
}