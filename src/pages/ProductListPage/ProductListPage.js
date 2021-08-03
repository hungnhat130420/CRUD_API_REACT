import React, { Component } from "react";
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import callApi from './../../utils/ApiCaller';
import {Link} from 'react-router-dom';


export default class ProductListPage extends Component {
    constructor(props) {
      super(props);
      this.state={
        products:[]
      };
    }


    componentDidMount(){
        callApi('products','GET',null).then(res=>{
            this.setState({products:res.data})
        });
     
    }

    findIndex = (products,id)=>{
      var result = -1;
       products.forEach((product,index)=>{
           if(product.id===id){
               result = index;
           }
       })

      return result;
   }

    onDelete = (id)=>{
      var {products } = this.state;
      callApi(`products/${id}`,'DELETE',null).then(res=>{
        if(res.status === 200){
          var index = this.findIndex(products,id);
            products.splice(index,1);
            this.setState({
                products : products
            });
        }  
    });
    }
    showProducts = (products)=>{
        var results =null;
        if(products.length>0){
            results = products.map((product,index)=>{
                return(
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete = {this.onDelete}
                    />
                )
            })
        }
        return results;
    }
  render() {
     var {products} = this.state;
 
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm sản phẩm
        </Link>
        <ProductList>
            {this.showProducts(products)}
        </ProductList>
      </div>
    );
  }
}
