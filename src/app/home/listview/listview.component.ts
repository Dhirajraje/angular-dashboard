import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/apis/sales.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css'],
})
export class ListviewComponent implements OnInit {
  sales:any[] = [];
  constructor(private salesService: SalesService) {
    salesService.getSales(0).then(async (data: any) => {
      data = await data.json();
      this.sales = data.data;
      console.log(this.sales);
    });
  }

  ngOnInit(): void {}
  onFileChange(e: any) {
    if (e.target.files.length < 1) return;
    let file = new FormData();
    file.append('file', e.target.files[0]);
    this.salesService.uploadExcel(file).then((_) => {
      alert('Yay!');
    });
  }
}
