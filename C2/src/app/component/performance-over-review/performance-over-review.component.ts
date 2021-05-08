import { Component, OnInit, Input, Injector, ViewChild } from '@angular/core';
import { BaseViewComponent } from '../base/base-view.component';
import { CriteriaIndexEnum } from 'src/app/shared/enum/criteria-index.enum';
import { Chart, ChartOptions } from 'chart.js';
import { ActivityReviewerModel } from 'src/app/shared/model/activity-reviewer.model';

@Component({
	selector: 'app-performance-over-review',
	templateUrl: './performance-over-review.component.html',
	styleUrls: ['./performance-over-review.component.scss'],
})
export class PerformanceOverReviewComponent extends BaseViewComponent implements OnInit {

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
					labelString: this.stringKey.NUMBER_OF_REVIEWS
				},
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: this.stringKey.REVIEW_FEEDBACK_CLASSIFICATION
				}
			}],
		},
		annotation: {
		}
	};

	/**
	 * Bar chart labels of performance over review component
	 */
	private _chartLabels = ['Poor', 'Improvement', 'Expectation', 'Exceed', 'Outstanding'];
	
	/**
	 * Bar chart type of performance over review component
	 */
	private _chartType = 'bar';

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

	/**
	 * on init
	 */
	ngOnInit() {
		this.calculatePerformanceAgainstCriteria();
	}

	/**
	 * Calculates performance against criteria
	 */
	async calculatePerformanceAgainstCriteria() {

		var poor = [];
		var improvement = [];
		var expectation = [];
		var exceed = [];
		var outstanding = [];

		for (let performance of this.performances) {
			let performanceCriteria;
			if (performance.characteristicsHigherBetter) {

				performanceCriteria = this.higherBetterValueValidation(performance);
			}
			else {

				performanceCriteria = this.lowerBetterValueValidation(performance);
			}

			if (await performanceCriteria == CriteriaIndexEnum.Poor) {
				poor.push(performance);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Improvement) {
				improvement.push(performance);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Expectation) {
				expectation.push(performance);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Exceed) {
				exceed.push(performance);
			}
			else if (await performanceCriteria == CriteriaIndexEnum.Outstanding) {
				outstanding.push(performance);
			}

		};

		//_chartData
		this._chartData = [
			{
				data: [poor.length, improvement.length, expectation.length, exceed.length, outstanding.length],
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
	async buildChart(){
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
