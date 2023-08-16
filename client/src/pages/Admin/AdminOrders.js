import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { allOrders, changedStatus } from "../../api/index";
const { Option } = Select;

const AdminOrders = () => {
  const status = ["Not Process", "Processing", "Shipped", "deliverd", "cancel"];
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await allOrders();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await changedStatus(orderId, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((order, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={order?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(order._id, value)}
                          defaultValue={order?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{order?.buyer?.name}</td>
                      <td>{moment(order?.createAt).fromNow()}</td>
                      <td>{order?.payment.success ? "Success" : "Failed"}</td>
                      <td>{order?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {order?.products?.map((product, i) => (
                    <div
                      className="row mb-2 p-3 card flex-row"
                      key={product._id}
                    >
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_BASE_URL}/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{product.name}</p>
                        <p>{product.description.substring(0, 30)}</p>
                        <p>Price : {product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
