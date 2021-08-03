import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class ProductItem extends Component {

  onDelete = (id)=>{
    if(window.confirm('Bạn chắc chắn muốn xóa sản phẩm ? ')){ 
         this.props.onDelete(id);
    }
  }
  render() {
    var {product,index} = this.props;
    var statusName = product.status ? 'còn hàng' : 'hết hàng';
    var statusClass = product.status ? 'warning' : 'default';
    return (
        
        <tr>
          <td>{index + 1}</td>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <span className={`label label-${statusClass}`}>
                {statusName}
            </span>
          </td>
          <td>
            <Link to={`/product/${product.id}/edit`} 
            className="btn btn-success mr-10"> 
            Sửa
            </Link>
            
            
            <button type="button" className="btn btn-danger"
            onClick={()=>this.onDelete(product.id)}
            >
              Xóa
            </button>
          </td>
        </tr>
  
    );
  }
}
