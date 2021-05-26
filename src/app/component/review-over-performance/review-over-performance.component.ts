import { Component, OnInit, Input, Injector, ViewChild } from "@angular/core";
import { Label, Color } from "chart.js";
import { CriteriaIndexEnum } from "src/app/shared/enum/criteria-index.enum";
import { ActivityReviewerModel } from "src/app/shared/model/activity-reviewer.model";
import { BaseViewComponent } from "../base/base-view.component";
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
@Component({
	selector: 'app-review-over-performance',
	templateUrl: './review-over-performance.component.html',
	styleUrls: ['./review-over-performance.component.scss'],
})
export class ReviewOverPerformanceComponent extends BaseViewComponent implements OnInit {

	/**
	 * Input  of performance over review component
	 */
	@Input() performances;

	/**
	 * Input  of performance over review component
	 */
	@Input() panelTitle;

	/**
	 * View child of performance over review component
	 */
	@ViewChild('chart') chart;

	/**
	 * Bar chart options of performance over review component
	 */
	 private _chartOptions: (ChartOptions & { annotation: any }) = {
		responsive: true,
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: this.stringKey.REVIEW_FEEDBACK_CLASSIFICATION
				},
				ticks: {
					min: 0,
					max: 5,
					stepSize: 1,
					suggestedMin: 0.5,
					suggestedMax: 5.5,
					callback: function (label, index, labels) {
						switch (label) {
							case 0:
								return '';
							case 1:
								return 'Poor';
							case 2:
								return 'Improvement';
							case 3:
								return 'Expectation';
							case 4:
								return 'Exceed';
							case 5:
								return 'Outstanding';
						}
					}
				},
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: this.stringKey.REVIEWS
				}
			}],
		},
		annotation: {
		}
	};

	/**
	 * Bar chart labels of performance over review component
	 */
	private _chartLabels: Label[] = [];

	/**
	 * Bar chart type of performance over review component
	 */
	private _chartType = 'line';

	/**
	 * Bar chart data of performance over review component
	 */
	private _chartData = [];

	/**
	 * Creates an instance of performance over review component.
	 * @param injector 
	 */
	constructor(
		injector: Injector,
	) {
		super(injector);
	}



	public lineChartData: ChartDataset[] = [];
	public lineChartLabels: Label[] = [];

	
	
	ngOnInit() {
		this.calculatePerformanceAgainstCriteria();
	}

	/**
	 * Calculates performance against criteria
	 */
	async calculatePerformanceAgainstCriteria() {

		var reviewsResultingPerformance = [];
		var reviews = [];

		let i = 1;
		for (let performance of this.performances) {
			reviews.push('R' + i);
			let performanceCriteria;
			if (performance.characteristicsHigherBetter) {

				performanceCriteria = this.higherBetterValueValidation(performance);
			}
			else {

				performanceCriteria = this.lowerBetterValueValidation(performance);
			}

			if (await performanceCriteria == CriteriaIndexEnum.Poor) {
				reviewsResultingPerformance.push(CriteriaIndexEnum.Poor);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Improvement) {
				reviewsResultingPerformance.push(CriteriaIndexEnum.Improvement);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Expectation) {
				reviewsResultingPerformance.push(CriteriaIndexEnum.Expectation);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Exceed) {
				reviewsResultingPerformance.push(CriteriaIndexEnum.Exceed);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Outstanding) {
				reviewsResultingPerformance.push(CriteriaIndexEnum.Outstanding);
			}

			i++;
		};

		//build data graph
		this._chartData = [
			{ data: reviewsResultingPerformance, label: this.panelTitle },
		];
		this._chartLabels = reviews;

		//_chartData
		this._chartData = [
			{
				data: reviewsResultingPerformance,
				backgroundColor: 'rgba(50,52,51,0.5)',
				borderColor: 'rgba(50,52,51,1)',
				pointBackgroundColor: 'rgba(148,159,177,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(148,159,177,0.8)',
				label: this.panelTitle
			},
		];

		//buildChart
		await this.buildChart();
	}

	/**
	 * Builds chart
	 */
	async buildChart() {
		new Chart(this.chart.nativeElement, {
			type: this._chartType,
			data: {
				labels: this._chartLabels,
				datasets: this._chartData
			},
			options: this._chartOptions
		});
	}

	/**
	 * Highers better value validation
	 */
	private async higherBetterValueValidation(performance: ActivityReviewerModel) {
		const form = performance;

		if (form.achievedResultValue < form.criteriaPoorValue) {
			return CriteriaIndexEnum.Poor;
		}
		else if (form.achievedResultValue >= form.criteriaPoorValue && form.achievedResultValue < form.criteriaImprovementValue) {
			return CriteriaIndexEnum.Improvement;
		}
		else if (form.achievedResultValue >= form.criteriaImprovementValue && form.achievedResultValue < form.criteriaExpectationValue) {
			return CriteriaIndexEnum.Expectation;
		}
		else if (form.achievedResultValue >= form.criteriaExpectationValue && form.achievedResultValue < form.criteriaExceedValue) {
			return CriteriaIndexEnum.Exceed;
		}
		else if (form.achievedResultValue >= form.criteriaExceedValue && form.achievedResultValue < form.criteriaOutstandingValue) {
			return CriteriaIndexEnum.Outstanding;
		}
		else if (form.achievedResultValue >= form.criteriaExceedValue) {
			return CriteriaIndexEnum.Outstanding;
		}
	}

	/**
	 * Lowers better value validation
	 */
	private async lowerBetterValueValidation(performance: ActivityReviewerModel) {

		const form = performance;

		if (form.achievedResultValue < form.criteriaPoorValue) {
			return CriteriaIndexEnum.Poor;
		}
		else if (form.achievedResultValue <= form.criteriaPoorValue && form.achievedResultValue > form.criteriaImprovementValue) {
			return CriteriaIndexEnum.Improvement;
		}
		else if (form.achievedResultValue <= form.criteriaImprovementValue && form.achievedResultValue > form.criteriaExpectationValue) {
			return CriteriaIndexEnum.Expectation;
		}
		else if (form.achievedResultValue <= form.criteriaExpectationValue && form.achievedResultValue > form.criteriaExceedValue) {
			return CriteriaIndexEnum.Exceed;
		}
		else if (form.achievedResultValue <= form.criteriaExceedValue && form.achievedResultValue > form.criteriaOutstandingValue) {
			return CriteriaIndexEnum.Outstanding;
		}
		else if (form.achievedResultValue <= form.criteriaExceedValue) {
			return CriteriaIndexEnum.Outstanding;
		}
	}



}
