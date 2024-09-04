/**
 * Interface representing the structure of data used in Chart.js charts.
 * This interface is designed to accommodate bar charts, but it can be
 * used or extended for other chart types.
 */
interface ChartData {
  labels: string[] | number[]; // Labels for the x-axis, can be strings or numbers.
  datasets: Array<{
    label: string; // The label for the dataset, displayed in the legend and tooltips.
    data: number[]; // The numerical data points corresponding to each label.
    backgroundColor?: string | string[]; // Optional: The background color(s) for the bars.
    borderColor?: string | string[]; // Optional: The border color(s) for the bars.
    borderWidth?: number; // Optional: The width of the borders around the bars.
  }>;
}

/**
 * Generates configuration options for a bar chart using the provided chart data.
 *
 * @param {ChartData} chartData - The data to be displayed in the chart, including labels and datasets.
 * @returns {object} - The configuration object for the bar chart, including type, data, and options.
 */
export const diceChartOptions = (chartData: ChartData) => ({
  type: 'bar', // Specifies that the chart type is a bar chart.
  data: chartData, // Uses the provided chart data as the data for the chart.
  options: {
    responsive: true, // Ensures the chart is responsive to different screen sizes.
    plugins: {
      legend: {
        position: 'bottom', // Positions the legend at the bottom of the chart.
      },
      scales: {
        /**
         * Configuration for the x-axis of the chart.
         * - Sets the font family for the labels.
         * - Ensures the scale starts at 0.
         * - Sets the minimum value for the x-axis to 0.
         * - Configures the ticks on the x-axis to increment by 1.
         */
        x: {
          font: {
            family: '"Source Code Pro", monospace',
          },
          beginAtZero: true,
          min: 0,
          ticks: {
            stepSize: 1,
          },
        },
        /**
         * Configuration for the y-axis of the chart.
         * - Sets the font family for the labels.
         * - Ensures the scale starts at 0.
         * - Sets the minimum value for the y-axis to 0.
         * - Configures the ticks on the y-axis to increment by 1.
         */
        y: {
          font: {
            family: '"Source Code Pro", monospace',
          },
          beginAtZero: true,
          min: 0,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  },
});
