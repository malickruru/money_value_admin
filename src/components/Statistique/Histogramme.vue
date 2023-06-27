<template>
  <div class="pa-5">
    <Bar v-if="loaded" :data="chartData" :options="config" />
    <VaSkeleton v-else variant="squared" height="15rem" animation="wave" />
    <va-pagination v-show="pages" v-model="currentPage" :pages="pages" :visible-pages="3" buttons-preset="default" gapped
      class="ma-4 flex-center" />
  </div>
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { conversionSum } from '../../service/Route'
import { getPairId, getPair } from '../../utils/Data';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { randomColorArray } from '../../utils/Color'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data: () => ({
    loaded: false,
    chartData: null,
    config: {
      indexAxis: 'y',
      responsive: true,

      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              // création de tooltip personnalisés en fonction de la paire survolée
              let pair = getPair(
                getPairId(
                  context.label.split(' - ')[0],
                  context.label.split(' - ')[1]
                ))
              let label = 'De ' + pair.from.name + ' vers ' + pair.to.name + ' : ' + context.formattedValue;
              return label;
            }
          }
        }
      }
    },
    currentPage: 1,
    pages: 0
  }),
  mounted() {
    // charger les données lorsque le composant est monté
    this.getSum();
  },

  methods: {
    async getSum() {
      this.loaded = false
      let res = await conversionSum.getResponse(this.currentPage)
      if (res.status != 200) {
        this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'danger' })
        return
      }
      this.getChart(res.data)
      this.pages = res.data.total_page
      this.loaded = true
    },
    // changer la configuration du graphe
    getChart(obj) {
      let colors = randomColorArray(10)
      this.chartData = {
        labels: obj.stats.map((e) => this.getPair(e.pair_id).from.code + " - " + this.getPair(e.pair_id).to.code),
        datasets: [{
          label: "",
          data: obj.stats.map((e) => e.somme),
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1
        }]
      }
    }
  },
  watch: {
    // lorsque la page change , mettre a jour les données
    currentPage(newValue, oldValue) {
      this.getSum();
    }
  },
}
</script>