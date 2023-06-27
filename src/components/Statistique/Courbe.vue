<template>
    <div class="pa-5">
        <div class="d-flex ma-5">
            <SelectPair @set-from="setFrom" @set-to="setTo" :hasDefaultValue="false" />
            <va-button @click="addDataset">Ajouter</va-button>
        </div>
        <Line v-if="loaded" :data="chartData" :options="config" />
        <VaSkeleton v-else variant="squared" height="15rem" animation="wave" />

    </div>
</template>
    
<script>
import SelectPair from '../Forms/SelectPair.vue'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { conversionHistory } from '../../service/Route'
import { getMonth } from '../../utils/Month.js'
import { randomColor } from '../../utils/Color.js'

// Cette ligne de code enregistre les différents éléments et fonctionnalités de "chart.js" qui ont été importés précédemment.
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'BarChart',
    components: { Line, SelectPair },
    data: () => ({
        loaded: false,
        chartData: null,
        // la valeur 217 est complètement arbitraire
        id: 217,
        from: '',
        to: '',

    }),
    mounted() {
        // charger les données lorsque le composant est monté
        this.getHistory();
    },
    // 
    methods: {
        async getHistory(addPairData = false) {
            this.loaded = false
            let res = await conversionHistory.getResponse(this.id)
            if (res.status != 200) {
                this.$vaToast.init({ message: res.message, position: 'bottom-right', color: 'danger' })
                return
            }
            addPairData ? this.addChart(res.data) : this.getChart(res.data)
            this.loaded = true
        },
        // changer la configuration du graphe
        getChart(obj) {
            this.chartData = {
                
                labels: obj.map((e) => getMonth(e.mois)),
                datasets: [{
                    label: this.getPair(this.id).from.code + '-' + this.getPair(this.id).to.code,
                    data: obj.map((e) => e.total),
                    fill: false,
                    borderColor: randomColor(1),
                    tension: 0.4
                }]
            }
        },
        // ajouter une configuration au graphe
        addChart(obj) {
            this.chartData.datasets.push({
                label: this.getPair(this.id).from.code + '-' + this.getPair(this.id).to.code,
                data: obj.map((e) => e.total),
                fill: false,
                borderColor: randomColor(1),
                tension: 0.4
            })
        },

        setFrom(from) {
            this.from = from;
        },
        setTo(to) {
            this.to = to;
        },

        addDataset() {
            //met à jour l'id
            this.id = this.getPairId(
                this.getCurrencyByName(this.from).code,
                this.getCurrencyByName(this.to).code
            );
            if (this.id) {
                this.getHistory(true);
            }

        }
    }
}
</script>