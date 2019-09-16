import {API, HOST} from "./Util";

export default class SaleService {
    getSales({start, limit, sort, includeTotal = true, tag, price, name}) {
        // Empezamos la query
        let query = "?";

        // Añadimos el start
        query += start ? `start=${start}&` : "";

        // 2. Faltan añadir a la query los demás campos
        query += limit ? `limit=${limit}&` : "";
        query += sort ? `sort=${sort}&` : "";
        query += includeTotal ? `includeTotal=${includeTotal}&` : "";
        
        if (tag) {
            query += tag ? `tags=${tag}&` : "";
        }
        if (price) {
            query += price ? `precio=${price}&` : "";
        }
        if (name) {
            query += name ? `nombre=${name}&` : "";
        }

        // Eliminamos el último & de la query
        query = query.substr(0, query.length - 1);

        console.log(`${HOST}/${API}/anuncios${query}`)

        return fetch(`${HOST}/${API}/anuncios${query}`, {
            method: "GET"
        }).then(res => res.json());
    }

    getTags() {

        return fetch(`${HOST}/${API}/anuncios/tags`, {
            method: "GET"
        }).then(res => res.json());

        // return new Promise((resolve) => {
        //     return resolve({
        //             ok: true,
        //             allowedTags: ["A", "B"]
        //         }
        //     )
        // }) // 2. Eliminar estas líneas y realizar la llamada a NodePop para obtener todos los tags
    }
}
