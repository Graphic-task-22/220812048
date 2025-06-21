// src/barChart.js

const ctx = document.getElementById('barChart').getContext('2d');

// 示例数据：代表不同星球的探测任务次数
const data = {
  labels: ['火星', '木星', '土星', '天王星', '海王星'],
  datasets: [{
    label: '探测任务次数',
    data: [12, 19, 8, 5, 3],
    backgroundColor: [
      '#3b82f6', // 蓝
      '#6366f1', // 靛
      '#8b5cf6', // 紫
      '#ec4899', // 粉
      '#f59e0b'  // 橙
    ],
    borderColor: '#ffffff33',
    borderWidth: 1
  }]
};

// 配置图表
const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: '#444'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: '#444'
        }
      }
    }
  }
};

// 渲染图表
new Chart(ctx, config);
