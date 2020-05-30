export default class ChartData {
  datasets: Array<Object>
  labels: String[]
  constructor(datasets: Array<Object>, labels: String[]) {
    this.datasets = datasets
    this.labels = labels
  }
}
