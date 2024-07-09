import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderAction";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.order);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="h-auto p-5">
      <div className="flex flex-col items-center my-4">
        <div className="card rounded-lg border-2 w-full max-w-4xl m-2">
          <div className="card-title text-2xl py-5 px-9 bg-gray-100 rounded-t-lg border-b-2 font-semibold">
            <h2 className="text-3xl font-semibold mb-6">Order Details</h2>
          </div>
          <div className="card-body bg-white shadow-lg rounded-lg p-4">
            {order && (
              <div>
                <div className="mb-6 flex max-md:flex-col justify-between">
                  <div className="">
                    {" "}
                    <h3 className="text-2xl font-semibold mb-2">
                      Order Information
                    </h3>
                    <p className="text-xl">
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p className="text-xl">
                      <strong>Payment Status:</strong> {order.paymentInfo}
                    </p>
                  </div>
                  <div className="">
                    <button
                      className={`text-white font-semibold m-2 p-2 rounded-lg ${
                        order.paymentInfo === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      Payment {order.paymentInfo}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Items Ordered</h3>
                  <ul>
                    {order.items &&
                      order.items.map((item, index) => (
                        <li key={index} className="text-xl">
                          <strong>Quantity:</strong> {item.quantity},{" "}
                          <strong>Price:</strong> ${item.itemPrice}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">
                    Shipping Information
                  </h3>
                  {order.address ? (
                    <div className="text-xl">
                      <p>
                        <strong>Address ID:</strong> {order.address._id}
                      </p>
                      <p>
                        <strong>Street:</strong> {order.address.addressLine1}
                      </p>
                      <p>
                        <strong>Near:</strong> {order.address.addressLine2}
                      </p>

                      <p>
                        <strong>City:</strong> {order.address.city}
                      </p>
                      <p>
                        <strong>State:</strong> {order.address.state}
                      </p>
                      <p>
                        <strong>Postal Code:</strong> {order.address.pincode}
                      </p>
                    </div>
                  ) : (
                    <p>No address available</p>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2">Order Summary</h3>
                  <p className="text-xl">
                    <strong>Shipping Price:</strong> ${order.shippingPrice}
                  </p>
                  <p className="text-xl">
                    <strong>Total Price:</strong> ${order.totalPrice}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
