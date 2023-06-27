import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// framework css
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import "./assets/main.css"
// méthode globales à utiliser dans tout les composants
import { getCurrencyByCode, getCurrencyByName, getPairId, getPair } from './utils/Data';

const app = createApp(App)

// methode pour récupérer un object devise via  le nom
app.config.globalProperties.getCurrencyByName = getCurrencyByName

// methode pour récupérer un object devise via le code
app.config.globalProperties.getCurrencyByCode = getCurrencyByCode

// methode pour récupérer l'id d'un objet paire
app.config.globalProperties.getPairId = getPairId

// methode pour récupérer un object paires via l'id 
app.config.globalProperties.getPair = getPair

// vue router
app.use(router)

// 1.configuration du framework vuestetic , 
// les composant fournit par vuestetic on leur sorties écrites en anglais, 
// cette configuration permet de traduire en français

// 2.createVuestic sert a enregistrer le plugin dans mon application vue afin de pouvoir 
// utiliser leur composant
app.use(createVuestic({
    config: {
        i18n: {
            "search": "Rechercher",
            "noOptions": "Aucun élément trouvé",
            "cancel": "Annuler",
            "uploadFile": "Importer un fichier",
            "undo": "Annuler",
            "dropzone": "Déposez les fichiers ici pour les télécharger",
            "fileDeleted": "Fichier supprimé",
            "sortColumnBy": "Trier la colonne par {name}",
            "selectRowByIndex": "Sélectionner la ligne {index}",
            "removeFile": "Supprimer le fichier",
            "optionsFilter": "Filtre d'options",
            "selectedOption": "Option sélectionnée",
            "noSelectedOption": "Aucune option sélectionnée",
            "loading": "Chargement",
        },
    },
}))


app.mount('#app')







