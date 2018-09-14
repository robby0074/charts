import { Component,OnInit, Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
    chart = [];
    ctx:any ;
    data:any;
    labels = [];
    volume = [];
    information = [];
    logo:any;
    error:boolean;
    stockCode:String;
    time = ['1m','3m','6m','ytd','1y','2y','5y'];
    constructor(private dashboardData:DashboardService) {}
    ngOnInit() {
    this.fetchData('','aapl');
    this.dashboardData.getLogo(this.stockCode)
    .subscribe(res => this.logo = res.url)
    
}
draw () {
    this.ctx = document.getElementById("myChart");
this.chart = new Chart(this.ctx, {
type: 'line',
data: {
    labels:this.labels,
    datasets:[{
        label:'Apple Stocks',
        data:this.volume ,
        info: this.information,
    }],
},
options: {
  scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  },
  tooltips: {
    enabled: true,
    mode: 'single',
    callbacks: {
        label: function(tooltipItems, data) { 
            console.log(tooltipItems)
            console.log(data)
           var multistringText = [tooltipItems.yLabel];
               multistringText.push('Change' + ' ' +data.datasets[0].info[tooltipItems.index].change);
               multistringText.push('changeOverTime' + ' ' +data.datasets[0].info[tooltipItems.index].changeOverTime);
               multistringText.push('ChangePercentage' + ' ' +data.datasets[0].info[tooltipItems.index].changePercent);
               multistringText.push('Close' + ' ' +data.datasets[0].info[tooltipItems.index].close);
               multistringText.push('High' + ' ' +data.datasets[0].info[tooltipItems.index].high);
               multistringText.push('Low' + ' ' +data.datasets[0].info[tooltipItems.index].low);
               multistringText.push('Open' + ' ' +data.datasets[0].info[tooltipItems.index].open);
            return multistringText;
        }
    }
}
}
})
}
fetchData(time, code) {
    this.labels = [];
    this.volume = [];
    this.stockCode = code;
    let info = {};
    this.dashboardData.getData(time, code).
    subscribe(
        (res) => {
        console.log(res)
        this.data = res;
        for(let i = 0; i < this.data.length; i++) {
            this.labels.push(this.data[i].label);
            this.volume.push(this.data[i].volume);
            info['change'] = this.data[i].change;
            info['changeOverTime'] = this.data[i].changeOverTime;
            info['changePercent'] = this.data[i].changePercent;
            info['close'] = this.data[i].close;
            info['high'] = this.data[i].high;
            info['low'] = this.data[i].low;
            info['open'] =this.data[i].open;
            this.information.push(info);
            info = {};
        }
        console.log(this.information)
        this.draw(); 
    },
    error => {
        if(error.status == 404) {
            this.error = true;
       }
       setTimeout(function(){
           this.error = false;
           console.log(this.error)
       }.bind(this),3000)
    } ) 
}
// close() {
//     this.error = false;
// }
}
