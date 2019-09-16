import React from "react";
import './SaleSearch.css'
import SaleService from "../../services/SaleService";
import SaleItem from "../sale-item/SaleItem";
import Tags from "../tags/Tags";

const service = new SaleService();

export default class SaleSearch extends React.Component {
    constructor(props) {
        super(props);

        // 3. Comprobar que el usuario se ha registrado

        // 3. Si el usuario especificó un tag en el registro, se debe añadir por defecto a la búsqueda
        this.state = {
            search: {}
        };

        this.search();

        this.handleSearch = this.handleSearch.bind(this);
        this.search = this.search.bind(this);

        // Retrieve the tags needed to filter sales
        // 1. Este servicio como el <select> que hay en el render se pueden sustituir por el componente <Tags>
        // 1. Para más información de como se usa ver el componente SignIn
        // service.getTags().then((res) => {
        //     if (res.ok) {
        //         this.setState({
        //             tags: res.allowedTags
        //         })
        //     }
        // });
    }

    search() {
        // 2. Llamar al servicio service.getSales(this.state.search), gestionar su petición y añadir al estado su resultado
        console.log(`search: ${this.state.search.name}, ${this.state.search.price} ${this.state.search.tag}`)
        const { name, price, tag } = this.state.search
        console.log(`search: ${name}, ${price} ${tag}`)
        // service.getSales({}).then((res) => {
        //      const items = res.result.rows;
        //      console.log(`search: ${items}`)

        //     let item = items.find((item) => item._id === this.props.match.params.id);

        //     if (!item) {
        //         this.props.history.goBack();
        //     }

        //     this.setState({
        //         item
        //     })
        //  });
    }

    handleSearch(event) {
        const {name, value} = event.target;
        console.log(`name ${name} value ${value}`);

        this.setState({
            search: {
                [name]: value.trim().length ? value.trim() : null
            }
        }, () => {
            this.search();
        });

    }

    render() {
        return (
            <div className={`sale-search container`}>
                <div className="row mb-3">
                    <input name="name" onChange={this.handleSearch} className={`form-control col-2 ml-4`} placeholder={`Filter by name`}/>
                    <input name="price" type="number" onChange={this.handleSearch} className={`form-control col-1 ml-4`} placeholder={`Price`}/>
                    <Tags name="tag" value={this.state.search.tag} onChange={this.handleSearch} className={`form-control col-2 ml-4`}/>
                    {/* {
                        this.state.tags
                        &&
                        <select name="tag" value={this.state.search.tag} onChange={this.handleSearch} className={`form-control col-2 ml-4`}>
                            <option value="">Filter by tag</option>
                            {this.state.tags.map((tag, index) => <option key={`${tag}-${index}`} value={tag}>{tag}</option>)}
                        </select>
                    } */}
                </div>

                {
                    ((this.state.sales && !this.state.sales.length) || !this.state.sales)
                    &&
                    <div className="text-center">
                        <h2>No se han encontrado elementos</h2>
                    </div>
                }
                {
                    this.state.sales
                    &&
                    (
                        <div className="row">
                            {
                                this.state.sales.map((sale, index) => {
                                    return (
                                        <div key={sale._id} className="col-4" onClick={() => this.props.history.push(`/sale/${sale._id}`)}>
                                            <SaleItem item={sale}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}
