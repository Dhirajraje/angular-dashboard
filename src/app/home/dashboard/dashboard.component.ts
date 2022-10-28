import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataset, ChartType } from 'chart.js';
import { SalesService } from 'src/app/apis/sales.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  datasetSchema: ChartDataset = {
    data: [],
    backgroundColor: 'rgba(47, 104, 196,0.2)',
    borderColor: 'rgba(47, 104, 196,1)',
    pointBackgroundColor: 'rgba(47, 104, 196,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(47, 104, 196,0.8)',
    fill: 'origin',
  };
  dailySales = {
    ...this.datasetSchema,
    data: [0, 0, 0, 0, 0, 0, 0],
    labels: ['Monday', 'February', 'March', 'April', 'May', 'June'],
  };
  dailySaleAmount = {
    ...this.datasetSchema,
    backgroundColor: 'rgba(196, 47, 117,0.2)',
    borderColor: 'rgba(196, 47, 117,1)',
    pointBackgroundColor: 'rgba(196, 47, 117,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(196, 47, 117,0.8)',
    data: [0, 0, 0, 0, 0, 0, 0],
    labels: ['Monday', 'February', 'March', 'April', 'May', 'June'],
  };
  lineChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0.2,
      },
    },
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  userDetails = {
    name: '',
    email: '',
  };
  constructor(private salesService: SalesService) {
    this.salesService.getUserDetails().then(console.log);
    this.getDailyData()
  }
  getDailyData(){
    this.salesService.getDailySalesDetails(1000).then(async(data:any)=>{
      data = await data.json()
      let sales: any[] = [];
      let labels: any[] = [];
      let saleAmounts: any[] = [];
      data.result.forEach((element:any) => {
        sales.push(element.total)
        saleAmounts.push(element.amount)
        labels.push(element.created_on__date)
      });
      this.dailySales = {
        ...this.dailySales,
        data: sales,
        labels: labels,
        label:"Daily sales"
      };
      this.dailySaleAmount = {
        ...this.dailySaleAmount,
        data: saleAmounts,
        labels: labels,
        label:"Daily sales(amount)"
      };
      
      
    })
  }
  ngOnInit(): void {
  }
}
