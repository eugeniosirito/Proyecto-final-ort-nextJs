import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60],
      tension: 0.5,
      fill: true,
      borderColor: "rgb(255, 99, 132",
      backgroundColor: "rgb(255, 99, 132, 0.5)",
      pointRadius: 5,
      pointBorderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

export default function LinesChart() {
  return <Line data={data} options={options} />;
}
