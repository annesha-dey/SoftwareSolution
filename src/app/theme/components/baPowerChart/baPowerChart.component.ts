import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output,
         ViewChild, OnChanges, OnDestroy } from '@angular/core';

import * as Chartist from 'chartist';

@Component({
  selector: 'ba-power-chart',
  templateUrl: './baPowerChart.html',
  providers: [],
})
export class BaPowerChart implements AfterViewInit, OnChanges, OnDestroy {

  @Input() baChartistChartType: string;
  @Input() baChartistChartData: Object;
  @Input() baChartistChartOptions: Object;
  @Input() baChartistChartResponsive: Object;
  @Input() baChartistChartClass: string;
  @Output() onChartReady = new EventEmitter<any>();

  @ViewChild('baPowerChart') _selector: ElementRef;

  private chart;

  ngAfterViewInit() {
    this.chart = new Chartist[this.baChartistChartType](this._selector.nativeElement,
    this.baChartistChartData, this.baChartistChartOptions, this.baChartistChartResponsive);
    this.onChartReady.emit(this.chart);
  }

  ngOnChanges(changes) {
    if (this.chart) {
      (<any>this.chart).update(this.baChartistChartData, this.baChartistChartOptions);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.detach();
    }
  }
}
