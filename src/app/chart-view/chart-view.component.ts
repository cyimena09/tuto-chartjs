import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
  chart: Chart;

  @Input() chartId: string;

  /**
   * Labels for x axe
   */
  @Input() labels: string[];

  /**
   * Title of the chart
   */
  @Input() title: string;

  /**
   * Datas to display in the chart
   */
  @Input() datas: number[];

  constructor() {
  }

  ngOnInit(): void {
    if (!this.chartId) {
      throw new Error('Veuillez fournir un identifiant pour le graphique');
    }
    const nbLabels = this.labels.length;
    const nbDatas = this.datas.length;
    if (nbLabels != nbDatas) {
      throw new Error(`Le nombre de données ne correspond pas au nombre de labels. Labels : ${nbLabels}. Données : ${nbDatas}`);
    }

    this.loadChart();
  }

  loadChart(): void {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, this.getConfig(this.title, this.labels, this.datas));
  }

  getConfig(title: string, labels: string[], datas: number[]) {
    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: this.getDataSets(title, datas)
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'white',
            fontsize: '25px'
          }
        }
      }
    };
  }

  /**
   *
   * @param title title of the chart
   * @param datas datas to display in the chart
   */
  getDataSets(title: string, datas: number[]): any {
    const dataSets = [];
    const dataSet = {
      label: title,
      hidden: false,
      fill: true,
      borderColor: 'red',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      pointHoverBackgroundColor: 'white',
      pointBorderWidth: 4,
      pointHoverRadius: 6,
      data: datas
    };
    dataSets.push(dataSet);

    return dataSets;
  }

  /**
   * update all data in the first dataset
   * @param data
   */
  updateData(data: number[]) {
    this.chart.data.datasets[0].data = data;
    this.chart.update();
  }

  /**
   * Reset all data in the first dataset
   */
  resetData() {
    this.chart.data.datasets[0].data = [];
    this.chart.update();
  }

  addDataSet() {
    const dataSet = {
      label: 'Épargne',
      hidden: false,
      fill: true,
      borderColor: 'blue',
      borderWidth: 2,
      pointBackgroundColor: 'white',
      pointHoverBackgroundColor: 'white',
      pointBorderWidth: 4,
      pointHoverRadius: 6,
      data: [123, 87, 206, 210, 220, 230, 235, 301, 305, 351, 321, 366]
    };
    this.chart.data.datasets.push(dataSet);
    this.chart.update();
  }

}
